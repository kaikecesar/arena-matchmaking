// Core
import type { JSX } from 'react'

// Components
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from '@/components/ui/Button'
import { InputField, InputFieldType } from '@/components/ui/InputField'
import { AuthAlert } from '@/components/auth/AuthAlert/AuthAlert'
import { AuthHero } from '@/components/auth/AuthHero/AuthHero'
import { AuthLayout } from '@/layout/AuthLayout/AuthLayout'

// Hooks
import { useForgotPassword } from '@/views/ForgotPassword/useForgotPassword'

// Utils
import { authFieldErrorProp } from '@/plugins/utils/formProps'

// I18n
import { authStrings } from '@/i18n/pt-BR/auth'

// Style
import {
  BackLinkRow,
  ForgotLink,
  LoginForm,
  SuccessPanel,
  SuccessSubtitle,
  SuccessTitle,
} from '@/views/Login/Login.style'

function ForgotPassword(): JSX.Element {
  /* ***********************************************************************************************
  ***************************************** DERIVED STATE ******************************************
  *********************************************************************************************** */
  const {
    register,
    formState,
    handleSubmit,
    state,
    onIdentifierChange,
    navigateToLogin,
    navigateToReset,
  } = useForgotPassword()

  const { ref, onBlur } = register('identifier')

  /* ***********************************************************************************************
  *************************************** COMPONENT HANDLING ***************************************
  *********************************************************************************************** */
  if (state.ui.isSuccess) {
    return (
      <AuthLayout>
        <SuccessPanel>
          <SuccessTitle>{authStrings.forgot.successTitle}</SuccessTitle>
          <SuccessSubtitle>{authStrings.forgot.successSubtitle}</SuccessSubtitle>
        </SuccessPanel>
        <Button
          type={ButtonType.button}
          variant={ButtonVariant.blood}
          size={ButtonSize.medium}
          fullWidth
          label={authStrings.forgot.backToLogin}
          onClick={navigateToReset}
        />
      </AuthLayout>
    )
  }

  /* ***********************************************************************************************
  ********************************************* RENDER *********************************************
  *********************************************************************************************** */
  return (
    <AuthLayout>
      <AuthHero
        eyebrow={authStrings.forgot.eyebrow}
        line1={authStrings.forgot.heroLine1}
        highlight={authStrings.forgot.heroHighlight}
        subtitle={authStrings.forgot.heroSubtitle}
      />

      <LoginForm onSubmit={handleSubmit} noValidate>
        <InputField
          ref={ref}
          label={authStrings.forgot.fieldIdentifier}
          name="identifier"
          type={InputFieldType.text}
          value={state.ui.displayValue}
          onChange={onIdentifierChange}
          onBlur={onBlur}
          {...authFieldErrorProp({
            field: 'identifier',
            formState,
            fallback: authStrings.forgot.errorEmptyIdentifier,
          })}
          autoComplete="username"
          disabled={state.async.isLoading}
        />

        {state.async.generalError && <AuthAlert message={state.async.generalError} />}

        <Button
          type={ButtonType.submit}
          variant={ButtonVariant.blood}
          size={ButtonSize.medium}
          fullWidth
          label={authStrings.forgot.submit}
          loading={state.async.isLoading}
        />

        <BackLinkRow>
          <ForgotLink type="button" onClick={navigateToLogin}>
            {authStrings.forgot.backToLogin}
          </ForgotLink>
        </BackLinkRow>
      </LoginForm>
    </AuthLayout>
  )
}

export { ForgotPassword }
