// Types
import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import type { LoginFormValues } from '@/features/auth/schemas'
import type { LoginState } from '@/features/auth/Login/login.state'
import type { ChangeEvent, FormEvent } from 'react'

export interface UseLoginFormReturn {
  state: LoginState
  register: UseFormRegister<LoginFormValues>
  errors: FieldErrors<LoginFormValues>
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  togglePasswordVisibility: () => void
  keepSession: boolean
  onKeepSessionChange: (checked: boolean) => void
  onIdentifierChange: (e: ChangeEvent<HTMLInputElement>) => void
  passwordValue: string
}
