export enum RegisterRole {
  organizer = 'organizer',
  athlete = 'athlete',
  coach = 'coach',
}

export interface LoginPayload {
  identifier: string
  password: string
  keepSession: boolean
}

export interface RegisterPayload {
  role: RegisterRole
  name: string
  email: string
  document: string
  password: string
}

export interface ForgotPasswordPayload {
  identifier: string
}

export interface ResetPasswordPayload {
  token: string
  password: string
  confirmPassword: string
}
