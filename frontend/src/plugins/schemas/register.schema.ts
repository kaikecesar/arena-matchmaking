// Libraries
import { z } from 'zod'

// Types
import type { RegisterRole } from '@/types/auth'

// I18n
import { authStrings } from '@/i18n/pt-BR/auth'

// Schemas
import {
  emailString,
  minLengthString,
  requiredString,
} from '@/plugins/schemas/fields'

// Utils
import { isPasswordStrongEnough } from '@/plugins/utils/passwordStrength'
import { isValidCPF } from '@/plugins/utils/validators'

export const registerProfileSchema = z.object({
  name: minLengthString(2, authStrings.register.errorName),
  email: emailString(
    authStrings.register.errorEmail,
    authStrings.register.errorEmailInvalid
  ),
  document: requiredString(authStrings.register.errorDocument).refine(
    (val: string) => isValidCPF(val.replace(/\D/g, '')),
    { message: authStrings.register.errorDocument }
  ),
})

export const registerPasswordSchema = z
  .object({
    password: minLengthString(8, authStrings.register.errorPassword).refine(
      isPasswordStrongEnough,
      { message: authStrings.register.errorPasswordWeak }
    ),
    confirmPassword: requiredString(authStrings.register.errorConfirmPassword),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: authStrings.register.errorPasswordMismatch,
    path: ['confirmPassword'],
  })

export type RegisterProfileValues = z.infer<typeof registerProfileSchema>
export type RegisterPasswordValues = z.infer<typeof registerPasswordSchema>

export type RegisterFormState = RegisterProfileValues &
  RegisterPasswordValues & {
    role: RegisterRole | null
  }
