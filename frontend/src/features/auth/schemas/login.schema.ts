import { z } from 'zod'
import { authStrings } from '@/i18n/pt-BR/auth'
import { isValidCPF, isValidEmail } from '@/features/auth/utils/validators'

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, authStrings.errorEmptyIdentifier)
    .refine(
      (val) => {
        const looksLikeCPF = /^\d+$/.test(val.replace(/[.-]/g, ''))
        return val.includes('@') ? isValidEmail(val) : isValidCPF(val) || looksLikeCPF
      },
      { message: authStrings.errorInvalidIdentifier }
    ),
  password: z.string().min(1, authStrings.errorEmptyPassword),
  keepSession: z.boolean(),
})

export type LoginFormValues = z.infer<typeof loginSchema>
