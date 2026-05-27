// Core
import type { JSX } from 'react';

// Types
import type { EyebrowProps } from '@/components/ui/Eyebrow/Eyebrow.types';

// Style
import { StyledEyebrow } from '@/components/ui/Eyebrow/Eyebrow.style';

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
