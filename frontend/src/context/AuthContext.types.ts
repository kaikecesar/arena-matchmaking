import type { ReactNode } from 'react'

import type { AuthSession, AuthUser, LoginPayload, RegisterPayload } from '@/types/auth'

export enum AuthStatus {
  idle = 'idle',
  loading = 'loading',
  authenticated = 'authenticated',
  guest = 'guest',
}

export interface AuthContextValue {
  status: AuthStatus;
  user: AuthUser | null;
  isBootstrapping: boolean;
  isSubmitting: boolean;
  successMessage: string | null;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  clearSuccessMessage: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
  initialSession?: AuthSession | null | undefined;
}
