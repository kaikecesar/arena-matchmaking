export const UserRole = {
  organizer: 'ORGANIZER',
  athlete: 'ATHLETE',
  coach: 'COACH',
} as const

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

export const AuthErrorCode = {
  invalidCredentials: 'INVALID_CREDENTIALS',
  rateLimited: 'RATE_LIMITED',
  serverError: 'SERVER_ERROR',
  networkError: 'NETWORK_ERROR',
  sessionExpired: 'SESSION_EXPIRED',
  emailInUse: 'EMAIL_IN_USE',
  invalidToken: 'INVALID_TOKEN',
  weakPassword: 'WEAK_PASSWORD',
} as const

export type AuthErrorCode = (typeof AuthErrorCode)[keyof typeof AuthErrorCode]

export type AuthUser = {
  id: string
  name: string
  email: string
  role: UserRole
}

export type AuthTokens = {
  accessToken: string
  refreshToken?: string
}

export type AuthSession = {
  user: AuthUser
  tokens: AuthTokens
  rememberMe: boolean
}

export type LoginPayload = {
  identifier: string
  password: string
  keepSession: boolean
}

export type RegisterRole = 'organizer' | 'athlete' | 'coach'

export type RegisterPayload = {
  role: RegisterRole
  name: string
  email: string
  document: string
  password: string
}

export type ForgotPasswordPayload = {
  identifier: string
}

export type ResetPasswordPayload = {
  token: string
  password: string
  confirmPassword: string
}

export type AuthApiResponse = {
  accessToken: string
  refreshToken?: string
  user: AuthUser
}

export type AuthApiError = {
  error: AuthErrorCode
  message: string
  retryAfter?: number
}

export class AuthServiceError extends Error {
  readonly status: number
  readonly code: AuthErrorCode
  readonly retryAfter?: number

  constructor(status: number, body: AuthApiError) {
    super(body.message)
    this.name = 'AuthServiceError'
    this.status = status
    this.code = body.error
    this.retryAfter = body.retryAfter
  }
}
