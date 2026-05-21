import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { UseFormRegister, FieldErrors } from 'react-hook-form'

import { useAuth } from '@/features/auth/hooks/useAuth'
import { loginSchema, type LoginFormValues } from '@/features/auth/schemas'
import { formatCPF } from '@/utils/formatCPF'

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

export function useLoginForm(): UseLoginFormReturn {
  const { login, isSubmitting } = useAuth()

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
      setValue('identifier', digits, { shouldValidate: false })
    }
  }

  const onValid = async (data: LoginFormValues): Promise<void> => {
    setGeneralError(null)
    try {
      await login(data)
    } catch (error) {
      setGeneralError(error instanceof Error ? error.message : 'Erro desconhecido')
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    void rhfHandleSubmit(onValid)(e)
  }

  return {
    register,
    errors,
    handleSubmit,
    isLoading: isSubmitting,
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
