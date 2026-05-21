/* *************************************************************************************************
****************************************** FORM OPTIONS ********************************************
************************************************************************************************* */
const AUTH_FORM_OPTIONS = {
  mode: 'onTouched' as const,
  reValidateMode: 'onSubmit' as const,
  criteriaMode: 'firstError' as const,
  shouldFocusError: true,
}

export { AUTH_FORM_OPTIONS }
