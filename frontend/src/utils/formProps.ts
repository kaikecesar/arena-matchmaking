/** Omits optional props when value is undefined (exactOptionalPropertyTypes-safe). */
const fieldErrorProp = (
  message: string | undefined
): { error: string } | Record<string, never> =>
  message === undefined
    ? {}
    : { error: message }

export { fieldErrorProp }
