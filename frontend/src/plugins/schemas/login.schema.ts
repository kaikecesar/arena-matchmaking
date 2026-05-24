// Libraries
import { z } from 'zod'

// I18n
import { authStrings } from '@/i18n/pt-BR/auth'

// Schemas
import { requiredString } from '@/plugins/schemas/fields'

// Utils
import { isValidCPF, isValidEmail } from '@/plugins/utils/validators'

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
