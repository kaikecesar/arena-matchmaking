import { z } from 'zod'
import { authStrings } from '@/i18n/pt-BR/auth'

// ─── CPF validation (pure, typed) ────────────────────────────────────────────

function isValidCPF(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, '')
  if (digits.length !== 11) return false
  // Reject sequences of identical digits (e.g. 000.000.000-00)
  if (/^(\d)\1+$/.test(digits)) return false

  const calcVerifier = (slice: string, startFactor: number): number => {
    let sum = 0
    let factor = startFactor
    for (const d of slice) {
      sum += parseInt(d, 10) * factor
      factor--
    }
    const rem = sum % 11
    return rem < 2 ? 0 : 11 - rem
  }

  const v1 = calcVerifier(digits.slice(0, 9), 10)
  const v2 = calcVerifier(digits.slice(0, 10), 11)

  return (
    parseInt(digits[9]!, 10) === v1 && // digits[9] always exists when length === 11
    parseInt(digits[10]!, 10) === v2 // digits[10] always exists when length === 11
  )
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

// ─── Zod schema ───────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, authStrings.errorEmptyIdentifier)
    .refine(
      (val) => {
        const looksLikeCPF = /^\d+$/.test(val.replace(/[.-]/g, ''))
        return val.includes('@') ? isValidEmail(val) : isValidCPF(val) || looksLikeCPF
      },
      { message: authStrings.errorInvalidCredentials }
    ),
  password: z.string().min(1, authStrings.errorEmptyPassword),
  keepSession: z.boolean(),
})

export type LoginFormValues = z.infer<typeof loginSchema>

// ─── API contracts ─────────────────────────────────────────────────────────────

// const objects used instead of enum — required by erasableSyntaxOnly: true
export const UserRole = {
  ORGANIZER: 'ORGANIZER',
  ATHLETE: 'ATHLETE',
  COACH: 'COACH',
} as const

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

export const LoginErrorCode = {
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  RATE_LIMITED: 'RATE_LIMITED',
  SERVER_ERROR: 'SERVER_ERROR',
} as const

export type LoginErrorCode = (typeof LoginErrorCode)[keyof typeof LoginErrorCode]

export type LoginApiResponse = {
  accessToken: string
  refreshToken?: string
  user: {
    id: string
    role: UserRole
    name: string
  }
}

export type LoginApiError = {
  error: LoginErrorCode
  message: string
  retryAfter?: number
}

// ─── Role → redirect map ──────────────────────────────────────────────────────

export const ROLE_REDIRECT: Record<UserRole, string> = {
  ORGANIZER: '/dashboard/events',
  ATHLETE: '/profile',
  COACH: '/dashboard/athletes',
}
