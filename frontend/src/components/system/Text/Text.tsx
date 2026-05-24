// Core
import type { FC, ReactElement } from 'react'

// Types
import { TextVariant, type TextProps } from '@/components/system/Text/Text.types'

// Styles
import { StyledText } from '@/components/system/Text/Text.style'

const Text: FC<TextProps> = ({ variant = TextVariant.body, children }): ReactElement => {
  return (
    <StyledText $variant={variant}>
      {children}
    </StyledText>
  )
}

export { Text }
