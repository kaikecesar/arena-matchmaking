// I18n
import { authStrings } from '@/i18n/pt-BR/auth'

// Utils
import { isAuthApiError } from '@/utils/typeGuards'

// Types
import { AuthErrorCode, AuthServiceError } from '@/views/auth/types'

/* *************************************************************************************************
*************************************** ERROR CODE MAP *********************************************
************************************************************************************************* */
const authErrorMessages: Record<AuthErrorCode, string> = {
  [AuthErrorCode.invalidCredentials]: authStrings.errorInvalidCredentials,
  [AuthErrorCode.rateLimited]: authStrings.errorRateLimited,
  [AuthErrorCode.serverError]: authStrings.errorGeneric,
  [AuthErrorCode.networkError]: authStrings.errorNetwork,
  [AuthErrorCode.sessionExpired]: authStrings.errorSessionExpired,
  [AuthErrorCode.emailInUse]: authStrings.register.errorEmailInUse,
  [AuthErrorCode.invalidToken]: authStrings.reset.errorInvalidToken,
  [AuthErrorCode.weakPassword]: authStrings.register.errorPasswordWeak,
}

const getAuthErrorMessage = (error: unknown): string => {
  if (error instanceof AuthServiceError) {
    return authErrorMessages[error.code] ?? authStrings.errorGeneric
  }

  if (error instanceof Error && error.message.length > 0) {
    const cause = error.cause
    if (cause instanceof AuthServiceError) {
      return authErrorMessages[cause.code] ?? authStrings.errorGeneric
    }
    return authStrings.errorGeneric
  }

  if (isAuthApiError(error)) {
    const code = error.error
    if (code in authErrorMessages) {
      return authErrorMessages[code as AuthErrorCode]
    }
    return authStrings.errorGeneric
  }

  return authStrings.errorGeneric
}

export { getAuthErrorMessage }
