export interface TokenStorage {
  clearTokens(): void;
  getAccessToken(persistent: boolean): string | null;
  getRefreshToken(persistent: boolean): string | null;
  getRememberMe(): boolean;
  setTokens(accessToken: string, refreshToken: string | undefined, rememberMe: boolean): void;
}
