// Types
import {
  resetPasswordInitialState,
  type ResetPasswordState,
} from '@/features/auth/ResetPassword/resetPassword.state'

/* *************************************************************************************************
******************************************* ACTION TYPES *******************************************
************************************************************************************************* */
export type ResetPasswordAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_GENERAL_ERROR'; payload: string | null }
  | { type: 'SET_SUCCESS' }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'RESET_STATE' }

/* *************************************************************************************************
********************************************* REDUCER **********************************************
************************************************************************************************* */
const resetPasswordReducer = (
  state: ResetPasswordState,
  action: ResetPasswordAction
): ResetPasswordState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, async: { ...state.async, isLoading: action.payload } }
    case 'SET_GENERAL_ERROR':
      return { ...state, async: { ...state.async, generalError: action.payload } }
    case 'SET_SUCCESS':
      return { ...state, ui: { ...state.ui, isSuccess: true } }
    case 'CLEAR_ERRORS':
      return { ...state, async: { ...state.async, generalError: null } }
    case 'RESET_STATE':
      return { ...resetPasswordInitialState }
    default:
      return state
  }
}

export { resetPasswordReducer }
