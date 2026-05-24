import type { ReactElement } from 'react'

import type { UserRole } from '@/types/auth'

export interface ProtectedRouteProps {
  children: ReactElement;
  allowedRoles?: readonly UserRole[] | undefined;
}
