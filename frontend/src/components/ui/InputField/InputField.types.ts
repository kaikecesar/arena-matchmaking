export enum InputFieldType {
  text = 'text',
  password = 'password',
  email = 'email',
}

export interface InputFieldProps {
  label: string
  name: string
  type?: InputFieldType | undefined
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: ((e: React.FocusEvent<HTMLInputElement>) => void) | undefined
  error?: string | undefined
  hint?: string | undefined
  trailingIcon?: React.ReactNode | undefined
  onTrailingIconClick?: (() => void) | undefined
  trailingIconAriaLabel?: string | undefined
  mono?: boolean | undefined
  disabled?: boolean | undefined
  autoComplete?: string | undefined
  placeholder?: string | undefined
  id?: string | undefined
}
