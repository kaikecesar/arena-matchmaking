import React from 'react'

import type { FieldErrorProps } from './FieldError.types'
import { ErrorText } from './FieldError.styles'

const FieldError: React.FC<FieldErrorProps> = ({ message }) => {
  if (!message) {
    return null
  }

  return <ErrorText role="alert">{message}</ErrorText>
}

export { FieldError }
