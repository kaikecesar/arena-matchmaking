// Core
import type { JSX } from 'react'

// Libraries
import { Navigate, useLocation } from 'react-router-dom'

// Components
import { AuthBootstrap } from '@/views/auth/routes/AuthBootstrap'

// Hooks
import { useAuth } from '@/views/auth/hooks/useAuth'

// Constants
import { ROUTES } from '@/routes/routes'

// Utils
import { getRedirectForRole } from '@/views/auth/utils/roleRedirects'

// Types
import type { ProtectedRouteProps } from './ProtectedRoute.types'

function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps): JSX.Element {
  const { user, isBootstrapping } = useAuth()
  const location = useLocation()

  const content: JSX.Element = (() => {
    if (isBootstrapping) {
      return <AuthBootstrap />
    }
    if (!user) {
      return <Navigate to={ROUTES.login} state={{ from: location.pathname }} replace />
    }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to={getRedirectForRole(user.role)} replace />
    }
    return children
  })()

  return content
}

export { ProtectedRoute }
