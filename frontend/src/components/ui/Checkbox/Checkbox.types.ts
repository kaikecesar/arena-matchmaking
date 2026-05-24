export interface VisualBoxStyledProps {
  $checked: boolean
}

export interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  name: string
  id?: string | undefined
}
