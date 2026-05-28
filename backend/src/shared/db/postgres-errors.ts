// Postgres error code for unique_violation. See:
// https://www.postgresql.org/docs/current/errcodes-appendix.html
const PG_UNIQUE_VIOLATION = '23505';

interface PgError {
  code?: string;
  constraint?: string;
}

function asPgError(err: unknown): PgError | null {
  if (typeof err !== 'object' || err === null) return null;
  // Drizzle 0.45+ wraps pg errors in DrizzleQueryError; the original error is in `cause`.
  const candidate = (err as { cause?: unknown }).cause ?? err;
  if (typeof candidate !== 'object' || candidate === null) return null;
  return candidate as PgError;
}

export function isPgUniqueViolation(
  err: unknown,
  constraint?: string,
): boolean {
  const pgErr = asPgError(err);
  if (pgErr?.code !== PG_UNIQUE_VIOLATION) return false;
  if (constraint && pgErr.constraint !== constraint) return false;
  return true;
}
