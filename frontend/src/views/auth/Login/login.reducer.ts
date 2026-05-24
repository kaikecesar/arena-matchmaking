// Types
import { loginInitialState, type LoginState } from '@/views/auth/Login/login.state'

/* *************************************************************************************************
******************************************* ACTION TYPES *******************************************
************************************************************************************************* */
export type LoginAction =
  | { type: 'SET_IDENTIFIER_DISPLAY'; payload: string }
  | { type: 'TOGGLE_PASSWORD_VISIBILITY' }
  | { type: 'SET_GENERAL_ERROR'; payload: string | null }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'RESET_STATE' }

/* *************************************************************************************************
********************************************* REDUCER **********************************************
************************************************************************************************* */
const loginReducer = (state: LoginState, action: LoginAction): LoginState => {
  switch (action.type) {
    case 'SET_IDENTIFIER_DISPLAY':
      return { ...state, ui: { ...state.ui, identifierDisplayValue: action.payload } }
    case 'TOGGLE_PASSWORD_VISIBILITY':
      return {
        ...state,
        ui: { ...state.ui, isPasswordVisible: !state.ui.isPasswordVisible },
      }
    case 'SET_GENERAL_ERROR':
      return { ...state, async: { ...state.async, generalError: action.payload } }
    case 'CLEAR_ERRORS':
      return { ...state, async: { generalError: null } }
    case 'RESET_STATE':
      return { ...loginInitialState }
    default:
      return state
  }
}

export { loginReducer }
