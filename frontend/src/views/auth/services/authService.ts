// Services
import { buildMockUser, createMockTokens } from '@/views/auth/services/mockTokens'

// Utils
import { mockDelay } from '@/views/auth/utils/delay'

// Types
import {
  AuthErrorCode,
  AuthServiceError,
  RegisterRole,
  UserRole,
} from '@/views/auth/types'
import type {
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from '@/views/auth/types'
import type { AuthApiResponse, ForgotPasswordApiResponse, ResetPasswordApiResponse } from '@/types/api'
import type { AuthService } from './authService.types'

/**
 * Mock auth service — backend-ready contract.
 * Replace method bodies with real fetch calls when API is integrated.
 */

const authService: AuthService = {
  /* ***********************************************************************************************
  ******************************************** REQUESTS ********************************************
  *********************************************************************************************** */
  async login(payload: LoginPayload): Promise<AuthApiResponse> {
    await mockDelay(850)

    const id = payload.identifier.toLowerCase()

    if (id.includes('offline') || id === 'network') {
      throw new AuthServiceError(0, {
        error: AuthErrorCode.networkError,
        message: 'Network unavailable',
      })
    }

    if (id.includes('rate')) {
      throw new AuthServiceError(429, {
        error: AuthErrorCode.rateLimited,
        message: 'Too many attempts',
        retryAfter: 120,
      })
    }

    if (payload.password === 'erro' || payload.password === 'wrong') {
      throw new AuthServiceError(401, {
        error: AuthErrorCode.invalidCredentials,
        message: 'Invalid credentials',
      })
    }

    const user = buildMockUser(payload.identifier)
    const tokens = createMockTokens(user)

    return { ...tokens, user }
  },

  async register(payload: RegisterPayload): Promise<AuthApiResponse> {
    await mockDelay(1100)

    if (payload.email.toLowerCase().includes('exists')) {
      throw new AuthServiceError(409, {
        error: AuthErrorCode.emailInUse,
        message: 'Email already registered',
      })
    }

    const roleMap: Record<RegisterRole, UserRole> = {
      [RegisterRole.organizer]: UserRole.organizer,
      [RegisterRole.athlete]: UserRole.athlete,
      [RegisterRole.coach]: UserRole.coach,
    }

    const user = buildMockUser(payload.email, payload.name, roleMap[payload.role])
    const tokens = createMockTokens(user)

    return { ...tokens, user }
  },

  async forgotPassword(_payload: ForgotPasswordPayload): Promise<ForgotPasswordApiResponse> {
    await mockDelay(750)

    const id = _payload.identifier.toLowerCase()
    if (id.includes('offline')) {
      throw new AuthServiceError(0, {
        error: AuthErrorCode.networkError,
        message: 'Network unavailable',
      })
    }

    return { message: 'Recovery instructions sent' }
  },

  async resetPassword(payload: ResetPasswordPayload): Promise<ResetPasswordApiResponse> {
    await mockDelay(900)

    if (payload.token === 'invalid' || payload.token === 'expired') {
      throw new AuthServiceError(400, {
        error: AuthErrorCode.invalidToken,
        message: 'Invalid or expired token',
      })
    }

    if (payload.password === 'weak') {
      throw new AuthServiceError(400, {
        error: AuthErrorCode.weakPassword,
        message: 'Password too weak',
      })
    }

    return { message: 'Password updated' }
  },

  async logout(): Promise<void> {
    await mockDelay(300)
  },

  async refreshSession(refreshToken: string): Promise<AuthApiResponse> {
    await mockDelay(500)

    if (refreshToken.includes('expired')) {
      throw new AuthServiceError(401, {
        error: AuthErrorCode.sessionExpired,
        message: 'Session expired',
      })
    }

    const user = buildMockUser('session@arena.mock')
    const tokens = createMockTokens(user)
    return { ...tokens, user }
  },
}

export { authService }
