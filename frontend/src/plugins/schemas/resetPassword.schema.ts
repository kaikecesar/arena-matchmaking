// Libraries
import { z } from 'zod'

// I18n
import { authStrings } from '@/i18n/pt-BR/auth'

// Schemas
import { minLengthString, requiredString } from '@/plugins/schemas/fields'

// Utils
import { isPasswordStrongEnough } from '@/plugins/utils/passwordStrength'

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
