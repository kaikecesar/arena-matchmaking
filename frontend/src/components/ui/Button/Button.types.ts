export type ButtonVariant = 'blood' | 'bone' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  label: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset'
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  trailingIcon?: React.ReactNode
  leadingIcon?: React.ReactNode
  'aria-label'?: string
}
