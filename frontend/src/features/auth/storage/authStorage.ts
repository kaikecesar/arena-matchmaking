import type { AuthSession, AuthUser } from '@/features/auth/types'
import { tokenStorage } from './tokenStorage'

const USER_KEY = 'arena_auth_user'

export const authStorage = {
  saveSession(session: AuthSession): void {
    const { tokens, rememberMe, user } = session
    tokenStorage.setTokens(tokens.accessToken, tokens.refreshToken, rememberMe)
    const storage = rememberMe ? localStorage : sessionStorage
    storage.setItem(USER_KEY, JSON.stringify(user))
    if (!rememberMe) {
      localStorage.removeItem(USER_KEY)
    } else {
      sessionStorage.removeItem(USER_KEY)
    }
  },

  loadSession(): AuthSession | null {
    const rememberMe = tokenStorage.getRememberMe()
    const accessToken = tokenStorage.getAccessToken(rememberMe)
    const refreshToken = tokenStorage.getRefreshToken(rememberMe) ?? undefined
    const storage = rememberMe ? localStorage : sessionStorage
    const rawUser = storage.getItem(USER_KEY)

    if (!accessToken || !rawUser) {
      return null
    }

    try {
      const user = JSON.parse(rawUser) as AuthUser
      return {
        user,
        tokens: { accessToken, refreshToken },
        rememberMe,
      }
    } catch {
      return null
    }
  },

  clearSession(): void {
    tokenStorage.clearTokens()
    localStorage.removeItem(USER_KEY)
    sessionStorage.removeItem(USER_KEY)
  },
}
