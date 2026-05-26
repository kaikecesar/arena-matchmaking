// Application
import { AppError } from '../../shared/errors/app-error.ts';

export const AUTH_ERROR_CODES = {
  INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
  UNAUTHORIZED: 'AUTH_UNAUTHORIZED',
} as const;

export class InvalidCredentialsError extends AppError {
  readonly code = AUTH_ERROR_CODES.INVALID_CREDENTIALS;
  readonly statusCode = 401;

  constructor() {
    super('Invalid credentials provided.');
  }
}

export class UnauthorizedError extends AppError {
  readonly code = AUTH_ERROR_CODES.UNAUTHORIZED;
  readonly statusCode = 401;

  constructor() {
    super('Unauthorized.');
  }
}
