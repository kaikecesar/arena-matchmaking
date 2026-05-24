// Core
import type { JSX } from 'react'

// Types
import type { FieldErrorProps } from './FieldError.types'

// Style
import { ErrorText } from './FieldError.style'

function FieldError({ message = null }: FieldErrorProps): JSX.Element | null {
  if (!message) {
    return null
  }

  return (
    <ErrorText role="alert">
      {message}
    </ErrorText>
  )
}

export { FieldError }
