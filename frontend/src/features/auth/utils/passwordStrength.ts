// Types
import { PasswordStrength } from './passwordStrength.types'
import type { PasswordStrengthResult } from './passwordStrength.types'

const checks = [
  { test: (v: string) => v.length >= 8, weight: 25 },
  { test: (v: string) => /[A-Z]/.test(v), weight: 20 },
  { test: (v: string) => /[a-z]/.test(v), weight: 20 },
  { test: (v: string) => /\d/.test(v), weight: 20 },
  { test: (v: string) => /[^A-Za-z0-9]/.test(v), weight: 15 },
] as const

const getPasswordStrength = (
  password: string,
  labels: Record<PasswordStrength, string>
): PasswordStrengthResult => {
  if (!password) {
    return { score: PasswordStrength.weak, label: labels[PasswordStrength.weak], percent: 0 }
  }

  const percent = checks.reduce(
    (sum, { test, weight }) =>
      test(password)
        ? sum + weight
        : sum,
    0
  )

  let score = PasswordStrength.weak
  if (percent >= 85) {
    score = PasswordStrength.strong
  } else if (percent >= 65) {
    score = PasswordStrength.good
  } else if (percent >= 40) {
    score = PasswordStrength.fair
  }

  return { score, label: labels[score], percent }
}

const isPasswordStrongEnough = (password: string): boolean => {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password)
  )
}

export { PasswordStrength, getPasswordStrength, isPasswordStrongEnough }
export type { PasswordStrengthResult }
