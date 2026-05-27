// Core
import { SpinnerSvg, StyledButton } from './Button.style';
import {
  ButtonSize,
  ButtonType,
  ButtonVariant,
  type ButtonProps,
} from './Button.types';
import type { JSX } from 'react';

function Spinner(): JSX.Element {
  return (
    <SpinnerSvg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
      <path d="M8 2a6 6 0 0 1 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </SpinnerSvg>
  );
}

function Button({
  label,
  onClick,
  type = ButtonType.button,
  variant = ButtonVariant.blood,
  size = ButtonSize.medium,
  loading = false,
  disabled = false,
  fullWidth = false,
  trailingIcon,
  leadingIcon,
  'aria-label': ariaLabel,
}: ButtonProps): JSX.Element {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $loading={loading}
      aria-label={
        loading
          ? undefined
          : ariaLabel
      }
      aria-busy={loading}
    >
      {loading
        ? (
            <Spinner />
          )
        : (
            <>
              {leadingIcon}
              {label}
              {trailingIcon}
            </>
          )}
    </StyledButton>
  );
}

export { Button };
export { ButtonSize, ButtonType, ButtonVariant };
