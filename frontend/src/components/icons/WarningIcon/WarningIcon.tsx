// Core
import { JSX } from 'react';

// Component
import { StyledIcon } from './WarningIcon.style';
import { IconProps } from './WarningIcon.types';

function WarningIcon({
  size = 16,
  title = 'Warning',
}: IconProps): JSX.Element {
  return (
    <StyledIcon
      width={size}
      height={size}
      viewBox="0 0 16 16"
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
        d="M8 1.5L14.5 13H1.5L8 1.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="8"
        y1="6"
        x2="8"
        y2="9.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="8" cy="11.5" r="0.75" fill="currentColor" />
    </StyledIcon>
  );
}

export { WarningIcon };
