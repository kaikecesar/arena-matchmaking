// Types
import {
  forgotPasswordInitialState,
  type ForgotPasswordState,
} from '@/features/auth/ForgotPassword/forgotPassword.state'

/* *************************************************************************************************
******************************************* ACTION TYPES *******************************************
************************************************************************************************* */
export type ForgotPasswordAction =
  | { type: 'SET_DISPLAY_VALUE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_GENERAL_ERROR'; payload: string | null }
  | { type: 'SET_SUCCESS' }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'RESET_STATE' }

/* *************************************************************************************************
********************************************* REDUCER **********************************************
************************************************************************************************* */
const forgotPasswordReducer = (
  state: ForgotPasswordState,
  action: ForgotPasswordAction
): ForgotPasswordState => {
  switch (action.type) {
    case 'SET_DISPLAY_VALUE':
      return { ...state, ui: { ...state.ui, displayValue: action.payload } }
    case 'SET_LOADING':
      return { ...state, async: { ...state.async, isLoading: action.payload } }
    case 'SET_GENERAL_ERROR':
      return { ...state, async: { ...state.async, generalError: action.payload } }
    case 'SET_SUCCESS':
      return { ...state, ui: { ...state.ui, isSuccess: true } }
    case 'CLEAR_ERRORS':
      return { ...state, async: { ...state.async, generalError: null } }
    case 'RESET_STATE':
      return { ...forgotPasswordInitialState }
    default:
      return state
  }
}

export { forgotPasswordReducer }
