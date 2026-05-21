// Core
import { useContext } from 'react'

// Context
import { AuthContext } from '@/features/auth/context/AuthContext'

// Types
import type { AuthContextValue } from '@/features/auth/context/AuthContext.types'

const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export { useAuth }
