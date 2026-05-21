export interface ForgotPasswordUiState {
  displayValue: string
  isSuccess: boolean
}

export interface ForgotPasswordAsyncState {
  isLoading: boolean
  generalError: string | null
}

export interface ForgotPasswordState {
  ui: ForgotPasswordUiState
  async: ForgotPasswordAsyncState
}

export const forgotPasswordInitialState: ForgotPasswordState = {
  ui: {
    displayValue: '',
    isSuccess: false,
  },
  async: {
    isLoading: false,
    generalError: null,
  },
}
