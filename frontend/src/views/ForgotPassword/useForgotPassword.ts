// Core
import { useReducer } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

// Libraries
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

// Schemas
import { forgotPasswordSchema } from '@/plugins/schemas'
import type { ForgotPasswordFormValues } from '@/plugins/schemas'

// Services
import { authService } from '@/plugins/services'

// Utils
import { forgotPasswordReducer } from '@/views/ForgotPassword/forgotPassword.reducer'
import { forgotPasswordInitialState } from '@/views/ForgotPassword/forgotPassword.state'
import { AUTH_FORM_OPTIONS } from '@/plugins/utils/authFormConfig'
import { getAuthErrorMessage } from '@/plugins/utils/authErrors'
import { formatCPF } from '@/plugins/utils/formatCPF'

// Constants
import { ROUTES } from '@/routes/routes'

// Types
import type { UseForgotPasswordReturn } from '@/views/ForgotPassword/ForgotPassword.types'

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
