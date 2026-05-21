// Types
import type { AuthErrorCode } from '@/features/auth/types/errors.types'
import type { AuthUser } from '@/features/auth/types/user.types'

/** Successful auth endpoints (login, register, refresh). */
export interface AuthApiResponse {
  accessToken: string
  refreshToken?: string | undefined
  user: AuthUser
}

/** Error body returned by auth API endpoints. */
export interface AuthApiError {
  error: AuthErrorCode
  message: string
  retryAfter?: number | undefined
}

export interface MessageApiResponse {
  message: string
}

export type LoginApiResponse = AuthApiResponse

export type RegisterApiResponse = AuthApiResponse

export type ForgotPasswordApiResponse = MessageApiResponse

export type ResetPasswordApiResponse = MessageApiResponse

export type RefreshSessionApiResponse = AuthApiResponse
