// Core
import { forwardRef, type JSX } from 'react'

// Style
import {
  ErrorMessage,
  FieldLabel,
  FieldWrapper,
  HintText,
  InputWrapper,
  StyledInput,
  TrailingSlot,
} from '@/components/ui/InputField/InputField.style'

// Types
import { InputFieldType, type InputFieldProps } from '@/components/ui/InputField/InputField.types'

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
    },
    ref
  ): JSX.Element => {
    /* *********************************************************************************************
    **************************************** DERIVED STATE *****************************************
    ********************************************************************************************* */
    const inputId = id ?? name
    const errorId = `${inputId}-error`
    const hasError = Boolean(error)

    /* *********************************************************************************************
    ******************************************** RENDER ********************************************
    ********************************************************************************************* */
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
    )
  }
)

InputField.displayName = 'InputField'
export { InputField }
export { InputFieldType }
