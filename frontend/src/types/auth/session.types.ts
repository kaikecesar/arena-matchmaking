// Types
import type { AuthUser } from '@/types/auth/user.types'

export interface AuthSession {
  user: AuthUser;
  rememberMe: boolean;
}
