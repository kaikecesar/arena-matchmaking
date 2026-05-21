// Core
import { useReducer } from 'react'

// Libraries
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

// Hooks
import { useAuth } from '@/features/auth/hooks/useAuth'

// Utils
import { createAccountReducer } from '@/features/auth/CreateAccount/createAccount.reducer'
import { createAccountInitialState } from '@/features/auth/CreateAccount/createAccount.state'
import {
  registerPasswordSchema,
  registerProfileSchema,
} from '@/features/auth/schemas'
import { getPasswordStrength } from '@/features/auth/utils/passwordStrength'
import { formatCPF } from '@/utils/formatCPF'

// Constants
import { ROUTES } from '@/constants/routes'
import { authStrings } from '@/i18n/pt-BR/auth'

// Types
import type {
  RegisterPasswordValues,
  RegisterProfileValues,
} from '@/features/auth/schemas'
import type { RegisterRole } from '@/features/auth/types'

import {
  CREATE_ACCOUNT_ROLE_KEYS,
  type UseCreateAccountReturn,
} from './CreateAccount.types'

const useCreateAccount = (): UseCreateAccountReturn => {
  const navigate = useNavigate()
  const { register: registerUser, isSubmitting } = useAuth()

  /* ***********************************************************************************************
  ********************************************* STATE **********************************************
  *********************************************************************************************** */
  const [state, dispatch] = useReducer(createAccountReducer, createAccountInitialState)

  const profileForm = useForm<RegisterProfileValues>({
    resolver: zodResolver(registerProfileSchema),
    defaultValues: { name: '', email: '', document: '' },
  })

  const passwordForm = useForm<RegisterPasswordValues>({
    resolver: zodResolver(registerPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  /* ***********************************************************************************************
  ***************************************** DERIVED VALUES *****************************************
  *********************************************************************************************** */
  const passwordValue =
    useWatch({ control: passwordForm.control, name: 'password', defaultValue: '' }) ?? ''
  const strength = getPasswordStrength(passwordValue, authStrings.register.strength)

  /* ***********************************************************************************************
  ******************************************* CALLBACKS ********************************************
  *********************************************************************************************** */
  const selectRole = (role: RegisterRole): void => {
    dispatch({ type: 'SET_ROLE', payload: role })
  }

  const goNext = (): void => {
    dispatch({ type: 'CLEAR_ERRORS' })
    if (state.ui.step === 0) {
      if (!state.form.selectedRole) {
        dispatch({ type: 'SET_ROLE_ERROR', payload: authStrings.register.errorSelectRole })
        return
      }
      dispatch({ type: 'NEXT_STEP' })
      return
    }
    if (state.ui.step === 1) {
      void profileForm.handleSubmit((data) => {
        dispatch({ type: 'SET_PROFILE_DATA', payload: data })
        dispatch({ type: 'NEXT_STEP' })
      })()
      return
    }
    if (state.ui.step === 2) {
      void passwordForm.handleSubmit((data) => {
        dispatch({ type: 'SET_PASSWORD_DATA', payload: data })
        dispatch({ type: 'NEXT_STEP' })
      })()
    }
  }

  const goBack = (): void => {
    dispatch({ type: 'PREV_STEP' })
  }

  const onDocumentChange = (raw: string): void => {
    const digits = raw.replace(/\D/g, '')
    dispatch({ type: 'SET_DOCUMENT_DISPLAY', payload: formatCPF(digits) })
    void profileForm.setValue('document', digits, { shouldValidate: false })
  }

  const onConfirm = async (): Promise<void> => {
    const { selectedRole, profileData, passwordData } = state.form
    if (!selectedRole || !profileData || !passwordData) return

    dispatch({ type: 'SET_GENERAL_ERROR', payload: null })
    try {
      await registerUser({
        role: selectedRole,
        name: profileData.name,
        email: profileData.email,
        document: profileData.document.replace(/\D/g, ''),
        password: passwordData.password,
      })
      dispatch({ type: 'SET_SUCCESS' })
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

  const goToLogin = (): void => {
    void navigate(ROUTES.login)
  }

  return {
    state,
    profileForm,
    passwordForm,
    passwordValue,
    strength,
    roleKeys: CREATE_ACCOUNT_ROLE_KEYS,
    selectRole,
    goNext,
    goBack,
    onDocumentChange,
    onConfirm,
    goToLogin,
    isSubmitting,
  }
}

export { useCreateAccount }
