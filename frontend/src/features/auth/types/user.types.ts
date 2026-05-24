export enum UserRole {
  organizer = 'ORGANIZER',
  athlete = 'ATHLETE',
  coach = 'COACH',
}

export type UserRoleType = UserRole

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
