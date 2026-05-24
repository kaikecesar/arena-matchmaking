// Types
import type { AuthTokens } from '@/types/auth'

const buildAuthTokens = (accessToken: string, refreshToken?: string): AuthTokens =>
  refreshToken !== undefined
    ? { accessToken, refreshToken }
    : { accessToken }

export { buildAuthTokens }
