// Core
import type { FormEvent } from 'react'

// Libraries
import type { FieldErrors, UseFormRegister, UseFormReturn, UseFormStateReturn } from 'react-hook-form'

// Schemas
import type { ResetPasswordFormValues } from '@/features/auth/schemas'

// Features
import type { ResetPasswordState } from '@/features/auth/ResetPassword/resetPassword.state'
import type { PasswordStrengthResult } from '@/features/auth/utils/passwordStrength'

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
