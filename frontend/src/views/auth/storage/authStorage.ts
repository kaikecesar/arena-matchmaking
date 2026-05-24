// Services
import { tokenStorage } from '@/views/auth/storage/tokenStorage'

// Utils
import { buildAuthTokens } from '@/utils/sessionTokens'
import { isAuthUser } from '@/utils/typeGuards'

// Types
import type { AuthSession } from '@/views/auth/types'

const USER_KEY = 'arena_auth_user'

const authStorage = {
  saveSession(session: AuthSession): void {
    const { tokens, rememberMe, user } = session
    tokenStorage.setTokens(tokens.accessToken, tokens.refreshToken, rememberMe)
    const storage = rememberMe
      ? localStorage
      : sessionStorage
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
    const storage = rememberMe
      ? localStorage
      : sessionStorage
    const rawUser = storage.getItem(USER_KEY)

    if (!accessToken || !rawUser) {
      return null
    }

    try {
      const parsed: unknown = JSON.parse(rawUser)
      if (!isAuthUser(parsed)) {
        return null
      }
      return {
        user: parsed,
        tokens: buildAuthTokens(accessToken, refreshToken),
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

export { authStorage }
