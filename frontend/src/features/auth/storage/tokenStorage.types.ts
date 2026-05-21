export interface TokenStorage {
  getAccessToken(persistent: boolean): string | null
  getRefreshToken(persistent: boolean): string | null
  setTokens(accessToken: string, refreshToken: string | undefined, rememberMe: boolean): void
  clearTokens(): void
  getRememberMe(): boolean
}
