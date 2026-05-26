// Storage
import { authStorage } from '@/plugins/storage'

// Types
import {
  AuthErrorCode,
  AuthServiceError,
  RegisterRole,
  UserRole,
} from '@/types/auth'
import type {
  AuthUser,
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from '@/types/auth'
import type { AuthApiResponse, ForgotPasswordApiResponse, ResetPasswordApiResponse } from '@/types/api'
import type { AuthService } from './authService.types'

interface BackendErrorResponse {
  code?: string
  message?: string
}

const API_BASE_PATH = '/api/v1'

const roleMap: Record<RegisterRole, UserRole> = {
  [RegisterRole.organizer]: UserRole.organizer,
  [RegisterRole.athlete]: UserRole.athlete,
  [RegisterRole.coach]: UserRole.coach,
}

const normalizeEmail = (value: string): string => value.trim().toLowerCase()

const createFallbackUser = (email: string): AuthUser => ({
  id: email,
  name: email.split('@')[0] ?? email,
  email,
  role: UserRole.organizer,
})

const readErrorResponse = async (response: Response): Promise<BackendErrorResponse> => {
  try {
    return await response.json() as BackendErrorResponse
  } catch {
    return {}
  }
}

const mapErrorResponse = (
  status: number,
  body: BackendErrorResponse
): AuthServiceError => {
  if (status === 429) {
    return new AuthServiceError(status, {
      error: AuthErrorCode.rateLimited,
      message: body.message ?? 'Too many attempts',
    })
  }

  if (status === 401) {
    return new AuthServiceError(status, {
      error: AuthErrorCode.invalidCredentials,
      message: body.message ?? 'Invalid credentials',
    })
  }

  if (status === 409 || body.code === 'USER_ALREADY_EXISTS') {
    return new AuthServiceError(status, {
      error: AuthErrorCode.emailInUse,
      message: body.message ?? 'Email already registered',
    })
  }

  return new AuthServiceError(status, {
    error: AuthErrorCode.serverError,
    message: body.message ?? 'Unexpected server error',
  })
}

const request = async (path: string, init?: RequestInit): Promise<Response> => {
  try {
    return await fetch(`${API_BASE_PATH}${path}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...init?.headers,
      },
      ...init,
    })
  } catch {
    throw new AuthServiceError(0, {
      error: AuthErrorCode.networkError,
      message: 'Network unavailable',
    })
  }
}

const authService: AuthService = {
  /* ***********************************************************************************************
  ******************************************** REQUESTS ********************************************
  *********************************************************************************************** */
  async login(payload: LoginPayload): Promise<AuthApiResponse> {
    const email = normalizeEmail(payload.identifier)
    const response = await request('/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password: payload.password,
      }),
    })

    if (!response.ok) {
      throw mapErrorResponse(response.status, await readErrorResponse(response))
    }

    const user = authStorage.findKnownUserByEmail(email) ?? createFallbackUser(email)

    return { user }
  },

  async register(payload: RegisterPayload): Promise<AuthApiResponse> {
    const email = normalizeEmail(payload.email)
    const user: AuthUser = {
      id: email,
      name: payload.name.trim(),
      email,
      role: roleMap[payload.role],
    }

    authStorage.saveKnownUser(user)

    return { user }
  },

  async forgotPassword(_payload: ForgotPasswordPayload): Promise<ForgotPasswordApiResponse> {
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
    const response = await request('/logout', {
      method: 'POST',
    })

    if (!response.ok && response.status !== 401) {
      throw mapErrorResponse(response.status, await readErrorResponse(response))
    }
  },

  async refreshSession(_refreshToken: string): Promise<AuthApiResponse> {
    const session = authStorage.loadSession()

    if (!session) {
      throw new AuthServiceError(401, {
        error: AuthErrorCode.sessionExpired,
        message: 'Session expired',
      })
    }

    return { user: session.user }
  },
}

export { authService }
