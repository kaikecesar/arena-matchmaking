// Core
import { StyledIcon } from '@/components/icons/ArrowRightIcon/ArrowRightIcon.style';
import type { IconProps } from '@/components/icons/ArrowRightIcon/ArrowRightIcon.types';
import type { JSX } from 'react';

function ArrowRightIcon({
  size = 18,
  title = 'Proceed',
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
        d="M3.75 9H14.25M14.25 9L9.75 4.5M14.25 9L9.75 13.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledIcon>
  );
}

export { ArrowRightIcon };

