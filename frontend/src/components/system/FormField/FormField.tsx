// Core
import { JSX, ReactNode } from 'react';

// Component
import { FieldContainer, HelpText, Label } from './FormField.style';
import { FormFieldProps } from './FormField.types';

function renderHelpText(
  error?: string,
  hint?: string,
): ReactNode {
  if (error) {
    return <HelpText $error>{error}</HelpText>;
  }

  if (hint) {
    return <HelpText>{hint}</HelpText>;
  }

  return null;
}

function FormField({
  label,
  htmlFor,
  error,
  hint,
  children,
}: FormFieldProps): JSX.Element {
  return (
    <FieldContainer>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {renderHelpText(error, hint)}
    </FieldContainer>
  );
}

export { FormField };
