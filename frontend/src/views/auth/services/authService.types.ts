import type {
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from '@/views/auth/types'
import type {
  AuthApiResponse,
  ForgotPasswordApiResponse,
  ResetPasswordApiResponse,
} from '@/types/api'

export interface AuthService {
  login(payload: LoginPayload): Promise<AuthApiResponse>;
  register(payload: RegisterPayload): Promise<AuthApiResponse>;
  forgotPassword(payload: ForgotPasswordPayload): Promise<ForgotPasswordApiResponse>;
  resetPassword(payload: ResetPasswordPayload): Promise<ResetPasswordApiResponse>;
  logout(): Promise<void>;
  refreshSession(refreshToken: string): Promise<AuthApiResponse>;
}
