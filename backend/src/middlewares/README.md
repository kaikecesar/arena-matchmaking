# Middlewares (Fastify hooks)

Cross-cutting concerns that intercept HTTP requests/responses across multiple
routes. **Implementation deferred** — this folder is intentionally empty at MVP.
Files listed below are placeholders for planned middleware, gated by feature
arrival.

## Planned

### `tenant-context.ts`
Resolves `organizer_id` from JWT (or `x-organizer-id` header in dev) and attaches
it to `request.tenant`. **Required by REQUIREMENTS.md §2.17** (multi-tenancy by
discriminator). **Trigger:** implement before the first non-global endpoint
(events, inscriptions, fights). Global resources (users, athletes, catalogs) do
not require this.

### `auth.ts`
Validates JWT, attaches authenticated user to `request.user`. **Trigger:**
implement before the first authenticated endpoint.

### `audit.ts`
Emits audit log entries on sensitive actions (override of incompatibility,
manual fight, document validation, weigh-in, result correction).
**Required by REQUIREMENTS.md §10.8.** Will compose with `tenant-context.ts` to
attribute actions to `(organizer_id, actor_id)`.

## Registration order

In Fastify, hooks run in registration order. Suggested order when implemented:

1. `auth.ts` — authenticate first; downstream hooks can rely on `request.user`.
2. `tenant-context.ts` — resolve tenant after auth (tenant may come from the
   authenticated user).
3. `audit.ts` — last, so it can read both `request.user` and `request.tenant`.

## Pattern

Use Fastify's plugin pattern for each hook:

```ts
import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async function tenantContext(app: FastifyInstance) {
  app.addHook('onRequest', async (request) => {
    // resolve organizer_id, attach to request.tenant
  });
});
```

Register each one in `app.ts` **before** route registration so they apply globally.
