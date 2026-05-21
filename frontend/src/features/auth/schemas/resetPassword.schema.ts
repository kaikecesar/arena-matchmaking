// Libraries
import { z } from 'zod'

// Utils
import { isPasswordStrongEnough } from '@/features/auth/utils/passwordStrength'

// Constants
import { authStrings } from '@/i18n/pt-BR/auth'

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, authStrings.reset.errorPassword)
      .refine(isPasswordStrongEnough, { message: authStrings.reset.errorPasswordWeak }),
    confirmPassword: z.string().min(1, authStrings.reset.errorConfirmPassword),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: authStrings.reset.errorPasswordMismatch,
    path: ['confirmPassword'],
  })

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
