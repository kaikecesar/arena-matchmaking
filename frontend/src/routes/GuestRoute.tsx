// Core
import type { JSX } from 'react'

// Libraries
import { Navigate } from 'react-router-dom'

// Components
import { AuthBootstrap } from '@/routes/AuthBootstrap'

// Hooks
import { useAuth } from '@/hooks/useAuth'

// Utils
import { getRedirectForRole } from '@/plugins/utils/roleRedirects'

// Types
import type { GuestRouteProps } from './GuestRoute.types'

function GuestRoute({ children }: GuestRouteProps): JSX.Element {
  const { user, isBootstrapping } = useAuth()

  const content: JSX.Element = (() => {
    if (isBootstrapping) {
      return <AuthBootstrap />
    }
    if (user) {
      return <Navigate to={getRedirectForRole(user.role)} replace />
    }
    return children
  })()

  return content
}

export { GuestRoute }
