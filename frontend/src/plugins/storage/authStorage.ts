// Utils
import { isAuthUser } from '@/plugins/utils/typeGuards'

// Types
import type { AuthSession, AuthUser } from '@/types/auth'

const USER_KEY = 'arena_auth_user'
const REMEMBER_ME_KEY = 'arena_remember_me'
const KNOWN_USERS_KEY = 'arena_known_users'

const getStorage = (rememberMe: boolean): Storage =>
  rememberMe
    ? localStorage
    : sessionStorage

const normalizeEmail = (email: string): string => email.trim().toLowerCase()

const parseKnownUsers = (): Record<string, AuthUser> => {
  const raw = localStorage.getItem(KNOWN_USERS_KEY)

  if (!raw) {
    return {}
  }

  try {
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) {
      return {}
    }

    return Object.entries(parsed).reduce<Record<string, AuthUser>>((acc, [key, value]) => {
      if (isAuthUser(value)) {
        acc[key] = value
      }

      return acc
    }, {})
  } catch {
    return {}
  }
}

const authStorage = {
  saveKnownUser(user: AuthUser): void {
    const knownUsers = parseKnownUsers()
    knownUsers[normalizeEmail(user.email)] = user
    localStorage.setItem(KNOWN_USERS_KEY, JSON.stringify(knownUsers))
  },

  findKnownUserByEmail(email: string): AuthUser | null {
    const knownUsers = parseKnownUsers()

    return knownUsers[normalizeEmail(email)] ?? null
  },

  saveSession(session: AuthSession): void {
    const { rememberMe, user } = session
    const storage = getStorage(rememberMe)

    this.saveKnownUser(user)
    localStorage.setItem(REMEMBER_ME_KEY, String(rememberMe))
    storage.setItem(USER_KEY, JSON.stringify(user))

    if (!rememberMe) {
      localStorage.removeItem(USER_KEY)
    } else {
      sessionStorage.removeItem(USER_KEY)
    }
  },

  loadSession(): AuthSession | null {
    const rememberMe = localStorage.getItem(REMEMBER_ME_KEY) === 'true'
    const storage = getStorage(rememberMe)
    const rawUser = storage.getItem(USER_KEY)

    if (!rawUser) {
      return null
    }

    try {
      const parsed: unknown = JSON.parse(rawUser)
      if (!isAuthUser(parsed)) {
        return null
      }
      return {
        user: parsed,
        rememberMe,
      }
    } catch {
      return null
    }
  },

  clearSession(): void {
    localStorage.removeItem(USER_KEY)
    sessionStorage.removeItem(USER_KEY)
    localStorage.removeItem(REMEMBER_ME_KEY)
  },
}

export { authStorage }
