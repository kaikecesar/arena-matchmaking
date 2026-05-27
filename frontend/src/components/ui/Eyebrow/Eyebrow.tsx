// Core
import { JSX } from 'react';

// Types
import { EyebrowProps } from './Eyebrow.types';

// Component
import { StyledEyebrow } from './Eyebrow.style';

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
