// Core
import type { ChangeEvent, FormEvent } from 'react'

// Libraries
import type { FieldErrors, UseFormRegister, UseFormStateReturn } from 'react-hook-form'

// Schemas
import type { ForgotPasswordFormValues } from '@/features/auth/schemas'

// Features
import type { ForgotPasswordState } from '@/features/auth/ForgotPassword/forgotPassword.state'

export interface UseForgotPasswordReturn {
  state: ForgotPasswordState;
  register: UseFormRegister<ForgotPasswordFormValues>;
  formState: UseFormStateReturn<ForgotPasswordFormValues>;
  errors: FieldErrors<ForgotPasswordFormValues>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onIdentifierChange: (e: ChangeEvent<HTMLInputElement>) => void;
  navigateToLogin: () => void;
  navigateToReset: () => void;
}
