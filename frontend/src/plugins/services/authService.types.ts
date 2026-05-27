import type { LoginPayload } from '@/types/auth'
import type { AuthApiResponse } from '@/types/api'

export interface AuthService {
  login(payload: LoginPayload): Promise<AuthApiResponse>;
  logout(): Promise<void>;
  refreshSession(refreshToken: string): Promise<AuthApiResponse>;
}
