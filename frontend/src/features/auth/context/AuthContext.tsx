import { createContext } from 'react'
import type { AuthSession, AuthUser, LoginPayload, RegisterPayload } from '@/features/auth/types'

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'guest'

export type AuthContextValue = {
  status: AuthStatus
  user: AuthUser | null
  isBootstrapping: boolean
  isSubmitting: boolean
  successMessage: string | null
  login: (payload: LoginPayload) => Promise<void>
  register: (payload: RegisterPayload) => Promise<void>
  logout: () => Promise<void>
  clearSuccessMessage: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export type AuthProviderProps = {
  children: React.ReactNode
  initialSession?: AuthSession | null
}
