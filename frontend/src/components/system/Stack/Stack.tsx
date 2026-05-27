// Core
import { StyledStack } from './Stack.style';
import {
  StackAlign,
  StackDirection,
  StackGap,
  StackJustify,
  type StackProps,
} from './Stack.types';
import type { JSX } from 'react';

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
