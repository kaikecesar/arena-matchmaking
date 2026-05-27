// Core
import type { JSX } from 'react';

// Types
import type { IconProps } from '@/components/icons/EyeOffIcon/EyeOffIcon.types';

// Style
import { StyledIcon } from '@/components/icons/EyeOffIcon/EyeOffIcon.style';

function EyeOffIcon({
  size = 18,
  title = 'Hide password',
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
        d="M2.25 2.25L15.75 15.75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d={[
          'M7.5 7.61A2.25 2.25 0 0 0 10.39 10.5M5.01 5.12C3.3 6.22',
          '2.25 9 2.25 9s2.25 5.25 6.75 5.25c1.32 0 2.47-.35 3.44-.9',
          'M12.47 12.58C13.92 11.5 15.75 9 15.75 9S13.5 3.75 9 3.75',
          'c-.73 0-1.42.1-2.06.28',
        ].join('')}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledIcon>
  );
}

export { EyeOffIcon };
