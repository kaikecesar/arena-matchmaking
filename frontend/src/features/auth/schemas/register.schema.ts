// Libraries
import { z } from 'zod'

// Types
import type { RegisterRole } from '@/features/auth/types'

// Utils
import { isPasswordStrongEnough } from '@/features/auth/utils/passwordStrength'
import { isValidCPF } from '@/features/auth/utils/validators'

// Constants
import { authStrings } from '@/i18n/pt-BR/auth'

export const registerProfileSchema = z.object({
  name: z.string().min(2, authStrings.register.errorName),
  email: z.string().min(1, authStrings.register.errorEmail).email(authStrings.register.errorEmail),
  document: z
    .string()
    .min(1, authStrings.register.errorDocument)
    .refine((val) => isValidCPF(val.replace(/\D/g, '')), {
      message: authStrings.register.errorDocument,
    }),
})

export const registerPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, authStrings.register.errorPassword)
      .refine(isPasswordStrongEnough, { message: authStrings.register.errorPasswordWeak }),
    confirmPassword: z.string().min(1, authStrings.register.errorConfirmPassword),
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
