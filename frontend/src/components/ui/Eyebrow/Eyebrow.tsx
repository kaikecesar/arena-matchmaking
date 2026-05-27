// Core
import { JSX } from 'react';

// Component
import { StyledEyebrow } from './Eyebrow.style';
import { EyebrowProps } from './Eyebrow.types';

function Eyebrow({
  children,
  $color,
}: EyebrowProps): JSX.Element {
  return (
    <StyledEyebrow
      {...($color !== undefined
        ? { $color }
        : {})}
    >
      {children}
    </StyledEyebrow>
  );
}

export { Eyebrow };
