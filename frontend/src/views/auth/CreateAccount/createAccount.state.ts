// Types
import type {
  RegisterPasswordValues,
  RegisterProfileValues,
} from '@/views/auth/schemas'
import type { RegisterRole } from '@/views/auth/types'

export interface CreateAccountUiState {
  step: number
  isSuccess: boolean
  documentDisplay: string
}

export interface CreateAccountFormState {
  selectedRole: RegisterRole | null
  profileData: RegisterProfileValues | null
  passwordData: RegisterPasswordValues | null
}

export interface CreateAccountAsyncState {
  generalError: string | null
  roleError: string | null
}

export interface CreateAccountState {
  ui: CreateAccountUiState
  form: CreateAccountFormState
  async: CreateAccountAsyncState
}

export const createAccountInitialState: CreateAccountState = {
  ui: {
    step: 0,
    isSuccess: false,
    documentDisplay: '',
  },
  form: {
    selectedRole: null,
    profileData: null,
    passwordData: null,
  },
  async: {
    generalError: null,
    roleError: null,
  },
}
