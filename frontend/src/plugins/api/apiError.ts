// Libraries
import { AxiosError, isAxiosError } from 'axios';
import { z } from 'zod';

// Types
import {
  ApiErrorBody,
  ApiErrorCode,
  ApiErrorCodeValue,
  ApiValidationErrorBody,
} from '@/types/api';

const errorBodySchema = z.object({
  code: z.string(),
  message: z.string().optional(),
});

const validationErrorBodySchema = errorBodySchema.extend({
  code: z.literal(ApiErrorCode.validationError),
  issues: z
    .array(
      z.object({
        path: z.array(z.union([z.string(), z.number()])),
        message: z.string(),
      }),
    )
    .optional(),
});

type ParsedErrorBody = z.infer<typeof errorBodySchema>;
type ParsedValidationErrorBody = z.infer<typeof validationErrorBodySchema>;

const DEFAULT_MESSAGE = 'Não foi possível concluir a operação. Tente novamente.';

const ERROR_MESSAGES: Partial<Record<ApiErrorCodeValue, string>> = {
  [ApiErrorCode.invalidCredentials]: 'E-mail ou senha incorretos.',
  [ApiErrorCode.unauthorized]: 'Sessão expirada. Faça login novamente.',
  [ApiErrorCode.validationError]: 'Verifique os dados informados.',
};

const isApiErrorCodeValue = (code: string): code is ApiErrorCodeValue =>
  (Object.values(ApiErrorCode) as string[]).includes(code);

const resolveErrorMessage = (
  code: string,
  bodyMessage: string | undefined,
): string => {
  const knownMessage = isApiErrorCodeValue(code)
    ? ERROR_MESSAGES[code]
    : undefined;

  return knownMessage ?? bodyMessage ?? DEFAULT_MESSAGE;
};

class ApiError extends Error {
  readonly code: string;
  readonly status: number;
  readonly body: ApiErrorBody | ApiValidationErrorBody | null;

  constructor(
    message: string,
    status: number,
    code: string,
    body: ApiErrorBody | ApiValidationErrorBody | null,
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.body = body;
  }

  static fromUnknown(error: unknown): ApiError {
    if (error instanceof ApiError) {
      return error;
    }

    if (isAxiosError(error)) {
      return ApiError.fromAxios(error);
    }

    return new ApiError(DEFAULT_MESSAGE, 0, 'UNKNOWN_ERROR', null);
  }

  static fromAxios(error: AxiosError): ApiError {
    const status: number = error.response?.status ?? 0;
    const responseData: unknown = error.response?.data;

    const parsedValidation = validationErrorBodySchema.safeParse(responseData);
    if (parsedValidation.success) {
      const validationBody: ParsedValidationErrorBody = parsedValidation.data;
      const validationCode: typeof ApiErrorCode.validationError = validationBody.code;
      const validationMessage = resolveErrorMessage(
        validationCode,
        validationBody.message,
      );

      return new ApiError(validationMessage, status, validationCode, validationBody);
    }

    const parsedBody = errorBodySchema.safeParse(responseData);
    const body: ParsedErrorBody | null = parsedBody.success
      ? parsedBody.data
      : null;

    const code: string = body?.code ?? 'UNKNOWN_ERROR';
    const message = resolveErrorMessage(code, body?.message);

    return new ApiError(message, status, code, body);
  }
}

export { ApiError };
