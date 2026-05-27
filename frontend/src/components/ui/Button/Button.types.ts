// Core
import { MouseEvent, ReactNode } from 'react';

export enum ButtonVariant {
  blood = 'blood',
  bone = 'bone',
  ghost = 'ghost',
}

export enum ButtonSize {
  large = 'lg',
  medium = 'md',
  small = 'sm',
}

export enum ButtonType {
  button = 'button',
  submit = 'submit',
  reset = 'reset',
}

export interface StyledButtonProps {
  $fullWidth: boolean;
  $loading: boolean;
  $size: ButtonSize;
  $variant: ButtonVariant;
}

export interface ButtonProps {
  'aria-label'?: string | undefined;
  disabled?: boolean | undefined;
  fullWidth?: boolean | undefined;
  label: string;
  leadingIcon?: ReactNode | undefined;
  loading?: boolean | undefined;
  onClick?: ((e: MouseEvent<HTMLButtonElement>) => void) | undefined;
  size?: ButtonSize | undefined;
  testId?: string | undefined;
  trailingIcon?: ReactNode | undefined;
  type?: ButtonType | undefined;
  variant?: ButtonVariant | undefined;
}
