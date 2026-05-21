// Core
import React from 'react'

// Types
import type { StackProps } from './Stack.types.ts'
import { StackAlign, StackDirection, StackGap, StackJustify } from './Stack.types.ts'

// Styles
import { StyledStack } from './Stack.styles.ts'

const Stack: React.FC<StackProps> = ({
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
