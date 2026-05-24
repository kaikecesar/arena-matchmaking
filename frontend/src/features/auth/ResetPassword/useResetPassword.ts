// Core
import { useReducer } from 'react'
import type { FormEvent } from 'react'

// Libraries
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'

// Schemas
import { resetPasswordSchema } from '@/features/auth/schemas'
import type { ResetPasswordFormValues } from '@/features/auth/schemas'

// Services
import { authService } from '@/features/auth/services'

// Utils
import { resetPasswordReducer } from '@/features/auth/ResetPassword/resetPassword.reducer'
import { resetPasswordInitialState } from '@/features/auth/ResetPassword/resetPassword.state'
import { AUTH_FORM_OPTIONS } from '@/features/auth/utils/authFormConfig'
import { getAuthErrorMessage } from '@/features/auth/utils/authErrors'
import { getPasswordStrength } from '@/features/auth/utils/passwordStrength'

// Constants
import { ROUTES } from '@/constants/routes'

// I18n
import { authStrings } from '@/i18n/pt-BR/auth'

// Types
import type { UseResetPasswordReturn } from '@/features/auth/ResetPassword/ResetPassword.types'

const useResetPassword = (): UseResetPasswordReturn => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? 'mock-recovery'

  /* ***********************************************************************************************
  ********************************************* STATE **********************************************
  *********************************************************************************************** */
  const [state, dispatch] = useReducer(resetPasswordReducer, resetPasswordInitialState)

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    control,
    formState,
  } = useForm<ResetPasswordFormValues>({
    ...AUTH_FORM_OPTIONS,
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  const { errors } = formState

  /* ***********************************************************************************************
  ***************************************** DERIVED VALUES *****************************************
  *********************************************************************************************** */
  const passwordValue = useWatch({ control, name: 'password', defaultValue: '' }) ?? ''
  const confirmPasswordValue =
    useWatch({ control, name: 'confirmPassword', defaultValue: '' }) ?? ''
  const strength = getPasswordStrength(passwordValue, authStrings.reset.strength)

  /* ***********************************************************************************************
  ******************************************* CALLBACKS ********************************************
  *********************************************************************************************** */
  const onValid = async (data: ResetPasswordFormValues): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'CLEAR_ERRORS' })
    try {
      await authService.resetPassword({ ...data, token })
      dispatch({ type: 'SET_SUCCESS' })
    } catch (error) {
      dispatch({
        type: 'SET_GENERAL_ERROR',
        payload: getAuthErrorMessage(error),
      })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => void rhfHandleSubmit(onValid)(e)

  const navigateToLogin = (): void => {
    void navigate(ROUTES.login)
  }

  return {
    token,
    state,
    register,
    control,
    formState,
    errors,
    handleSubmit,
    passwordValue,
    confirmPasswordValue,
    strength,
    navigateToLogin,
  }
}

export { useResetPassword }
