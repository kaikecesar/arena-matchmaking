// Core
import { StyledIcon } from '@/components/icons/EyeOpenIcon/EyeOpenIcon.style';
import type { IconProps } from '@/components/icons/EyeOpenIcon/EyeOpenIcon.types';
import type { JSX } from 'react';

function EyeOpenIcon({
  size = 18,
  title = 'Show password',
}: IconProps): JSX.Element {
  return (
    <StyledIcon
      width={size}
      height={size}
      viewBox="0 0 18 18"
      aria-hidden={
        title
          ? undefined
          : 'true'
      }
      role={
        title
          ? 'img'
          : undefined
      }
    >
      {title
        ? (
            <title>{title}</title>
          )
        : null}
      <path
        d={[
          'M1.5 9C1.5 9 4 3.75 9 3.75C14 3.75 16.5 9 16.5 9',
          'C16.5 9 14 14.25 9 14.25C4 14.25 1.5 9 1.5 9Z',
        ].join('')}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="9" r="2.25" stroke="currentColor" strokeWidth="1.6" />
    </StyledIcon>
  );
}

export { EyeOpenIcon };
