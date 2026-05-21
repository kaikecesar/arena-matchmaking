// Core
import type { ReactElement } from 'react'

// Components
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from '@/components/ui/Button'
import { InputField, InputFieldType } from '@/components/ui/InputField'
import { AuthAlert } from '@/features/auth/components/AuthAlert/AuthAlert'
import { AuthHero } from '@/features/auth/components/AuthHero/AuthHero'
import { AuthLayout } from '@/features/auth/components/AuthLayout/AuthLayout'

// Hooks
import { useForgotPassword } from '@/features/auth/ForgotPassword/useForgotPassword'

// Utils
import { fieldErrorProp } from '@/utils/formProps'

// Constants
import { authStrings } from '@/i18n/pt-BR/auth'

// Styles
import {
  ForgotLink,
  LoginForm,
  SuccessPanel,
  SuccessSubtitle,
  SuccessTitle,
} from '@/features/auth/Login/Login.styles'

const ForgotPassword = (): ReactElement => {
  /* ***********************************************************************************************
  ***************************************** DERIVED STATE ******************************************
  *********************************************************************************************** */
  const {
    register,
    errors,
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
          {...fieldErrorProp(errors.identifier?.message)}
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

        <ForgotLink type="button" onClick={navigateToLogin}>
          {authStrings.forgot.backToLogin}
        </ForgotLink>
      </LoginForm>
    </AuthLayout>
  )
}

export { ForgotPassword }
