// Libraries
import { create } from 'zustand';

// Application
import { authService } from '@/plugins/services/auth';
import { useSessionStore } from '@/stores/sessionStore';

// Types
import { LoginBody } from '@/types/api';

const AuthStatus = {
  authenticated: 'authenticated',
  idle: 'idle',
  unauthenticated: 'unauthenticated',
} as const;

type AuthStatusValue = (typeof AuthStatus)[keyof typeof AuthStatus];

interface AuthState {
  error: string | null;
  isSubmitting: boolean;
  login: (body: LoginBody) => Promise<void>;
  logout: () => Promise<void>;
  resetError: () => void;
  status: AuthStatusValue;
}

const useAuthStore = create<AuthState>((set) => ({
  error: null,
  isSubmitting: false,
  status: AuthStatus.idle,

  resetError: (): void => {
    set({ error: null });
  },

  login: async (body: LoginBody): Promise<void> => {
    set({
      error: null,
      isSubmitting: true,
    });

    try {
      await authService.login(body);
      set({
        error: null,
        isSubmitting: false,
        status: AuthStatus.authenticated,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Não foi possível entrar. Tente novamente.';

      set({
        error: message,
        isSubmitting: false,
        status: AuthStatus.unauthenticated,
      });

      throw error;
    }
  },

  logout: async (): Promise<void> => {
    set({
      error: null,
      isSubmitting: true,
    });

    try {
      await authService.logout();
    } finally {
      useSessionStore.getState().clear();
      set({
        error: null,
        isSubmitting: false,
        status: AuthStatus.unauthenticated,
      });
    }
  },
}));

export {
  AuthStatus,
  useAuthStore,
};

export type { AuthStatusValue };
