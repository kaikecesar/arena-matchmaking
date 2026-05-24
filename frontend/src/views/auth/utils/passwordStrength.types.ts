export enum PasswordStrength {
  weak = 'weak',
  fair = 'fair',
  good = 'good',
  strong = 'strong',
}

export type PasswordStrengthResult = {
  score: PasswordStrength
  label: string
  percent: number
}
