// Core
import React from 'react'

// Types
import type { FieldErrorProps } from './FieldError.types'

// Styles
import { ErrorText } from './FieldError.styles'

const FieldError = ({ 
  message = null,
}: FieldErrorProps): React.ReactNode => {
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
