// Core
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  type ReactElement,
} from 'react'

// Libraries
import { useNavigate } from 'react-router-dom'

// Services
import { authService } from '@/features/auth/services'
import { authStorage } from '@/features/auth/storage'

// Context
import { AuthContext } from '@/features/auth/context/AuthContext'

// Utils
import { authProviderReducer } from '@/features/auth/context/authProvider.reducer'
import { createAuthProviderInitialState } from '@/features/auth/context/authProvider.state'
import { getAuthErrorMessage } from '@/features/auth/utils/authErrors'
import { getRedirectForRole } from '@/features/auth/utils/roleRedirects'
import { buildAuthTokens } from '@/utils/sessionTokens'

// Types
import { AuthStatus, type AuthContextValue, type AuthProviderProps } from '@/features/auth/context/AuthContext.types'
import type { LoginPayload, RegisterPayload } from '@/features/auth/types'
import type { AuthApiResponse } from '@/types/api'

function AuthProvider({
  children,
  initialSession,
}: AuthProviderProps): ReactElement {
  const navigate = useNavigate()

  /* ***********************************************************************************************
  ********************************************* STATE **********************************************
  *********************************************************************************************** */
  const [state, dispatch] = useReducer(
    authProviderReducer,
    initialSession,
    createAuthProviderInitialState
  )

  /* ***********************************************************************************************
  ******************************************** EFFECTS *********************************************
  *********************************************************************************************** */
  useEffect(() => {
    if (initialSession !== undefined) {
      return
    }

    const session = authStorage.loadSession()
    if (session) {
      dispatch({ type: 'SET_USER', payload: session.user })
    }
    dispatch({ type: 'SET_BOOTSTRAPPING', payload: false })
  }, [initialSession])

  /* ***********************************************************************************************
  ******************************************** METHODS *********************************************
  *********************************************************************************************** */
  const persistAndNavigate = useCallback(
    async (
      response: AuthApiResponse,
      rememberMe: boolean,
      redirectPath?: string,
    ): Promise<void> => {
      authStorage.saveSession({
        user: response.user,
        tokens: buildAuthTokens(response.accessToken, response.refreshToken),
        rememberMe,
      })
      dispatch({ type: 'SET_USER', payload: response.user })

      await new Promise((r) => setTimeout(r, 480))

      void navigate(redirectPath ?? getRedirectForRole(response.user.role), { replace: true })
    },
    [navigate]
  )

  const login = useCallback(
    async (payload: LoginPayload): Promise<void> => {
      dispatch({ type: 'SET_SUBMITTING', payload: true })
      dispatch({ type: 'CLEAR_SUCCESS_MESSAGE' })
      try {
        const response = await authService.login(payload)
        await persistAndNavigate(response, payload.keepSession)
      } catch (error) {
        throw new Error(getAuthErrorMessage(error), { cause: error })
      } finally {
        dispatch({ type: 'SET_SUBMITTING', payload: false })
      }
    },
    [persistAndNavigate]
  )

  const register = useCallback(
    async (payload: RegisterPayload): Promise<void> => {
      dispatch({ type: 'SET_SUBMITTING', payload: true })
      dispatch({ type: 'CLEAR_SUCCESS_MESSAGE' })
      try {
        const response = await authService.register(payload)
        await persistAndNavigate(response, true)
      } catch (error) {
        throw new Error(getAuthErrorMessage(error), { cause: error })
      } finally {
        dispatch({ type: 'SET_SUBMITTING', payload: false })
      }
    },
    [persistAndNavigate]
  )

  const logout = useCallback(async (): Promise<void> => {
    dispatch({ type: 'SET_SUBMITTING', payload: true })
    try {
      await authService.logout()
    } finally {
      authStorage.clearSession()
      dispatch({ type: 'SET_USER', payload: null })
      dispatch({ type: 'SET_SUBMITTING', payload: false })
      void navigate('/login', { replace: true })
    }
  }, [navigate])

  const clearSuccessMessage = useCallback((): void => {
    dispatch({ type: 'CLEAR_SUCCESS_MESSAGE' })
  }, [])

  /* ***********************************************************************************************
  ***************************************** DERIVED STATE ******************************************
  *********************************************************************************************** */
  const { user } = state.session
  const { isBootstrapping, isSubmitting } = state.async
  const { successMessage } = state.ui

  const status = isBootstrapping
    ? AuthStatus.loading
    : user
      ? AuthStatus.authenticated
      : AuthStatus.guest

  const value = useMemo<AuthContextValue>(
    () => ({
      status:
        status === AuthStatus.loading
          ? AuthStatus.idle
          : status,
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

  /* ***********************************************************************************************
  ********************************************* RENDER *********************************************
  *********************************************************************************************** */
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthProvider }
