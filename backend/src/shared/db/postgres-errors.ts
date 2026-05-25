// Postgres error code for unique_violation. See:
// https://www.postgresql.org/docs/current/errcodes-appendix.html
const PG_UNIQUE_VIOLATION = '23505';

interface PgError {
  code?: string;
  constraint?: string;
}

function asPgError(err: unknown): PgError | null {
  if (typeof err !== 'object' || err === null) return null;
  return err as PgError;
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
