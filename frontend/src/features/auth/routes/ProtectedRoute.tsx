import type { ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/features/auth/hooks/useAuth'
import type { UserRole } from '@/features/auth/types'
import { getRedirectForRole } from '@/features/auth/utils/roleRedirects'
import { AuthBootstrap } from './AuthBootstrap'

type ProtectedRouteProps = {
  children: ReactElement
  allowedRoles?: UserRole[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps): ReactElement {
  const { user, isBootstrapping } = useAuth()
  const location = useLocation()

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
}
