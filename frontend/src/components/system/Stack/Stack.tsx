// Core
import React from 'react'

// Components
import type { StackProps } from './Stack.types.ts'
import { StackAlign, StackDirection, StackGap, StackJustify } from './Stack.types.ts'
import { StyledStack } from './Stack.styles.ts'

const Stack: React.FC<StackProps> = ({
  direction = StackDirection.Column,
  gap = StackGap.MD,
  align = StackAlign.Stretch,
  justify = StackJustify.FlexStart,
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

export { Stack };
