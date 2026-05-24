// Core
import type { FC } from 'react'

// Styles
import { StyledStack } from './Stack.styles'

// Types
import { StackAlign, StackDirection, StackGap, StackJustify, type StackProps } from './Stack.types'

const Stack: FC<StackProps> = ({
  direction = StackDirection.column,
  gap = StackGap.md,
  align = StackAlign.stretch,
  justify = StackJustify.flexStart,
  children,
}) => {
  return (
    <StyledStack
        $direction={direction}
        $gap={gap}
        $align={align}
        $justify={justify}
    >
      {children}
    </StyledStack>
  )
}

export { Stack }
