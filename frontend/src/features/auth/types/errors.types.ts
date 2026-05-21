// Types
import type { AuthApiError } from '@/types/api'

export enum AuthErrorCode {
  invalidCredentials = 'INVALID_CREDENTIALS',
  rateLimited = 'RATE_LIMITED',
  serverError = 'SERVER_ERROR',
  networkError = 'NETWORK_ERROR',
  sessionExpired = 'SESSION_EXPIRED',
  emailInUse = 'EMAIL_IN_USE',
  invalidToken = 'INVALID_TOKEN',
  weakPassword = 'WEAK_PASSWORD',
}

export type AuthErrorCodeType = AuthErrorCode

export class AuthServiceError extends Error {
  readonly status: number
  readonly code: AuthErrorCode
  readonly retryAfter?: number | undefined

  constructor(status: number, body: AuthApiError) {
    super(body.message)
    this.name = 'AuthServiceError'
    this.status = status
    this.code = body.error
    if (body.retryAfter !== undefined) {
      this.retryAfter = body.retryAfter
    }
  }
}
