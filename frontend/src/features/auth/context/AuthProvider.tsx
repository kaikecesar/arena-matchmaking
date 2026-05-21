import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

import { authService } from '@/features/auth/services'
import { authStorage } from '@/features/auth/storage'
import type { LoginPayload, RegisterPayload } from '@/features/auth/types'
import { getAuthErrorMessage } from '@/features/auth/utils/authErrors'
import { getRedirectForRole } from '@/features/auth/utils/roleRedirects'
import { AuthContext, type AuthContextValue, type AuthProviderProps } from './AuthContext'

export function AuthProvider({ children, initialSession }: AuthProviderProps): ReactElement {
  const navigate = useNavigate()
  const [user, setUser] = useState(initialSession?.user ?? null)
  const [isBootstrapping, setIsBootstrapping] = useState(initialSession === undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    if (initialSession !== undefined) {
      return
    }

    const session = authStorage.loadSession()
    if (session) {
      setUser(session.user)
    }
    setIsBootstrapping(false)
  }, [initialSession])

  const persistAndNavigate = useCallback(
    async (
      response: Awaited<ReturnType<typeof authService.login>>,
      rememberMe: boolean,
      redirectPath?: string
    ): Promise<void> => {
      authStorage.saveSession({
        user: response.user,
        tokens: {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        },
        rememberMe,
      })
      setUser(response.user)

      await new Promise((r) => setTimeout(r, 480))

      void navigate(redirectPath ?? getRedirectForRole(response.user.role), { replace: true })
    },
    [navigate]
  )

  const login = useCallback(
    async (payload: LoginPayload): Promise<void> => {
      setIsSubmitting(true)
      setSuccessMessage(null)
      try {
        const response = await authService.login(payload)
        await persistAndNavigate(response, payload.keepSession)
      } catch (error) {
        throw new Error(getAuthErrorMessage(error))
      } finally {
        setIsSubmitting(false)
      }
    },
    [persistAndNavigate]
  )

  const register = useCallback(
    async (payload: RegisterPayload): Promise<void> => {
      setIsSubmitting(true)
      setSuccessMessage(null)
      try {
        const response = await authService.register(payload)
        await persistAndNavigate(response, true)
      } catch (error) {
        throw new Error(getAuthErrorMessage(error))
      } finally {
        setIsSubmitting(false)
      }
    },
    [persistAndNavigate]
  )

  const logout = useCallback(async (): Promise<void> => {
    setIsSubmitting(true)
    try {
      await authService.logout()
    } finally {
      authStorage.clearSession()
      setUser(null)
      setIsSubmitting(false)
      void navigate('/login', { replace: true })
    }
  }, [navigate])

  const clearSuccessMessage = useCallback((): void => {
    setSuccessMessage(null)
  }, [])

  const status = isBootstrapping ? 'loading' : user ? 'authenticated' : 'guest'

  const value = useMemo<AuthContextValue>(
    () => ({
      status: status === 'loading' ? 'idle' : status,
      user,
      isBootstrapping,
      isSubmitting,
      successMessage,
      login,
      register,
      logout,
      clearSuccessMessage,
    }),
    [
      status,
      user,
      isBootstrapping,
      isSubmitting,
      successMessage,
      login,
      register,
      logout,
      clearSuccessMessage,
    ]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
