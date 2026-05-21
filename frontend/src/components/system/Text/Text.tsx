import React from 'react'

import type { TextProps } from './Text.types'
import { TextVariant } from './Text.types'
import { StyledText } from './Text.styles'

const Text: React.FC<TextProps> = ({ variant = TextVariant.body, children }) => {
  return (
    <StyledText $variant={variant}>
      {children}
    </StyledText>
  )
}

export { Text }
