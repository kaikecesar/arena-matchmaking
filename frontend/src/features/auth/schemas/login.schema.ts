// Libraries
import { z } from 'zod'

// Utils
import { requiredString } from '@/features/auth/schemas/fields'
import { isValidCPF, isValidEmail } from '@/features/auth/utils/validators'

// Constants
import { authStrings } from '@/i18n/pt-BR/auth'

export const loginSchema = z.object({
  identifier: requiredString(authStrings.errorEmptyIdentifier).refine(
    (val: string) => {
      const looksLikeCPF = /^\d+$/.test(val.replace(/[.-]/g, ''))
      return val.includes('@')
        ? isValidEmail(val)
        : isValidCPF(val) || looksLikeCPF
    },
    { message: authStrings.errorInvalidIdentifier }
  ),
  password: requiredString(authStrings.errorEmptyPassword),
  keepSession: z.boolean(),
})

export type LoginFormValues = z.infer<typeof loginSchema>
