// Types
import type { AuthProviderState } from '@/views/auth/context/authProvider.state'
import type { AuthUser } from '@/views/auth/types'

/* *************************************************************************************************
******************************************* ACTION TYPES *******************************************
************************************************************************************************* */
export type AuthProviderAction =
  | { type: 'SET_USER'; payload: AuthUser | null }
  | { type: 'SET_BOOTSTRAPPING'; payload: boolean }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'SET_SUCCESS_MESSAGE'; payload: string | null }
  | { type: 'CLEAR_SUCCESS_MESSAGE' }

/* *************************************************************************************************
********************************************* REDUCER **********************************************
************************************************************************************************* */
const authProviderReducer = (
  state: AuthProviderState,
  action: AuthProviderAction
): AuthProviderState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, session: { user: action.payload } }
    case 'SET_BOOTSTRAPPING':
      return { ...state, async: { ...state.async, isBootstrapping: action.payload } }
    case 'SET_SUBMITTING':
      return { ...state, async: { ...state.async, isSubmitting: action.payload } }
    case 'SET_SUCCESS_MESSAGE':
      return { ...state, ui: { ...state.ui, successMessage: action.payload } }
    case 'CLEAR_SUCCESS_MESSAGE':
      return { ...state, ui: { ...state.ui, successMessage: null } }
    default:
      return state
  }
}

export { authProviderReducer }
