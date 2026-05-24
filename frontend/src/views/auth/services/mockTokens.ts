// Types
import { UserRole } from '@/views/auth/types'
import type { AuthUser, UserRoleType } from '@/views/auth/types'
import type { MockTokenPayload, MockTokens } from './mockTokens.types'

const encodePayload = (payload: MockTokenPayload): string => {
  const json = JSON.stringify(payload)
  return `mock.${btoa(json)}.${Date.now()}`
}

const createMockTokens = (user: AuthUser): MockTokens => ({
  accessToken: encodePayload({ sub: user.id, role: user.role, type: 'access' }),
  refreshToken: encodePayload({ sub: user.id, type: 'refresh' }),
})

const inferRole = (identifier: string): UserRoleType => {
  const lower = identifier.toLowerCase()
  if (lower.includes('organizer') || lower.includes('organizador')) {
    return UserRole.organizer
  }
  if (lower.includes('coach') || lower.includes('treinador')) {
    return UserRole.coach
  }
  if (lower.includes('athlete') || lower.includes('atleta')) {
    return UserRole.athlete
  }
  return UserRole.organizer
}

const buildMockUser = (
  identifier: string,
  name?: string | undefined,
  role?: UserRoleType | undefined
): AuthUser => {
  const email = identifier.includes('@')
    ? identifier
    : `${identifier}@arena.mock`
  const resolvedRole = role ?? inferRole(identifier)

  return {
    id: `usr_${resolvedRole.toLowerCase()}_${Date.now()}`,
    name: name ?? 'Operador Arena',
    email,
    role: resolvedRole,
  }
}

export { createMockTokens, buildMockUser }
