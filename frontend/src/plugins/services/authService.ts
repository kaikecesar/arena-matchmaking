// Storage
import { authStorage } from '@/plugins/storage'

// Types
import {
  AuthErrorCode,
  AuthServiceError,
  UserRole,
} from '@/types/auth'
import type { AuthUser, LoginPayload } from '@/types/auth'
import type { AuthApiResponse } from '@/types/api'
import type { AuthService } from './authService.types'

interface BackendErrorResponse {
  code?: string
  message?: string
}

const API_BASE_PATH = '/api/v1'

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
