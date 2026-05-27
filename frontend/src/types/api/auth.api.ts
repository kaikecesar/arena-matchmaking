// Types
import type { AuthErrorCode } from '@/types/auth/errors.types'
import type { AuthUser } from '@/types/auth/user.types'

/** Successful auth endpoints (login, refresh). */
export interface AuthApiResponse {
  user: AuthUser
}

/** Error body returned by auth API endpoints. */
export interface AuthApiError {
  error: AuthErrorCode
  message: string
  retryAfter?: number | undefined
}

export type LoginApiResponse = AuthApiResponse

export type RefreshSessionApiResponse = AuthApiResponse
