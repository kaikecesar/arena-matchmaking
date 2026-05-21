import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { authService } from '@/services/authService'
import { formatCPF } from '@/utils/formatCPF'
import { authStrings } from '@/i18n/pt-BR/auth'
import { loginSchema, LoginErrorCode, ROLE_REDIRECT } from './Login.types'
import type { LoginFormValues, LoginApiError } from './Login.types'

// ─── Return type (fully typed — no any) ──────────────────────────────────────

export interface UseLoginFormReturn {
  register: UseFormRegister<LoginFormValues>
  errors: FieldErrors<LoginFormValues>
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  generalError: string | null
  isPasswordVisible: boolean
  togglePasswordVisibility: () => void
  keepSession: boolean
  onKeepSessionChange: (checked: boolean) => void
  identifierDisplayValue: string
  onIdentifierChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  passwordValue: string
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useLoginForm(): UseLoginFormReturn {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: '', password: '', keepSession: true },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [generalError, setGeneralError] = useState<string | null>(null)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [identifierDisplayValue, setIdentifierDisplayValue] = useState('')

  const keepSession = useWatch({ control, name: 'keepSession', defaultValue: true })
  const passwordValue = useWatch({ control, name: 'password', defaultValue: '' }) ?? ''

  const togglePasswordVisibility = (): void => {
    setIsPasswordVisible((prev) => !prev)
  }

  const onKeepSessionChange = (checked: boolean): void => {
    setValue('keepSession', checked)
  }

  const onIdentifierChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const raw = e.target.value
    const isEmail = raw.includes('@')

    if (isEmail) {
      setIdentifierDisplayValue(raw)
      setValue('identifier', raw, { shouldValidate: false })
    } else {
      const digits = raw.replace(/\D/g, '')
      setIdentifierDisplayValue(formatCPF(digits))
      // Store raw digits — backend expects no formatting
      setValue('identifier', digits, { shouldValidate: false })
    }
  }

  const onValid = async (data: LoginFormValues): Promise<void> => {
    setIsLoading(true)
    setGeneralError(null)

    try {
      const body = await authService.login(data)
      void navigate(ROLE_REDIRECT[body.user.role])
      return
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'status' in error &&
        typeof (error as { status: unknown }).status === 'number'
      ) {
        const typedError = error as {
          status: number
          body: unknown
        }

        if (typedError.status === 429) {
          setGeneralError(authStrings.errorRateLimited)
          return
        }

        if (typedError.status === 401) {
          const body = typedError.body as LoginApiError
          setGeneralError(
            body.error === LoginErrorCode.invalidCredentials
              ? authStrings.errorInvalidCredentials
              : authStrings.errorGeneric
          )
          return
        }
      }

      setGeneralError(authStrings.errorGeneric)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    void rhfHandleSubmit(onValid)(e)
  }

  return {
    register,
    errors,
    handleSubmit,
    isLoading,
    generalError,
    isPasswordVisible,
    togglePasswordVisibility,
    keepSession,
    onKeepSessionChange,
    identifierDisplayValue,
    onIdentifierChange,
    passwordValue,
  }
}
