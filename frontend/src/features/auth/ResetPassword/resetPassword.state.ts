export interface ResetPasswordUiState {
  isSuccess: boolean
}

export interface ResetPasswordAsyncState {
  isLoading: boolean
  generalError: string | null
}

export interface ResetPasswordState {
  ui: ResetPasswordUiState
  async: ResetPasswordAsyncState
}

export const resetPasswordInitialState: ResetPasswordState = {
  ui: {
    isSuccess: false,
  },
  async: {
    isLoading: false,
    generalError: null,
  },
}
