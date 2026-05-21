// Utils
import { isAuthApiError } from '@/utils/typeGuards'

// Types
import { AuthServiceError } from '@/features/auth/types'

const getAuthErrorMessage = (error: unknown): string => {
  if (error instanceof AuthServiceError) {
    return error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  if (isAuthApiError(error)) {
    return error.message
  }
  return 'Erro desconhecido'
}

export { getAuthErrorMessage }
