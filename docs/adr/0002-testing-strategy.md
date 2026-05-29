# ADR 0002 — Testing Strategy (Pyramid)

| | |
|---|---|
| **Status** | Accepted |
| **Date** | 2026-05-28 |
| **Decision-maker** | Kaike Cesar Oliveira |
| **References** | REQUIREMENTS.md §10.2 (Performance/SLOs), ATHLETE_IDENTITY.md |

## Context

The project started with two test layers — `unit` (use cases against in-memory repositories) and `e2e` (full HTTP roundtrip with real Postgres). At MVP scale this seems sufficient, but two patterns emerged that signal trouble at scale:

1. **E2E carried error-path coverage**: 401 and 409 responses were being asserted in e2e tests of every protected endpoint. Each new authenticated resource (events, inscriptions, fights — the bulk of the product to come) would duplicate the 401 test. Each resource with conflict semantics would add 409 tests. The number of e2e tests would grow linearly with resources, not with happy paths.

2. **Unit tests could not exercise database concerns**: Constraint translation (Postgres unique violation → domain error) lives in the repositories and depends on the actual error format from the `pg` driver. Unit tests using in-memory repositories cannot cover this. A bug introduced by `drizzle-orm` 0.45 wrapping errors in `DrizzleQueryError` (breaking `isPgUniqueViolation`) went undetected until an e2e test surfaced it accidentally.

The root issue: **no intermediate layer** between unit and e2e. Tests that needed real infrastructure but not full HTTP roundtrip had nowhere to live, so they fell into e2e and inflated its scope.

## Decision

Adopt a **three-layer testing pyramid**: `unit`, `integration`, `e2e`.

### Layer responsibilities

| Layer | What it tests | Boundaries | Cost (target) |
|---|---|---|---|
| **Unit** | Pure business logic. Use cases with in-memory repositories. Domain rules. Helpers and validators. | No I/O. No HTTP. No DB. | ~10ms |
| **Integration** | Bridges between layers with real infrastructure. Repositories against real Postgres. Middleware in isolation. Schema (Zod) parsing real inputs. | Real DB allowed. Real Fastify instance allowed. No assertions about full request lifecycle of business resources. | ~50–150ms |
| **E2E** | Wire-up. Plugin order. Cookie flow. Routes registered under correct prefix. Smoke test that the product feature works end-to-end. | Full Fastify app, real DB, real HTTP. | ~200–500ms |

### What each layer covers, by case type

| Concern | Covered in |
|---|---|
| Use case happy path | Unit |
| Use case error paths that are pure logic (e.g., password mismatch) | Unit |
| Repository happy path | Integration |
| Repository constraint translation (`UNIQUE`, `FK`, `NOT NULL` → domain errors) | Integration |
| Auth middleware behavior (`401` on missing/invalid token, populating `request.user.sub`) | Integration |
| Zod schema validation (CPF format, birth date past, enum values) | Integration |
| Full happy-path resource creation through HTTP | E2E |
| Repeated `401` assertions across every protected route | **Not duplicated** — covered once at middleware integration |

### Naming and location

- Unit specs: `*.spec.ts`, colocated next to the code (`use-cases/athlete/register.spec.ts`).
- Integration specs: `*.integration.spec.ts`, colocated (`repositories/drizzle/athlete.integration.spec.ts`).
- E2E specs: `*.spec.ts` inside `http/controllers/`.

Vitest projects route each suffix to the right environment via [vite.config.mjs](../../backend/vite.config.mjs).

### Rule for triage

When writing a new test, ask:
- Can I prove this with in-memory data only? → **unit**
- Do I need real infrastructure (DB, request fake) but not HTTP roundtrip? → **integration**
- Do I want to confirm everything is wired end-to-end? → **e2e** (and only the happy path)

## Rationale

1. **Asymmetric cost of moving a test up vs. down the pyramid.** Moving a unit test up to integration adds infrastructure; moving an e2e test down to unit removes coverage. Errors in classification favor the cheaper-to-run layer.
2. **Real bugs at real boundaries.** The `DrizzleQueryError` wrapping issue was a real production-shape bug that unit tests cannot catch. Integration tests at the repository boundary catch this class of issue.
3. **E2E does not scale linearly.** Each new authenticated resource adds at most one happy-path e2e (~1 test per resource). Without this rule, e2e would grow by ~3 tests per resource (happy + 401 + 409). At 20 resources that is a 60-test suite vs. a 20-test suite.
4. **Rate-limit safety.** Per-route rate limits (`max: 5 / minute`) make e2e suites flaky as they grow. Keeping e2e thin avoids hitting the limit.

## Consequences

### Positive

- Faster CI: most coverage moves to integration (~50–150ms) and unit (~10ms), away from e2e (~200–500ms).
- Lower duplication: 401 is asserted once at the middleware level, not in every resource.
- Constraint-level bugs are caught (the `DrizzleQueryError` incident would have been caught by repo integration test).
- E2E remains a meaningful signal: failure means "the product feature is broken end-to-end," not "a validation regex needs tweaking."

### Negative / Risks

- Three projects in Vitest config and three scripts in `package.json` — more surface to maintain.
- Integration tests still need a real Postgres running. The project already requires one for e2e, so the cost is shared.
- Risk of misclassification: a test that "needs DB to run" but really tests pure logic could be labeled integration when it should be unit. Mitigation: the triage rule in this ADR.

## Implementation notes

- Vitest project `integration` reuses [src/test/vitest-environment-drizzle.ts](../../backend/src/test/vitest-environment-drizzle.ts) — same per-process fresh DB pattern as e2e.
- Test data builders live in `src/test/builders/` (`user.ts`, `athlete.ts`).
- Flow helpers like `registerAndLogin(app)` live in `src/test/helpers/auth.ts`.
- Rate limits are bypassed when `NODE_ENV === 'test'` (high `max`), so the integration and e2e suites do not hit per-route limits as they grow.

## What stays out of this ADR

- Test data factories that mimic full domain aggregates (will come when domain grows beyond identity).
- Test database isolation strategy at scale (transaction-per-test rollback). Current per-process fresh DB is acceptable until integration suites grow.
- Contract testing between services (out of scope — single backend today).
