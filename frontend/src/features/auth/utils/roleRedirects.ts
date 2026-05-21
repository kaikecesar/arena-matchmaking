import { ROUTES } from '@/constants/routes'
import { UserRole, type UserRole as UserRoleType } from '@/features/auth/types'

export const ROLE_REDIRECT: Record<UserRoleType, string> = {
  [UserRole.organizer]: ROUTES.dashboardEvents,
  [UserRole.athlete]: ROUTES.profile,
  [UserRole.coach]: ROUTES.dashboardAthletes,
}

export const getRedirectForRole = (role: UserRoleType): string => ROLE_REDIRECT[role]
