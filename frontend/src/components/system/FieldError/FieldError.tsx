// Core
import { ErrorText } from './FieldError.style';
import type { FieldErrorProps } from './FieldError.types';
import type { JSX } from 'react';

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
