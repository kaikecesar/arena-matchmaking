// Types
import { TokenStorage } from './tokenStorage.types';

const ACCESS_TOKEN_KEY: string = 'arena_access_token';
const REFRESH_TOKEN_KEY: string = 'arena_refresh_token';
const REMEMBER_ME_KEY: string = 'arena_remember_me';

const getStorage = (persistent: boolean): Storage =>
  persistent
    ? localStorage
    : sessionStorage;

const tokenStorage: TokenStorage = {
  getAccessToken(persistent: boolean): string | null {
    return getStorage(persistent).getItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken(persistent: boolean): string | null {
    return getStorage(persistent).getItem(REFRESH_TOKEN_KEY);
  },

  setTokens(
    accessToken: string,
    refreshToken: string | undefined,
    rememberMe: boolean
  ): void {
    const storage = getStorage(rememberMe);
    storage.setItem(ACCESS_TOKEN_KEY, accessToken);
    if (refreshToken) {
      storage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
    localStorage.setItem(REMEMBER_ME_KEY, String(rememberMe));
    if (!rememberMe) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    } else {
      sessionStorage.removeItem(ACCESS_TOKEN_KEY);
      sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    }
  },

  clearTokens(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(REMEMBER_ME_KEY);
  },

  getRememberMe(): boolean {
    return localStorage.getItem(REMEMBER_ME_KEY) === 'true';
  },
};

export { tokenStorage };
