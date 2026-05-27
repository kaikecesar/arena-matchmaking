// Core
import type { JSX, ReactNode } from 'react';

// Types
import type { FormFieldProps } from '@/components/system/FormField/FormField.types';

// Style
import { FieldContainer, HelpText, Label } from '@/components/system/FormField/FormField.style';

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
