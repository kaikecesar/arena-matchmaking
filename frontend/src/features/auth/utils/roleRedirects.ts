// Constants
import { ROUTES } from '@/constants/routes'
import type { RoutePath } from '@/constants/routes.types'

// Types
import { UserRole } from '@/features/auth/types'
import type { UserRoleType } from '@/features/auth/types'

const ROLE_REDIRECT: Record<UserRoleType, RoutePath> = {
  [UserRole.organizer]: ROUTES.dashboardEvents,
  [UserRole.athlete]: ROUTES.profile,
  [UserRole.coach]: ROUTES.dashboardAthletes,
}

const getRedirectForRole = (role: UserRoleType): RoutePath => ROLE_REDIRECT[role]

export { ROLE_REDIRECT, getRedirectForRole }
