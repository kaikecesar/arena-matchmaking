// Core
import React from 'react'

// Components
import type { StackProps } from './Stack.types'
import { StyledStack } from './Stack.styles'

const Stack: React.FC<StackProps> = ({
  as = 'div',
  direction = 'column',
  gap = 'md',
  align = 'stretch',
  justify = 'flex-start',
  children,
}) => {
  return (
    <StyledStack as={as} $direction={direction} $gap={gap} $align={align} $justify={justify}>
      {children}
    </StyledStack>
  )
}

export { Stack }
