// Core
import { ChangeEvent, JSX } from 'react';

// Types
import { CheckboxProps } from './Checkbox.types';

// Component
import {
  CheckboxLabel,
  CheckboxWrapper,
  HiddenInput,
  VisualBox,
} from './Checkbox.style';

function Checkbox({
  checked,
  id,
  label,
  name,
  onChange,
}: CheckboxProps): JSX.Element {
  const inputId: string = id ?? name;

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.checked);
  };

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
              stroke="#d22638"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </VisualBox>
      <CheckboxLabel>{label}</CheckboxLabel>
    </CheckboxWrapper>
  );
}

export { Checkbox };

