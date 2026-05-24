// Constants
import { ROUTES } from '@/routes/routes'
import type { RoutePath } from '@/routes/routes.types'

// Types
import { UserRole } from '@/views/auth/types'
import type { UserRoleType } from '@/views/auth/types'

const ROLE_REDIRECT: Record<UserRoleType, RoutePath> = {
  [UserRole.organizer]: ROUTES.dashboardEvents,
  [UserRole.athlete]: ROUTES.profile,
  [UserRole.coach]: ROUTES.dashboardAthletes,
}

const getRedirectForRole = (role: UserRoleType): RoutePath => ROLE_REDIRECT[role]

export { ROLE_REDIRECT, getRedirectForRole }
