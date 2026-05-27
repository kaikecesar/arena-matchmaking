// Core
import { ChangeEvent, FocusEvent, ReactNode } from 'react';

export enum InputFieldType {
  text = 'text',
  password = 'password',
  email = 'email',
}

export interface InputWrapperStyledProps {
  $disabled: boolean;
  $hasError: boolean;
}

export interface StyledInputStyledProps {
  $mono: boolean;
}

export interface InputFieldProps {
  autoComplete?: string | undefined;
  disabled?: boolean | undefined;
  error?: string | undefined;
  hint?: string | undefined;
  id?: string | undefined;
  label: string;
  mono?: boolean | undefined;
  name: string;
  onBlur?: ((e: FocusEvent<HTMLInputElement>) => void) | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onTrailingIconClick?: (() => void) | undefined;
  placeholder?: string | undefined;
  trailingIcon?: ReactNode | undefined;
  trailingIconAriaLabel?: string | undefined;
  type?: InputFieldType | undefined;
  value: string;
}
