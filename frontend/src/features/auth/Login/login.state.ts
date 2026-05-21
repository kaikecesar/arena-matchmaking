export interface LoginUiState {
  identifierDisplayValue: string
  isPasswordVisible: boolean
}

export interface LoginAsyncState {
  generalError: string | null
}

export interface LoginState {
  ui: LoginUiState
  async: LoginAsyncState
}

export const loginInitialState: LoginState = {
  ui: {
    identifierDisplayValue: '',
    isPasswordVisible: false,
  },
  async: {
    generalError: null,
  },
}
