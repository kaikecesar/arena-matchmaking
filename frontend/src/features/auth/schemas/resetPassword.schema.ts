// Libraries
import { z } from 'zod'

// Utils
import { minLengthString, requiredString } from '@/features/auth/schemas/fields'
import { isPasswordStrongEnough } from '@/features/auth/utils/passwordStrength'

// Constants
import { authStrings } from '@/i18n/pt-BR/auth'

export const resetPasswordSchema = z
  .object({
    password: minLengthString(8, authStrings.reset.errorPassword).refine(
      isPasswordStrongEnough,
      { message: authStrings.reset.errorPasswordWeak }
    ),
    confirmPassword: requiredString(authStrings.reset.errorConfirmPassword),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: authStrings.reset.errorPasswordMismatch,
    path: ['confirmPassword'],
  })

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
