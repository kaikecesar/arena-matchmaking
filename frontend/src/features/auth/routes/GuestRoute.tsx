import type { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { getRedirectForRole } from '@/features/auth/utils/roleRedirects'
import { AuthBootstrap } from './AuthBootstrap'

type GuestRouteProps = {
  children: ReactElement
}

export function GuestRoute({ children }: GuestRouteProps): ReactElement {
  const { user, isBootstrapping } = useAuth()

  if (isBootstrapping) {
    return <AuthBootstrap />
  }

  if (user) {
    return <Navigate to={getRedirectForRole(user.role)} replace />
  }

  return children
}
