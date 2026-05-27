export enum RoutePath {
  login = '/login',
  dashboard = '/dashboard',
  dashboardEvents = '/dashboard/events',
  dashboardAthletes = '/dashboard/athletes',
  profile = '/profile',
}

/** Alias for gradual migration — values match {@link RoutePath}. */
export const ROUTES = RoutePath
