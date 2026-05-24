// Core
import type { ChangeEvent, FocusEvent, ReactNode } from 'react'

export enum InputFieldType {
  text = 'text',
  password = 'password',
  email = 'email',
}

export interface InputWrapperStyledProps {
  $hasError: boolean
  $disabled: boolean
}

export interface StyledInputStyledProps {
  $mono: boolean
}

export interface InputFieldProps {
  label: string
  name: string
  type?: InputFieldType | undefined
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onBlur?: ((e: FocusEvent<HTMLInputElement>) => void) | undefined
  error?: string | undefined
  hint?: string | undefined
  trailingIcon?: ReactNode | undefined
  onTrailingIconClick?: (() => void) | undefined
  trailingIconAriaLabel?: string | undefined
  mono?: boolean | undefined
  disabled?: boolean | undefined
  autoComplete?: string | undefined
  placeholder?: string | undefined
  id?: string | undefined
}
