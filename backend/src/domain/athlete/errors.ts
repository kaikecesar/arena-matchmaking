// Application
import { AppError } from '../../shared/errors/app-error.ts';

export const USER_ATHLETE_ERROR_CODES = {
  ATHLETE_ALREADY_REGISTERED: 'USER_ATHLETE_ALREADY_REGISTERED',
  DOCUMENT_ALREADY_IN_USE: 'USER_ATHLETE_DOCUMENT_ALREADY_IN_USE',
} as const;

export class UserAlreadyHasAthleteError extends AppError {
  readonly code = USER_ATHLETE_ERROR_CODES.ATHLETE_ALREADY_REGISTERED;
  readonly statusCode = 409;

  constructor() {
    super('User already have been registered as an athlete.');
  }
}

export class DocumentAlreadyInUseError extends AppError {
  readonly code = USER_ATHLETE_ERROR_CODES.DOCUMENT_ALREADY_IN_USE;
  readonly statusCode = 409;

  constructor() {
    super('Document already in use.');
  }
}
