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
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: ButtonType
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  trailingIcon?: React.ReactNode
  leadingIcon?: React.ReactNode
  'aria-label'?: string
}
