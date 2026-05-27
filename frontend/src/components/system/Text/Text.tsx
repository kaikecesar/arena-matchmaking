// Core
import { JSX } from 'react';

// Types
import { TextProps, TextVariant } from './Text.types';

// Component
import { StyledText } from './Text.style';

function Text({
  variant = TextVariant.body,
  children,
}: TextProps): JSX.Element {
  return (
    <StyledText $variant={variant}>
      {children}
    </StyledText>
  );
}

export { Text };
