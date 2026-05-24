import type { ReactElement } from 'react'

import type { UserRole } from '@/features/auth/types'

export interface ProtectedRouteProps {
  children: ReactElement;
  allowedRoles?: readonly UserRole[] | undefined;
}
