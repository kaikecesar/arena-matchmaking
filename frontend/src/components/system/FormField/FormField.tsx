// Core
import React from 'react'

// Types
import type { FormFieldProps } from '@/components/system/FormField/FormField.types'

// Styles
import { FieldContainer, HelpText, Label } from '@/components/system/FormField/FormField.styles'

const renderHelpText = (error?: string, hint?: string): React.ReactNode => {
  if (error) {
    return <HelpText $error>{error}</HelpText>
  }

  if (hint) {
    return <HelpText>{hint}</HelpText>
  }

  return null
}

const FormField: React.FC<FormFieldProps> = ({ label, htmlFor, error, hint, children }) => {
  return (
    <FieldContainer>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {renderHelpText(error, hint)}
    </FieldContainer>
  )
}

export { FormField }
