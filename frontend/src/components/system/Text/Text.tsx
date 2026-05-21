import React from 'react';

import type { TextProps } from './Text.types';
import { StyledText } from './Text.styles';

const Text: React.FC<TextProps> = ({ as = 'span', variant = 'body', children }) => {
  return (
    <StyledText as={as} $variant={variant}>
      {children}
    </StyledText>
  );
};

export { Text };
