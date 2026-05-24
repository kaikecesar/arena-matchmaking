// Core
import type { FormEvent } from 'react'

// Libraries
import type { FieldErrors, UseFormRegister, UseFormReturn, UseFormStateReturn } from 'react-hook-form'

// Schemas
import type { ResetPasswordFormValues } from '@/views/auth/schemas'

// Features
import type { ResetPasswordState } from '@/views/auth/ResetPassword/resetPassword.state'
import type { PasswordStrengthResult } from '@/views/auth/utils/passwordStrength'

export interface UseResetPasswordReturn {
  token: string;
  state: ResetPasswordState;
  register: UseFormRegister<ResetPasswordFormValues>;
  control: UseFormReturn<ResetPasswordFormValues>['control'];
  formState: UseFormStateReturn<ResetPasswordFormValues>;
  errors: FieldErrors<ResetPasswordFormValues>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  passwordValue: string;
  confirmPasswordValue: string;
  strength: PasswordStrengthResult;
  navigateToLogin: () => void;
}
