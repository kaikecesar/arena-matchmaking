export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  name: string;
  id?: string;
}
