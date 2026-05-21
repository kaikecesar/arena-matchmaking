// Core
import React from 'react'

// Types
import type { TextProps } from '@/components/system/Text/Text.types'
import { TextVariant } from '@/components/system/Text/Text.types'

// Styles
import { StyledText } from '@/components/system/Text/Text.styles'

const Text: React.FC<TextProps> = ({ variant = TextVariant.body, children }) => {
  return (
    <StyledText $variant={variant}>
      {children}
    </StyledText>
  )
}

export { Text }
