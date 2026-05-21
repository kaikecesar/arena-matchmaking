export enum ButtonVariant {
  blood = 'blood',
  bone = 'bone',
  ghost = 'ghost',
}

export enum ButtonSize {
  small = 'sm',
  medium = 'md',
  large = 'lg',
}

export enum ButtonType {
  button = 'button',
  submit = 'submit',
  reset = 'reset',
}

export interface ButtonProps {
  label: string
  onClick?: ((e: React.MouseEvent<HTMLButtonElement>) => void) | undefined
  type?: ButtonType | undefined
  variant?: ButtonVariant | undefined
  size?: ButtonSize | undefined
  loading?: boolean | undefined
  disabled?: boolean | undefined
  fullWidth?: boolean | undefined
  trailingIcon?: React.ReactNode | undefined
  leadingIcon?: React.ReactNode | undefined
  'aria-label'?: string | undefined
}
