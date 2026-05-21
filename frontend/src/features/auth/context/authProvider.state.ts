// Types
import type { AuthSession, AuthUser } from '@/features/auth/types'

export interface AuthSessionState {
  user: AuthUser | null
}

export interface AuthAsyncState {
  isBootstrapping: boolean
  isSubmitting: boolean
}

export interface AuthUiState {
  successMessage: string | null
}

export interface AuthProviderState {
  session: AuthSessionState
  async: AuthAsyncState
  ui: AuthUiState
}

const createAuthProviderInitialState = (
  initialSession?: AuthSession | null | undefined
): AuthProviderState => {
  return {
    session: {
      user: initialSession?.user ?? null,
    },
    async: {
      isBootstrapping: initialSession === undefined,
      isSubmitting: false,
    },
    ui: {
      successMessage: null,
    },
  }
}

export { createAuthProviderInitialState }
