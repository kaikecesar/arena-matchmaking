// Types
import type { CreateAccountState } from '@/views/CreateAccount/createAccount.state'
import type {
  RegisterPasswordValues,
  RegisterProfileValues,
} from '@/plugins/schemas'
import type { RegisterRole } from '@/types/auth'

/* *************************************************************************************************
******************************************* ACTION TYPES *******************************************
************************************************************************************************* */
export type CreateAccountAction =
  | { type: 'SET_ROLE'; payload: RegisterRole }
  | { type: 'SET_ROLE_ERROR'; payload: string | null }
  | { type: 'SET_GENERAL_ERROR'; payload: string | null }
  | { type: 'SET_DOCUMENT_DISPLAY'; payload: string }
  | { type: 'SET_PROFILE_DATA'; payload: RegisterProfileValues }
  | { type: 'SET_PASSWORD_DATA'; payload: RegisterPasswordValues }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_SUCCESS' }
  | { type: 'CLEAR_ERRORS' }

/* *************************************************************************************************
********************************************* REDUCER **********************************************
************************************************************************************************* */
const createAccountReducer = (
  state: CreateAccountState,
  action: CreateAccountAction
): CreateAccountState => {
  switch (action.type) {
    case 'SET_ROLE':
      return {
        ...state,
        form: { ...state.form, selectedRole: action.payload },
        async: { ...state.async, roleError: null },
      }
    case 'SET_ROLE_ERROR':
      return { ...state, async: { ...state.async, roleError: action.payload } }
    case 'SET_GENERAL_ERROR':
      return { ...state, async: { ...state.async, generalError: action.payload } }
    case 'SET_DOCUMENT_DISPLAY':
      return { ...state, ui: { ...state.ui, documentDisplay: action.payload } }
    case 'SET_PROFILE_DATA':
      return { ...state, form: { ...state.form, profileData: action.payload } }
    case 'SET_PASSWORD_DATA':
      return { ...state, form: { ...state.form, passwordData: action.payload } }
    case 'NEXT_STEP':
      return { ...state, ui: { ...state.ui, step: state.ui.step + 1 } }
    case 'PREV_STEP':
      return { ...state, ui: { ...state.ui, step: Math.max(0, state.ui.step - 1) } }
    case 'SET_SUCCESS':
      return { ...state, ui: { ...state.ui, isSuccess: true } }
    case 'CLEAR_ERRORS':
      return {
        ...state,
        async: { generalError: null, roleError: null },
      }
    default:
      return state
  }
}

export { createAccountReducer }
