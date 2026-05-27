// Core
import { JSX } from 'react';

// Types
import {
  StackAlign,
  StackDirection,
  StackGap,
  StackJustify,
  StackProps,
} from './Stack.types';

// Component
import { StyledStack } from './Stack.style';

function Stack({
  direction = StackDirection.column,
  gap = StackGap.md,
  align = StackAlign.stretch,
  justify = StackJustify.flexStart,
  children,
}: StackProps): JSX.Element {
  return (
    <StyledStack
        $direction={direction}
        $gap={gap}
        $align={align}
        $justify={justify}
    >
      {children}
    </StyledStack>
  );
}

export { Stack };
