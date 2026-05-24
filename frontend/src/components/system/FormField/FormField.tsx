// Core
import type { FC, ReactNode } from 'react'

// Types
import type { FormFieldProps } from '@/components/system/FormField/FormField.types'

// Styles
import { FieldContainer, HelpText, Label } from '@/components/system/FormField/FormField.style'

const renderHelpText = (error?: string, hint?: string): ReactNode => {
  if (error) {
    return <HelpText $error>{error}</HelpText>
  }

  if (hint) {
    return <HelpText>{hint}</HelpText>
  }

  return null
}

const FormField: FC<FormFieldProps> = ({ label, htmlFor, error, hint, children }) => {
  return (
    <FieldContainer>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {renderHelpText(error, hint)}
    </FieldContainer>
  )
}

export { FormField }
