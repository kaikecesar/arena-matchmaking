import type { ChangeEventHandler } from 'react'
import type { UseFormReturn } from 'react-hook-form'

import type {
  RegisterPasswordValues,
  RegisterProfileValues,
} from '@/plugins/schemas'
import { RegisterRole } from '@/types/auth'
import type { PasswordStrengthResult } from '@/plugins/utils/passwordStrength'

import type { CreateAccountState } from './createAccount.state'

export const CREATE_ACCOUNT_ROLE_KEYS = [
  RegisterRole.organizer,
  RegisterRole.athlete,
  RegisterRole.coach,
] as const

export type CreateAccountRoleKey = (typeof CREATE_ACCOUNT_ROLE_KEYS)[number]

export const CREATE_ACCOUNT_STEPS = [
  'role',
  'profile',
  'security',
  'review',
] as const

export type CreateAccountStepLabel = string

export interface UseCreateAccountReturn {
  state: CreateAccountState;
  profileForm: UseFormReturn<RegisterProfileValues>;
  passwordForm: UseFormReturn<RegisterPasswordValues>;
  nameValue: string;
  emailValue: string;
  passwordValue: string;
  confirmPasswordValue: string;
  onNameChange: ChangeEventHandler<HTMLInputElement>;
  onNameBlur: () => void;
  onEmailChange: ChangeEventHandler<HTMLInputElement>;
  onEmailBlur: () => void;
  onDocumentBlur: () => void;
  onPasswordChange: ChangeEventHandler<HTMLInputElement>;
  onPasswordBlur: () => void;
  onConfirmPasswordChange: ChangeEventHandler<HTMLInputElement>;
  onConfirmPasswordBlur: () => void;
  strength: PasswordStrengthResult;
  roleKeys: typeof CREATE_ACCOUNT_ROLE_KEYS;
  selectRole: (role: RegisterRole) => void;
  goNext: () => void;
  goBack: () => void;
  onDocumentChange: (raw: string) => void;
  onConfirm: () => Promise<void>;
  goToLogin: () => void;
  isSubmitting: boolean;
}
