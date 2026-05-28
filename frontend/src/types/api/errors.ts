/** Mirrors `backend/src/http/schemas/errors.ts` and domain auth codes. */
export const ApiErrorCode = {
  internalServerError: 'INTERNAL_SERVER_ERROR',
  unauthorized: 'AUTH_UNAUTHORIZED',
  invalidCredentials: 'AUTH_INVALID_CREDENTIALS',
  validationError: 'VALIDATION_ERROR',
} as const;

export type ApiErrorCodeValue = (typeof ApiErrorCode)[keyof typeof ApiErrorCode];

export interface ApiErrorBody {
  code: string;
  message?: string | undefined;
}

export interface ApiValidationIssue {
  message: string;
  path: (string | number)[];
}

export interface ApiValidationErrorBody extends ApiErrorBody {
  code: typeof ApiErrorCode.validationError;
  issues?: ApiValidationIssue[] | undefined;
}
