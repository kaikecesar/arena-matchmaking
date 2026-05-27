// Libraries
import { z } from 'zod'

const fallbackField = 'Verifique este campo'
const fallbackEmail = 'Digite um e-mail válido'

const ptBrZodErrorMap = (issue: { code: string }): { message: string } | undefined => {
  if (issue.code === 'invalid_type' || issue.code === 'too_small') {
    return { message: fallbackField }
  }

  if (issue.code === 'invalid_format') {
    return { message: fallbackEmail }
  }

  return undefined
}

const initAuthZodErrorMap = (): void => {
  z.config({ customError: ptBrZodErrorMap })
}

export { initAuthZodErrorMap }
