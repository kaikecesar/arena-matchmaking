// Core
import type { ReactElement } from 'react'

// Libraries
import { Navigate } from 'react-router-dom'

// Components
import { AuthBootstrap } from '@/features/auth/routes/AuthBootstrap'

// Hooks
import { useAuth } from '@/features/auth/hooks/useAuth'

// Utils
import { getRedirectForRole } from '@/features/auth/utils/roleRedirects'

// Types
import type { GuestRouteProps } from './GuestRoute.types'

const GuestRoute = ({ children }: GuestRouteProps): ReactElement => {
  const { user, isBootstrapping } = useAuth()

  if (isBootstrapping) {
    return <AuthBootstrap />
  }

  if (user) {
    return <Navigate to={getRedirectForRole(user.role)} replace />
  }

  return children
}

export { GuestRoute }
