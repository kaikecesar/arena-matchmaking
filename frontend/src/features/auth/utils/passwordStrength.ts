export type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong'

export type PasswordStrengthResult = {
  score: PasswordStrength
  label: string
  percent: number
}

const checks = [
  { test: (v: string) => v.length >= 8, weight: 25 },
  { test: (v: string) => /[A-Z]/.test(v), weight: 20 },
  { test: (v: string) => /[a-z]/.test(v), weight: 20 },
  { test: (v: string) => /\d/.test(v), weight: 20 },
  { test: (v: string) => /[^A-Za-z0-9]/.test(v), weight: 15 },
] as const

export const getPasswordStrength = (
  password: string,
  labels: Record<PasswordStrength, string>
): PasswordStrengthResult => {
  if (!password) {
    return { score: 'weak', label: labels.weak, percent: 0 }
  }

  const percent = checks.reduce((sum, { test, weight }) => (test(password) ? sum + weight : sum), 0)

  let score: PasswordStrength = 'weak'
  if (percent >= 85) score = 'strong'
  else if (percent >= 65) score = 'good'
  else if (percent >= 40) score = 'fair'

  return { score, label: labels[score], percent }
}

export const isPasswordStrongEnough = (password: string): boolean => {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password)
  )
}
