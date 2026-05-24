import type { AuthUser, UserRole } from '@/features/auth/types'

export interface MockTokens {
  accessToken: string;
  refreshToken: string;
}

export type MockTokenPayload = Record<string, unknown>

export interface BuildMockUserOptions {
  identifier: string;
  name?: string | undefined;
  role?: UserRole | undefined;
}

export type BuildMockUserFn = (
  identifier: string,
  name?: string | undefined,
  role?: UserRole | undefined
) => AuthUser

export type CreateMockTokensFn = (user: AuthUser) => MockTokens
