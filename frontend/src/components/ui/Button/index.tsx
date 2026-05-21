import type { ButtonProps } from './Button.types';
import { StyledButton, SpinnerSvg } from './Button.styles';

export type { ButtonProps };

function Spinner(): React.ReactElement {
  return (
    <SpinnerSvg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.3"
      />
      <path
        d="M8 2a6 6 0 0 1 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </SpinnerSvg>
  );
}

export function Button({
  label,
  onClick,
  type = 'button',
  variant = 'blood',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  trailingIcon,
  leadingIcon,
  'aria-label': ariaLabel,
}: ButtonProps): React.ReactElement {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $loading={loading}
      aria-label={loading ? undefined : ariaLabel}
      aria-busy={loading}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {leadingIcon}
          {label}
          {trailingIcon}
        </>
      )}
    </StyledButton>
  );
}
