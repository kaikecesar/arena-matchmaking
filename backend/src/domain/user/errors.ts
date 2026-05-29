// Application
import { AppError } from '../../shared/errors/app-error.ts';

export const USER_ERROR_CODES = {
  ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
} as const;

export class UserAlreadyExistsError extends AppError {
  readonly code = USER_ERROR_CODES.ALREADY_EXISTS;
  readonly statusCode = 409;

  constructor() {
    super('User already exists.');
  }
}
