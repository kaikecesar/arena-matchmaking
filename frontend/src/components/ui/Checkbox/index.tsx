import {
  CheckboxWrapper,
  HiddenInput,
  VisualBox,
  CheckboxLabel,
} from './Checkbox.styles';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  name: string;
  id?: string;
}

export function Checkbox({
  checked,
  onChange,
  label,
  name,
  id,
}: CheckboxProps): React.ReactElement {
  const inputId = id ?? name;

  return (
    <CheckboxWrapper htmlFor={inputId}>
      <HiddenInput
        type="checkbox"
        id={inputId}
        name={name}
        checked={checked}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.checked)
        }
      />
      <VisualBox $checked={checked} aria-hidden="true">
        {checked && (
          <svg
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
            aria-hidden="true"
          >
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
  );
}
