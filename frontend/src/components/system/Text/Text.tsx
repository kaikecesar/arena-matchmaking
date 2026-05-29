// Core
import { JSX } from 'react';

// Types
import { TextProps, TextVariant } from './Text.types';

// Component
import { StyledText } from './Text.style';

function Text({
  variant = TextVariant.body,
  children,
  testId,
}: TextProps): JSX.Element {
  return (
    <StyledText $variant={variant} data-testid={testId}>
      {children}
    </StyledText>
  );
}

export { Text };
