// Core
import { useReducer } from 'react'
import type { FormEvent } from 'react'

// Libraries
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'

// Schemas
import { resetPasswordSchema } from '@/plugins/schemas'
import type { ResetPasswordFormValues } from '@/plugins/schemas'

// Services
import { authService } from '@/plugins/services'

// Utils
import { resetPasswordReducer } from '@/views/auth/ResetPassword/resetPassword.reducer'
import { resetPasswordInitialState } from '@/views/auth/ResetPassword/resetPassword.state'
import { AUTH_FORM_OPTIONS } from '@/plugins/utils/authFormConfig'
import { getAuthErrorMessage } from '@/plugins/utils/authErrors'
import { getPasswordStrength } from '@/plugins/utils/passwordStrength'

// Constants
import { ROUTES } from '@/routes/routes'

// I18n
import { authStrings } from '@/i18n/pt-BR/auth'

// Types
import type { UseResetPasswordReturn } from '@/views/auth/ResetPassword/ResetPassword.types'

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
