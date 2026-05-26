// Core
import { useReducer } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

// Libraries
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

// Hooks
import { useAuth } from '@/hooks/useAuth'

// Utils
import { loginReducer } from '@/views/Login/login.reducer'
import { loginInitialState } from '@/views/Login/login.state'
import { loginSchema } from '@/plugins/schemas'
import { AUTH_FORM_OPTIONS } from '@/plugins/utils/authFormConfig'
import { authStrings } from '@/i18n/pt-BR/auth'

// Types
import type { LoginFormValues } from '@/plugins/schemas'
import type { UseLoginFormReturn } from '@/views/Login/Login.types'

const useLoginForm = (): UseLoginFormReturn => {
  const { login, isSubmitting } = useAuth()

  /* ***********************************************************************************************
  ********************************************* STATE **********************************************
  *********************************************************************************************** */
  const [state, dispatch] = useReducer(loginReducer, loginInitialState)

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState,
    setValue,
    control,
  } = useForm<LoginFormValues>({
    ...AUTH_FORM_OPTIONS,
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: '', password: '', keepSession: true },
  })

  const { errors } = formState

  /* ***********************************************************************************************
  ***************************************** DERIVED VALUES *****************************************
  *********************************************************************************************** */
  const keepSession = useWatch({ control, name: 'keepSession', defaultValue: true })
  const passwordValue = useWatch({ control, name: 'password', defaultValue: '' }) ?? ''

  /* ***********************************************************************************************
  ******************************************* CALLBACKS ********************************************
  *********************************************************************************************** */
  const togglePasswordVisibility = (): void => {
    dispatch({ type: 'TOGGLE_PASSWORD_VISIBILITY' })
  }

  const onKeepSessionChange = (checked: boolean): void => {
    setValue('keepSession', checked)
  }

  const onIdentifierChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const raw = e.target.value
    dispatch({ type: 'SET_IDENTIFIER_DISPLAY', payload: raw })
    setValue('identifier', raw, { shouldValidate: false })
  }

  const onValid = async (data: LoginFormValues): Promise<void> => {
    dispatch({ type: 'CLEAR_ERRORS' })
    try {
      await login(data)
    } catch (error) {
      dispatch({
        type: 'SET_GENERAL_ERROR',
        payload:
          error instanceof Error
            ? error.message
            : authStrings.errorGeneric,
      })
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    void rhfHandleSubmit(onValid)(e)
  }

  return {
    state,
    register,
    formState,
    errors,
    handleSubmit,
    isLoading: isSubmitting,
    togglePasswordVisibility,
    keepSession,
    onKeepSessionChange,
    onIdentifierChange,
    passwordValue,
  }
}

export { useLoginForm }
