// Libraries
import { z } from 'zod'

// I18n
import { authStrings } from '@/i18n/pt-BR/auth'

// Schemas
import { requiredString } from '@/features/auth/schemas/fields'

// Utils
import { isValidCPF, isValidEmail } from '@/features/auth/utils/validators'

export const forgotPasswordSchema = z.object({
  identifier: requiredString(authStrings.forgot.errorEmptyIdentifier).refine(
    (val: string) => {
      const looksLikeCPF = /^\d+$/.test(val.replace(/[.-]/g, ''))
      return val.includes('@')
        ? isValidEmail(val)
        : isValidCPF(val) || looksLikeCPF
    },
    { message: authStrings.forgot.errorInvalidIdentifier }
  ),
})

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
