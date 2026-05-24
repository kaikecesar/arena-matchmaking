// Utils
import { initAuthZodErrorMap } from '@/plugins/schemas/zodErrorMap'

initAuthZodErrorMap()

export * from './login.schema'
export * from './register.schema'
export * from './forgotPassword.schema'
export * from './resetPassword.schema'
