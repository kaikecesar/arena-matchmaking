// Core
import { JSX } from 'react';

// Types
import { FieldErrorProps } from './FieldError.types';

// Component
import { ErrorText } from './FieldError.style';

function FieldError({
  message = null,
  testId,
}: FieldErrorProps): JSX.Element | null {
  if (!message) {
    return null;
  }

  return (
    <ErrorText role="alert" data-testid={testId}>
      {message}
    </ErrorText>
  );
}

export { FieldError };
