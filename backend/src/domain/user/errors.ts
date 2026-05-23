// Application
import { AppError } from '../../shared/errors/app-error.ts';

export const USER_ERROR_CODES = {
  ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  INVALID_NAME: 'USER_INVALID_NAME',
  INVALID_EMAIL: 'USER_INVALID_EMAIL',
  PASSWORD_TOO_SHORT: 'USER_PASSWORD_TOO_SHORT',
  PASSWORD_TOO_LONG: 'USER_PASSWORD_TOO_LONG',
} as const;

export class UserAlreadyExistsError extends AppError {
  readonly code = USER_ERROR_CODES.ALREADY_EXISTS;
  readonly statusCode = 409;

  constructor() {
    super('User already exists.');
  }
}

export class UserInvalidNameError extends AppError {
  readonly code = USER_ERROR_CODES.INVALID_NAME;
  readonly statusCode = 422;

  constructor() {
    super('Invalid user name.');
  }
}

export class UserInvalidEmailError extends AppError {
  readonly code = USER_ERROR_CODES.INVALID_EMAIL;
  readonly statusCode = 422;

  constructor() {
    super('Invalid user email.');
  }
}

export class UserPasswordTooShortError extends AppError {
  readonly code = USER_ERROR_CODES.PASSWORD_TOO_SHORT;
  readonly statusCode = 422;

  constructor() {
    super('Password is too short.');
  }
}

export class UserPasswordTooLongError extends AppError {
  readonly code = USER_ERROR_CODES.PASSWORD_TOO_LONG;
  readonly statusCode = 422;

  constructor() {
    super('Password is too long.');
  }
}
