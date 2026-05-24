// Types
import type { AuthUser } from '@/views/auth/types/user.types'

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string | undefined;
}

export interface AuthSession {
  user: AuthUser;
  tokens: AuthTokens;
  rememberMe: boolean;
}
