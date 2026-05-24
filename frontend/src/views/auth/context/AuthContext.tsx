// Core
import { createContext } from 'react'

// Types
import type { AuthContextValue } from './AuthContext.types'

export type { AuthStatus, AuthContextValue, AuthProviderProps } from './AuthContext.types'

const AuthContext = createContext<AuthContextValue | null>(null)

export { AuthContext }
