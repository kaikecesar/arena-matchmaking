export enum ButtonVariant {
  Blood = 'blood',
  Bone = 'bone',
  Ghost = 'ghost',
}

export enum ButtonSize {
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
}

export enum ButtonType {
  Button = 'button',
  Submit = 'submit',
  Reset = 'reset',
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
