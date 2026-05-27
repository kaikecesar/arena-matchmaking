// Core
import { JSX } from 'react';

// Component
import { StyledText } from './Text.style';
import { TextProps, TextVariant } from './Text.types';

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
