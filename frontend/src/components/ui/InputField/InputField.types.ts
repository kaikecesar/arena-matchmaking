export enum InputFieldType {
  Text = 'text',
  Password = 'password',
  Email = 'email',
}

export interface InputFieldProps {
  label: string
  name: string
  type?: InputFieldType
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  error?: string
  hint?: string
  trailingIcon?: React.ReactNode
  onTrailingIconClick?: () => void
  mono?: boolean
  disabled?: boolean
  autoComplete?: string
  placeholder?: string
  id?: string
}
