// Core
import { forwardRef, JSX } from 'react';

// Types
import { InputFieldProps, InputFieldType } from './InputField.types';

// Component
import {
  ErrorMessage,
  FieldLabel,
  FieldWrapper,
  HintText,
  InputWrapper,
  StyledInput,
  TrailingSlot,
} from './InputField.style';

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      name,
      type = InputFieldType.text,
      value,
      onChange,
      onBlur,
      error,
      hint,
      trailingIcon,
      onTrailingIconClick,
      trailingIconAriaLabel,
      mono = false,
      disabled = false,
      autoComplete,
      placeholder,
      id,
      testId,
    },
    ref
  ): JSX.Element => {
    /* *********************************************************************************************
    **************************************** DERIVED STATE *****************************************
    ********************************************************************************************* */
    const inputId = id ?? name;
    const errorId = `${inputId}-error`;
    const hasError = Boolean(error);

    /* *********************************************************************************************
    ******************************************** RENDER ********************************************
    ********************************************************************************************* */
    return (
      <FieldWrapper data-testid={testId}>
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
            aria-describedby={
              hasError
                ? errorId
                : undefined
            }
          />
          {trailingIcon && (
            <TrailingSlot
              type="button"
              onClick={onTrailingIconClick}
              aria-label={trailingIconAriaLabel}
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
  }
);

InputField.displayName = 'InputField';
export { InputField };
export { InputFieldType };
