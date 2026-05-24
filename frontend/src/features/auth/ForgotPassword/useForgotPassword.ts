// Core
import { useReducer } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

// Libraries
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

// Schemas
import { forgotPasswordSchema } from '@/features/auth/schemas'
import type { ForgotPasswordFormValues } from '@/features/auth/schemas'

// Services
import { authService } from '@/features/auth/services'

// Utils
import { forgotPasswordReducer } from '@/features/auth/ForgotPassword/forgotPassword.reducer'
import { forgotPasswordInitialState } from '@/features/auth/ForgotPassword/forgotPassword.state'
import { AUTH_FORM_OPTIONS } from '@/features/auth/utils/authFormConfig'
import { getAuthErrorMessage } from '@/features/auth/utils/authErrors'
import { formatCPF } from '@/utils/formatCPF'

// Constants
import { ROUTES } from '@/constants/routes'

// Types
import type { UseForgotPasswordReturn } from '@/features/auth/ForgotPassword/ForgotPassword.types'

const useForgotPassword = (): UseForgotPasswordReturn => {
  const navigate = useNavigate()

  /* ***********************************************************************************************
  ********************************************* STATE **********************************************
  *********************************************************************************************** */
  const [state, dispatch] = useReducer(forgotPasswordReducer, forgotPasswordInitialState)

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    setValue,
    formState,
  } = useForm<ForgotPasswordFormValues>({
    ...AUTH_FORM_OPTIONS,
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { identifier: '' },
  })

  const { errors } = formState

  /* ***********************************************************************************************
  ******************************************* CALLBACKS ********************************************
  *********************************************************************************************** */
  const onIdentifierChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const raw = e.target.value
    if (raw.includes('@')) {
      dispatch({ type: 'SET_DISPLAY_VALUE', payload: raw })
      setValue('identifier', raw, { shouldValidate: false })
      return
    }
    const digits = raw.replace(/\D/g, '')
    dispatch({ type: 'SET_DISPLAY_VALUE', payload: formatCPF(digits) })
    setValue('identifier', digits, { shouldValidate: false })
  }

  const onValid = async (data: ForgotPasswordFormValues): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'CLEAR_ERRORS' })
    try {
      await authService.forgotPassword(data)
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    void rhfHandleSubmit(onValid)(e)
  }

  const navigateToLogin = (): void => {
    void navigate(ROUTES.login)
  }

  const navigateToReset = (): void => {
    void navigate(`${ROUTES.resetPassword}?token=mock-recovery`)
  }

  return {
    state,
    register,
    formState,
    errors,
    handleSubmit,
    onIdentifierChange,
    navigateToLogin,
    navigateToReset,
  }
}

export { useForgotPassword }
