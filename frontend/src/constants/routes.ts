export enum RoutePath {
  login = '/login',
  register = '/create-account',
  forgotPassword = '/forgot-password',
  resetPassword = '/reset-password',
  dashboard = '/dashboard',
  dashboardEvents = '/dashboard/events',
  dashboardAthletes = '/dashboard/athletes',
  profile = '/profile',
}

/** Alias for gradual migration — values match {@link RoutePath}. */
export const ROUTES = RoutePath
