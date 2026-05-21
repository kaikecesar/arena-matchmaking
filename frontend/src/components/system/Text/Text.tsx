import React from 'react'

import type { TextProps, TextVariant } from './Text.types'
import { StyledText } from './Text.styles'

const Text: React.FC<TextProps> = ({ variant = TextVariant.Body, children }) => {
  return (
    <StyledText $variant={variant}>
      {children}
    </StyledText>
  )
}

export { Text }
