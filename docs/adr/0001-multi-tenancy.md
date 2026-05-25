# ADR 0001 — Multi-tenancy via Shared Database with Discriminator

| | |
|---|---|
| **Status** | Accepted |
| **Date** | 2026-05-22 |
| **Decision-maker** | Kaike Cesar Oliveira |
| **References** | REQUIREMENTS.md §2.17, §10.5 |

## Context

The Arena Matchmaking platform serves multiple event organizers. Each organizer
manages their own events, inscriptions, fights, weigh-ins, etc. At MVP scope
there is only one organizer (design partner), but the architecture must not
block onboarding more organizers later — multi-tenancy is the single most
expensive architectural decision to reverse.

Three tenancy models were evaluated:

| Model | Description | Retrofit cost |
|---|---|---|
| **Shared DB + shared schema + discriminator** | One DB, one set of tables, `organizer_id` on tenant-scoped tables | HIGH (backfill on every tenant-scoped row, rewrite every query) |
| Shared DB + schema per tenant | One DB, one Postgres schema per tenant | MEDIUM (per-tenant migration tooling) |
| DB per tenant | Separate database per tenant | LOW per-tenant onboarding, HIGH operational cost |

## Decision

Adopt **shared database + shared schema + discriminator (`organizer_id`)** from
the MVP, even with a single tenant.

Tables split into two categories:

- **Tenant-scoped** (carry `organizer_id`): events, inscriptions, fights, cards,
  weigh-ins, event configurations.
- **Global** (no `organizer_id`): users (athletes), career records, official
  catalogs, coaches, athlete-coach links.

## Rationale

1. **Cost of reversal asymmetry.** Adding `organizer_id` after the fact requires
   backfilling every row and rewriting every query. Adding the column from day
   one costs one extra `varchar` per insert — negligible.
2. **Schema-per-tenant** adds operational complexity (per-tenant migrations,
   connection pool management) without matching benefit at MVP scale.
3. **DB-per-tenant** is wrong for a SaaS targeting many small organizers —
   operational cost grows linearly with tenants.
4. **Discriminator** is easy to enforce via middleware (`tenant-context.ts`) and
   can be hardened later with Postgres Row-Level Security (RLS) policies if
   stricter isolation becomes necessary.

## Consequences

### Positive

- Onboarding a new tenant is "just" an `INSERT INTO organizers`.
- All tenants share the same schema and migrations.
- Easy cross-tenant analytics (with care).

### Negative / Risks

- All tenant-scoped queries **must** filter by `organizer_id`. Forgetting one is
  a data leak. Mitigation: middleware sets `request.tenant`; repositories accept
  it explicitly; lint rule (future) to enforce.
- Audit logs must include `organizer_id` for tenant-aware compliance.
- A single noisy tenant can degrade others (no DB isolation). Acceptable at MVP;
  revisit if performance becomes an issue (REQUIREMENTS.md §10.5).
- Direct DB access (Drizzle Studio, ad-hoc queries) must apply tenant filter
  manually — no automatic safety net.

## Implementation notes

- The middleware lives at `backend/src/middlewares/tenant-context.ts` (not yet
  implemented — see middlewares README).
- The first endpoint to require this is the first non-global resource. Until
  then, the only existing table (`users`) is global and does not require the
  discriminator.
- Repository signatures for tenant-scoped resources will accept `organizerId` as
  a first-class parameter, not implicitly via context. Explicit is safer.
