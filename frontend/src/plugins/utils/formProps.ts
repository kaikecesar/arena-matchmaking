// Utils
import { getVisibleFieldError, sanitizeValidationMessage } from '@/plugins/utils/formValidation'

// Types
import type { FieldErrors, FieldValues, Path } from 'react-hook-form'

type FieldErrorPropInput<TFieldValues extends FieldValues> = {
  field: Path<TFieldValues>
  formState: {
    errors: FieldErrors<TFieldValues>
    touchedFields: Partial<Readonly<Record<string, boolean | boolean[]>>>
    isSubmitted: boolean
  }
  fallback: string
}

/** Omits optional props when value is undefined (exactOptionalPropertyTypes-safe). */
const fieldErrorProp = (
  message: string | undefined
): { error: string } | Record<string, never> =>
  message === undefined
    ? {}
    : { error: message }

const authFieldErrorProp = <TFieldValues extends FieldValues>(
  input: FieldErrorPropInput<TFieldValues>
): { error: string } | Record<string, never> =>
  fieldErrorProp(getVisibleFieldError(input.field, input.formState, input.fallback))

export { authFieldErrorProp, fieldErrorProp, sanitizeValidationMessage }
