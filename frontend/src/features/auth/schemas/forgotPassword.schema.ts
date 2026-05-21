// Libraries
import { z } from 'zod'

// Utils
import { isValidCPF, isValidEmail } from '@/features/auth/utils/validators'

// Constants
import { authStrings } from '@/i18n/pt-BR/auth'

export const forgotPasswordSchema = z.object({
  identifier: z
    .string()
    .min(1, authStrings.forgot.errorEmptyIdentifier)
    .refine(
      (val) => {
        const looksLikeCPF = /^\d+$/.test(val.replace(/[.-]/g, ''))
        return val.includes('@')
          ? isValidEmail(val)
          : isValidCPF(val) || looksLikeCPF
      },
      { message: authStrings.forgot.errorInvalidIdentifier }
    ),
})

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
