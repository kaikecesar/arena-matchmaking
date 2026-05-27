// Types
import type { FieldErrors, UseFormRegister, UseFormStateReturn } from 'react-hook-form'
import type { LoginFormValues } from '@/plugins/schemas'
import type { LoginState } from '@/views/Login/login.state'
import type { ChangeEvent, SubmitEvent } from 'react'

export interface UseLoginFormReturn {
  state: LoginState;
  register: UseFormRegister<LoginFormValues>;
  formState: UseFormStateReturn<LoginFormValues>;
  errors: FieldErrors<LoginFormValues>;
  handleSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  togglePasswordVisibility: () => void;
  keepSession: boolean;
  onKeepSessionChange: (checked: boolean) => void;
  onIdentifierChange: (e: ChangeEvent<HTMLInputElement>) => void;
  passwordValue: string;
}
