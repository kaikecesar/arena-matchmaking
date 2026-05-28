/** Mirrors `backend/src/http/schemas/auth.ts` and `user.ts`. */
export type {
  LoginBody,
  RegisterBody,
} from '@/plugins/services/auth/auth.schemas';

export interface RegisterResponse {
  id: string;
}
