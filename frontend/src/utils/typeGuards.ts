// Types
import { AuthErrorCode, UserRole } from '@/features/auth/types'
import type { AuthUser } from '@/features/auth/types'
import type { AuthApiError } from '@/types/api'

const USER_ROLES: ReadonlySet<string> = new Set(Object.values(UserRole))
const AUTH_ERROR_CODES: ReadonlySet<string> = new Set(Object.values(AuthErrorCode))

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const isAuthUser = (value: unknown): value is AuthUser => {
  if (!isObject(value)) {
    return false
  }
  return (
    typeof value.id === 'string' &&
    typeof value.name === 'string' &&
    typeof value.email === 'string' &&
    typeof value.role === 'string' &&
    USER_ROLES.has(value.role)
  )
}

const isAuthApiError = (value: unknown): value is AuthApiError => {
  if (!isObject(value)) {
    return false
  }
  return (
    typeof value.error === 'string' &&
    AUTH_ERROR_CODES.has(value.error) &&
    typeof value.message === 'string' &&
    (value.retryAfter === undefined || typeof value.retryAfter === 'number')
  )
}

/** @deprecated Use {@link isAuthApiError} */
const isLoginApiError = isAuthApiError

export { isObject, isAuthUser, isAuthApiError, isLoginApiError }
