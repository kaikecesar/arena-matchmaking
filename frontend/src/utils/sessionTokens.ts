// Types
import type { AuthTokens } from '@/features/auth/types'

const buildAuthTokens = (accessToken: string, refreshToken?: string): AuthTokens =>
  refreshToken !== undefined
    ? { accessToken, refreshToken }
    : { accessToken }

export { buildAuthTokens }
