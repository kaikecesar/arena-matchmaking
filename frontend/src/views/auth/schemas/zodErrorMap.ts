// Libraries
import { z } from 'zod'

// I18n
import { authStrings } from '@/i18n/pt-BR/auth'

/* *************************************************************************************************
**************************************** PT-BR ZOD ERROR MAP ***************************************
************************************************************************************************* */
const ptBrZodErrorMap = (issue: { code: string }): { message: string } | undefined => {
  if (issue.code === 'invalid_type') {
    return { message: authStrings.validation.fallbackField }
  }

  if (issue.code === 'too_small') {
    return { message: authStrings.validation.fallbackField }
  }

  if (issue.code === 'invalid_format') {
    return { message: authStrings.validation.fallbackEmail }
  }

  return undefined
}

const initAuthZodErrorMap = (): void => {
  z.config({ customError: ptBrZodErrorMap })
}

export { initAuthZodErrorMap }
