import React from 'react';
import type { InputFieldProps } from './InputField.types';
import {
  FieldWrapper,
  FieldLabel,
  InputWrapper,
  StyledInput,
  TrailingSlot,
  ErrorMessage,
  HintText,
} from './InputField.styles';

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      name,
      type = 'text',
      value,
      onChange,
      onBlur,
      error,
      hint,
      trailingIcon,
      onTrailingIconClick,
      mono = false,
      disabled = false,
      autoComplete,
      placeholder,
      id,
    },
    ref,
  ) => {
    const inputId = id ?? name;
    const errorId = `${inputId}-error`;
    const hasError = Boolean(error);

    return (
      <FieldWrapper>
        <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
        <InputWrapper $hasError={hasError} $disabled={disabled}>
          <StyledInput
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            autoComplete={autoComplete}
            placeholder={placeholder}
            $mono={mono}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
          />
          {trailingIcon && (
            <TrailingSlot
              type="button"
              onClick={onTrailingIconClick}
              tabIndex={-1}
            >
              {trailingIcon}
            </TrailingSlot>
          )}
        </InputWrapper>
        {hasError && (
          <ErrorMessage id={errorId} role="alert">
            {error}
          </ErrorMessage>
        )}
        {!hasError && hint && <HintText>{hint}</HintText>}
      </FieldWrapper>
    );
  },
);

InputField.displayName = 'InputField';
export { InputField };
