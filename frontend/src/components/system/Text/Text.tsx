// Core
import { StyledText } from '@/components/system/Text/Text.style';
import { TextVariant, type TextProps } from '@/components/system/Text/Text.types';
import type { JSX } from 'react';

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
