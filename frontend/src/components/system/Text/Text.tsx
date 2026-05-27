// Core
import type { JSX } from 'react'

// Types
import { TextVariant, type TextProps } from '@/components/system/Text/Text.types'

// Style
import { StyledText } from '@/components/system/Text/Text.style'

function Text({ variant = TextVariant.body, children }: TextProps): JSX.Element {
  return (
    <StyledText $variant={variant}>
      {children}
    </StyledText>
  )
}

export { Text }
