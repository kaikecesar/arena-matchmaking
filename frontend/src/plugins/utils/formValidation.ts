// Types
import type { FieldErrors, FieldValues, Path } from 'react-hook-form'

/* *************************************************************************************************
*************************************** MESSAGE SANITIZATION ***************************************
************************************************************************************************* */
const TECHNICAL_MESSAGE_PATTERNS = [
  /invalid input/i,
  /expected .+ received/i,
  /^required$/i,
  /must be a string/i,
  /must be a number/i,
  /unrecognized key/i,
  /too small/i,
  /too big/i,
] as const

const isTechnicalValidationMessage = (message: string): boolean =>
  TECHNICAL_MESSAGE_PATTERNS.some((pattern) => pattern.test(message.trim()))

const sanitizeValidationMessage = (
  message: string | undefined,
  fallback: string
): string | undefined => {
  if (message === undefined || message.length === 0) {
    return undefined
  }

  if (isTechnicalValidationMessage(message)) {
    return fallback
  }

  return message
}

/* *************************************************************************************************
****************************************** FIELD VISIBILITY ****************************************
************************************************************************************************* */
type FieldVisibilityInput = {
  errors: FieldErrors<FieldValues>
  touchedFields: Partial<Readonly<Record<string, boolean | boolean[]>>>
  isSubmitted: boolean
}

const shouldShowFieldError = (
  field: string,
  { errors, touchedFields, isSubmitted }: FieldVisibilityInput
): boolean => {
  const hasError = errors[field] !== undefined
  const wasTouched = touchedFields[field] === true
  return hasError && (wasTouched || isSubmitted)
}

const getVisibleFieldError = <TFieldValues extends FieldValues>(
  field: Path<TFieldValues>,
  formState: FieldVisibilityInput,
  fallback: string
): string | undefined => {
  const fieldKey = field as string

  if (!shouldShowFieldError(fieldKey, formState)) {
    return undefined
  }

  const rawMessage = formState.errors[fieldKey]?.message
  const message =
    typeof rawMessage === 'string'
      ? rawMessage
      : undefined

  return sanitizeValidationMessage(message, fallback)
}

export {
  getVisibleFieldError,
  isTechnicalValidationMessage,
  sanitizeValidationMessage,
  shouldShowFieldError,
}
