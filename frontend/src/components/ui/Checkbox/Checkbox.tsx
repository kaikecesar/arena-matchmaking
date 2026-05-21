// Core
import React from 'react'

// Types
import type { CheckboxProps } from '@/components/ui/Checkbox/Checkbox.types'

// Styles
import {
  CheckboxLabel,
  CheckboxWrapper,
  HiddenInput,
  VisualBox,
} from '@/components/ui/Checkbox/Checkbox.styles'

const Checkbox = ({ checked, onChange, label, name, id }: CheckboxProps): React.ReactElement => {
  const inputId = id ?? name

  return (
    <CheckboxWrapper htmlFor={inputId}>
      <HiddenInput
        type="checkbox"
        id={inputId}
        name={name}
        checked={checked}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)}
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
