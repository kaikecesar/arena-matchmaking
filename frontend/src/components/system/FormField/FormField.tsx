// Core
import { JSX, ReactNode } from 'react';

// Types
import { FormFieldProps } from './FormField.types';

// Component
import { FieldContainer, HelpText, Label } from './FormField.style';

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
  testId,
}: FormFieldProps): JSX.Element {
  return (
    <FieldContainer data-testid={testId}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {renderHelpText(error, hint)}
    </FieldContainer>
  );
}

export { FormField };
