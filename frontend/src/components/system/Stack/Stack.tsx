// Core
import { JSX } from 'react';

// Component
import { StyledStack } from './Stack.style';
import {
  StackAlign,
  StackDirection,
  StackGap,
  StackJustify,
  StackProps,
} from './Stack.types';

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
