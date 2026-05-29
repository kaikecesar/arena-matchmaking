// Application
import { AppError } from '../../shared/errors/app-error.ts';

export const ATHLETE_ERROR_CODES = {
  ALREADY_REGISTERED: 'ATHLETE_ALREADY_REGISTERED',
  DOCUMENT_ALREADY_IN_USE: 'ATHLETE_DOCUMENT_ALREADY_IN_USE',
} as const;

export class UserAlreadyHasAthleteError extends AppError {
  readonly code = ATHLETE_ERROR_CODES.ALREADY_REGISTERED;
  readonly statusCode = 409;

  constructor() {
    super('User already has an athlete profile.');
  }
}

export class DocumentAlreadyInUseError extends AppError {
  readonly code = ATHLETE_ERROR_CODES.DOCUMENT_ALREADY_IN_USE;
  readonly statusCode = 409;

  constructor() {
    super('Document already in use.');
  }
}
