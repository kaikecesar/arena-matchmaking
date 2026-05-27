// Core
import { JSX } from 'react';

// Component
import { ErrorText } from './FieldError.style';
import { FieldErrorProps } from './FieldError.types';

function FieldError({
  message = null,
}: FieldErrorProps): JSX.Element | null {
  if (!message) {
    return null;
  }

  return (
    <ErrorText role="alert">
      {message}
    </ErrorText>
  );
}

export { FieldError };
