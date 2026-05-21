import type { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LoginForm,
  FormFooterRow,
  ForgotLink,
  PageFooter,
  FooterLeft,
  FooterCreateLink,
  SecurityBadge,
} from './Login.styles'
import { AuthLayout } from '@/features/auth/components/AuthLayout/AuthLayout'
import { AuthHero } from '@/features/auth/components/AuthHero/AuthHero'
import { AuthAlert } from '@/features/auth/components/AuthAlert/AuthAlert'
import { Button, ButtonSize, ButtonType, ButtonVariant } from '@/components/ui/Button'
import { InputField, InputFieldType } from '@/components/ui/InputField'
import { Checkbox } from '@/components/ui/Checkbox'
import { ArrowRightIcon, EyeOffIcon, EyeOpenIcon } from '@/components/icons'
import { ROUTES } from '@/constants/routes'
import { authStrings } from '@/i18n/pt-BR/auth'
import { useLoginForm } from './useLoginForm'

const Login = (): ReactElement => {
  const navigate = useNavigate()
  const {
    register,
    errors,
    handleSubmit,
    isLoading,
    generalError,
    isPasswordVisible,
    togglePasswordVisibility,
    keepSession,
    onKeepSessionChange,
    identifierDisplayValue,
    onIdentifierChange,
    passwordValue,
  } = useLoginForm()

  const { onBlur: identifierOnBlur, ref: identifierRef } = register('identifier')
  const {
    onChange: rhfPasswordChange,
    onBlur: passwordOnBlur,
    ref: passwordRef,
  } = register('password')

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

      <LoginForm onSubmit={handleSubmit} noValidate aria-label="Formulário de login">
        <InputField
          ref={identifierRef}
          label={authStrings.fieldEmailLabel}
          name="identifier"
          type={InputFieldType.text}
          value={identifierDisplayValue}
          onChange={onIdentifierChange}
          onBlur={identifierOnBlur}
          error={errors.identifier?.message}
          autoComplete="username"
          disabled={isLoading}
        />

        <InputField
          ref={passwordRef}
          label={authStrings.fieldPasswordLabel}
          name="password"
          type={isPasswordVisible ? InputFieldType.text : InputFieldType.password}
          value={passwordValue}
          onChange={rhfPasswordChange}
          onBlur={passwordOnBlur}
          error={errors.password?.message}
          autoComplete="current-password"
          mono
          disabled={isLoading}
          trailingIcon={isPasswordVisible ? <EyeOffIcon /> : <EyeOpenIcon />}
          onTrailingIconClick={togglePasswordVisibility}
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

        {generalError && <AuthAlert message={generalError} />}

        <Button
          type={ButtonType.submit}
          variant={ButtonVariant.blood}
          size={ButtonSize.medium}
          fullWidth
          label={authStrings.submitButton}
          loading={isLoading}
          aria-label={isLoading ? authStrings.a11yLoading : undefined}
          trailingIcon={!isLoading ? <ArrowRightIcon /> : undefined}
        />
      </LoginForm>
    </AuthLayout>
  )
}

export { Login }
