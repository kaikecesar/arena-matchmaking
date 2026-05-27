export interface VisualBoxStyledProps {
  $checked: boolean;
}

export interface CheckboxProps {
  checked: boolean;
  id?: string | undefined;
  label: string;
  name: string;
  onChange: (checked: boolean) => void;
}
