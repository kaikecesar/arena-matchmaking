// Constants
import { ROUTES } from '@/routes/routes'
import type { RoutePath } from '@/routes/routes.types'

// Types
import { UserRole } from '@/types/auth'
import type { UserRoleType } from '@/types/auth'

const ROLE_REDIRECT: Record<UserRoleType, RoutePath> = {
  [UserRole.organizer]: ROUTES.dashboardEvents,
  [UserRole.athlete]: ROUTES.profile,
  [UserRole.coach]: ROUTES.dashboardAthletes,
}

const getRedirectForRole = (role: UserRoleType): RoutePath => ROLE_REDIRECT[role]

export { ROLE_REDIRECT, getRedirectForRole }
