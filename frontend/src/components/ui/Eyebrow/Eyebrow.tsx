// Core
import { StyledEyebrow } from '@/components/ui/Eyebrow/Eyebrow.style';
import type { EyebrowProps } from '@/components/ui/Eyebrow/Eyebrow.types';
import type { JSX } from 'react';

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
