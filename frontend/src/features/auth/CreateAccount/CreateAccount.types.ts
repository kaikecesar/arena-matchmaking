import type { UseFormReturn } from 'react-hook-form'

import type {
  RegisterPasswordValues,
  RegisterProfileValues,
} from '@/features/auth/schemas'
import { RegisterRole } from '@/features/auth/types'
import type { PasswordStrengthResult } from '@/features/auth/utils/passwordStrength'

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
  state: CreateAccountState
  profileForm: UseFormReturn<RegisterProfileValues>
  passwordForm: UseFormReturn<RegisterPasswordValues>
  passwordValue: string
  strength: PasswordStrengthResult
  roleKeys: typeof CREATE_ACCOUNT_ROLE_KEYS
  selectRole: (role: RegisterRole) => void
  goNext: () => void
  goBack: () => void
  onDocumentChange: (raw: string) => void
  onConfirm: () => Promise<void>
  goToLogin: () => void
  isSubmitting: boolean
}
