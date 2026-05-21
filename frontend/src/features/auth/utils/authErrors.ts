import { AuthErrorCode, AuthServiceError } from '@/features/auth/types'
import { authStrings } from '@/i18n/pt-BR/auth'

export const getAuthErrorMessage = (error: unknown): string => {
  if (error instanceof AuthServiceError) {
    switch (error.code) {
      case AuthErrorCode.invalidCredentials:
        return authStrings.errorInvalidCredentials
      case AuthErrorCode.rateLimited:
        return authStrings.errorRateLimited
      case AuthErrorCode.networkError:
        return authStrings.errorNetwork
      case AuthErrorCode.sessionExpired:
        return authStrings.errorSessionExpired
      case AuthErrorCode.emailInUse:
        return authStrings.register.errorEmailInUse
      case AuthErrorCode.invalidToken:
        return authStrings.reset.errorInvalidToken
      case AuthErrorCode.weakPassword:
        return authStrings.reset.errorPasswordWeak
      default:
        return authStrings.errorGeneric
    }
  }

  return authStrings.errorGeneric
}
