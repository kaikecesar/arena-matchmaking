import React from 'react'

import type { FormFieldProps } from './FormField.types'
import { FieldContainer, Label, HelpText } from './FormField.styles'

const FormField: React.FC<FormFieldProps> = ({ label, htmlFor, error, hint, children }) => {
  return (
    <FieldContainer>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? <HelpText $error>{error}</HelpText> : hint ? <HelpText>{hint}</HelpText> : null}
    </FieldContainer>
  )
}

export { FormField }
