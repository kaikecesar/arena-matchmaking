// Utils
import { initAuthZodErrorMap } from '@/features/auth/schemas/zodErrorMap'

initAuthZodErrorMap()

export { loginSchema, type LoginFormValues } from './login.schema'
export {
  registerProfileSchema,
  registerPasswordSchema,
  type RegisterProfileValues,
  type RegisterPasswordValues,
  type RegisterFormState,
} from './register.schema'
export { forgotPasswordSchema, type ForgotPasswordFormValues } from './forgotPassword.schema'
export { resetPasswordSchema, type ResetPasswordFormValues } from './resetPassword.schema'
