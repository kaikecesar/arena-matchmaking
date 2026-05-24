import type { ReactElement } from 'react'

import type { UserRole } from '@/views/auth/types'

export interface ProtectedRouteProps {
  children: ReactElement;
  allowedRoles?: readonly UserRole[] | undefined;
}
