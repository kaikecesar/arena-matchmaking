// Core
import type { JSX } from 'react'

// Libraries
import { useNavigate } from 'react-router-dom'

// Constants
import { ROUTES } from '@/routes/routes'

// I18n
import { authStrings } from '@/i18n/pt-BR/auth'

// Utils
import { authFieldErrorProp } from '@/plugins/utils/formProps'

// Hooks
import { useLoginForm } from '@/views/Login/useLoginForm'

// Components
import { ArrowRightIcon, EyeOffIcon, EyeOpenIcon } from '@/components/icons'
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { InputField, InputFieldType } from '@/components/ui/InputField'
import { AuthAlert } from '@/components/auth/AuthAlert/AuthAlert'
import { AuthHero } from '@/components/auth/AuthHero/AuthHero'
import { AuthLayout } from '@/layout/AuthLayout/AuthLayout'

// Style
import {
  FooterCreateLink,
  FooterLeft,
  ForgotLink,
  FormFooterRow,
  LoginForm,
  PageFooter,
  SecurityBadge,
} from '@/views/Login/Login.style'

function Login(): JSX.Element {
  const navigate = useNavigate()

  /* ***********************************************************************************************
  ***************************************** DERIVED STATE ******************************************
  *********************************************************************************************** */
  const {
    state,
    register,
    formState,
    handleSubmit,
    isLoading,
    togglePasswordVisibility,
    keepSession,
    onKeepSessionChange,
    onIdentifierChange,
    passwordValue,
  } = useLoginForm()

  const { onBlur: identifierOnBlur, ref: identifierRef } = register('identifier')
  const {
    onChange: rhfPasswordChange,
    onBlur: passwordOnBlur,
    ref: passwordRef,
  } = register('password')

  /* ***********************************************************************************************
  ********************************************* RENDER *********************************************
  *********************************************************************************************** */
  return (
    <AuthLayout
      footer={
        <PageFooter>
          <FooterLeft>
            {authStrings.noAccount}
            <FooterCreateLink type="button" onClick={() => void navigate(ROUTES.register)}>
              {authStrings.createAccount}
            </FooterCreateLink>
          </FooterLeft>
          <SecurityBadge>{authStrings.securityBadge}</SecurityBadge>
        </PageFooter>
      }
    >
      <AuthHero
        eyebrow={authStrings.systemTagline}
        line1={authStrings.heroLine1}
        highlight={authStrings.heroHighlight}
        subtitle={authStrings.heroSubtitle}
      />

      <LoginForm onSubmit={handleSubmit} noValidate aria-label={authStrings.a11yLoginForm}>
        <InputField
          ref={identifierRef}
          label={authStrings.fieldEmailLabel}
          name="identifier"
          type={InputFieldType.text}
          value={state.ui.identifierDisplayValue}
          onChange={onIdentifierChange}
          onBlur={identifierOnBlur}
          {...authFieldErrorProp({
            field: 'identifier',
            formState,
            fallback: authStrings.errorEmptyIdentifier,
          })}
          autoComplete="username"
          disabled={isLoading}
        />

        <InputField
          ref={passwordRef}
          label={authStrings.fieldPasswordLabel}
          name="password"
          type={
            state.ui.isPasswordVisible
              ? InputFieldType.text
              : InputFieldType.password
          }
          value={passwordValue}
          onChange={rhfPasswordChange}
          onBlur={passwordOnBlur}
          {...authFieldErrorProp({
            field: 'password',
            formState,
            fallback: authStrings.errorEmptyPassword,
          })}
          autoComplete="current-password"
          mono
          disabled={isLoading}
          trailingIcon={
            state.ui.isPasswordVisible
              ? (
                  <EyeOffIcon />
                )
              : (
                  <EyeOpenIcon />
                )
          }
          onTrailingIconClick={togglePasswordVisibility}
          trailingIconAriaLabel={
            state.ui.isPasswordVisible
              ? authStrings.a11yHidePassword
              : authStrings.a11yShowPassword
          }
        />

        <FormFooterRow>
          <Checkbox
            name="keepSession"
            checked={keepSession}
            onChange={onKeepSessionChange}
            label={authStrings.keepSession}
          />
          <ForgotLink type="button" onClick={() => void navigate(ROUTES.forgotPassword)}>
            {authStrings.forgotPassword}
          </ForgotLink>
        </FormFooterRow>

        {state.async.generalError && <AuthAlert message={state.async.generalError} />}

        <Button
          type={ButtonType.submit}
          variant={ButtonVariant.blood}
          size={ButtonSize.medium}
          fullWidth
          label={authStrings.submitButton}
          loading={isLoading}
          aria-label={
            isLoading
              ? authStrings.a11yLoading
              : undefined
          }
          trailingIcon={
            !isLoading
              ? (
                  <ArrowRightIcon />
                )
              : undefined
          }
        />
      </LoginForm>
    </AuthLayout>
  )
}

export { Login }
