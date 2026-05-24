// Core
import type { ChangeEvent, ReactElement } from 'react'

// Styles
import {
  CheckboxLabel,
  CheckboxWrapper,
  HiddenInput,
  VisualBox,
} from '@/components/ui/Checkbox/Checkbox.styles'

// Types
import type { CheckboxProps } from '@/components/ui/Checkbox/Checkbox.types'

const Checkbox = ({ checked, onChange, label, name, id }: CheckboxProps): ReactElement => {
  const inputId = id ?? name

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.checked)
  }

  return (
    <CheckboxWrapper htmlFor={inputId}>
      <HiddenInput
        type="checkbox"
        id={inputId}
        name={name}
        checked={checked}
        onChange={handleChange}
      />
      <VisualBox $checked={checked} aria-hidden="true">
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </VisualBox>
      <CheckboxLabel>{label}</CheckboxLabel>
    </CheckboxWrapper>
  )
}

export { Checkbox }
