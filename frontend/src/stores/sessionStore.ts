// Libraries
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const SESSION_STORAGE_KEY = 'arena-session';

/** Legacy keys from tokenStorage — removed on clear for existing browsers. */
const LEGACY_ACCESS_TOKEN_KEY = 'arena_access_token';
const LEGACY_REFRESH_TOKEN_KEY = 'arena_refresh_token';
const LEGACY_REMEMBER_ME_KEY = 'arena_remember_me';
const LEGACY_KEEP_SESSION_KEY = 'arena_keep_session';

interface SessionState {
  clear: () => void;
  keepSession: boolean;
  setKeepSession: (keepSession: boolean) => void;
}

type SessionPersistedState = Pick<SessionState, 'keepSession'>;

const clearLegacyStorage = (): void => {
  localStorage.removeItem(LEGACY_KEEP_SESSION_KEY);
  localStorage.removeItem(LEGACY_ACCESS_TOKEN_KEY);
  localStorage.removeItem(LEGACY_REFRESH_TOKEN_KEY);
  localStorage.removeItem(LEGACY_REMEMBER_ME_KEY);
  sessionStorage.removeItem(LEGACY_ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(LEGACY_REFRESH_TOKEN_KEY);
};

const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      keepSession: true,
      setKeepSession: (keepSession): void => {
        set({ keepSession });
      },
      clear: (): void => {
        clearLegacyStorage();
        set({ keepSession: true });
      },
    }),
    {
      name: SESSION_STORAGE_KEY,
      partialize: (state): SessionPersistedState => ({
        keepSession: state.keepSession,
      }),
      storage: createJSONStorage<SessionPersistedState>(() => localStorage),
      onRehydrateStorage: (): ((state?: SessionState) => void) => {
        return (): void => {
          clearLegacyStorage();
        };
      },
    },
  ),
);

export {
  clearLegacyStorage,
  SESSION_STORAGE_KEY,
  useSessionStore,
};
