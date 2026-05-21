import React from 'react';
import type { EyebrowProps } from './Eyebrow.types';
import { StyledEyebrow } from './Eyebrow.styles';

const Eyebrow = ({ children, $color, as }: EyebrowProps): React.ReactElement => {
  return (
    <StyledEyebrow as={as} $color={$color}>
      {children}
    </StyledEyebrow>
  );
};

export { Eyebrow };
