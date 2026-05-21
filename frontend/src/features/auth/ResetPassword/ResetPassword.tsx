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
import { useResetPassword } from '@/features/auth/ResetPassword/useResetPassword'

// Utils
import { fieldErrorProp } from '@/utils/formProps'

// Constants
import { authStrings } from '@/i18n/pt-BR/auth'

// Styles
import {
  LoginForm,
  StrengthFill,
  StrengthLabel,
  StrengthTrack,
  SuccessPanel,
  SuccessSubtitle,
  SuccessTitle,
} from '@/features/auth/Login/Login.styles'

const ResetPassword = (): ReactElement => {
  /* ***********************************************************************************************
  ***************************************** DERIVED STATE ******************************************
  *********************************************************************************************** */
  const {
    register,
    errors,
    handleSubmit,
    state,
    passwordValue,
    confirmPasswordValue,
    strength,
    navigateToLogin,
  } = useResetPassword()

  const { ref: passwordRef, onChange: passwordChange, onBlur: passwordBlur } = register('password')
  const {
    ref: confirmRef,
    onChange: confirmChange,
    onBlur: confirmBlur,
  } = register('confirmPassword')

  /* ***********************************************************************************************
  *************************************** COMPONENT HANDLING ***************************************
  *********************************************************************************************** */
  if (state.ui.isSuccess) {
    return (
      <AuthLayout>
        <SuccessPanel>
          <SuccessTitle>{authStrings.reset.successTitle}</SuccessTitle>
          <SuccessSubtitle>{authStrings.reset.successSubtitle}</SuccessSubtitle>
        </SuccessPanel>
        <Button
          type={ButtonType.button}
          variant={ButtonVariant.blood}
          size={ButtonSize.medium}
          fullWidth
          label={authStrings.reset.goToLogin}
          onClick={navigateToLogin}
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
        eyebrow={authStrings.reset.eyebrow}
        line1={authStrings.reset.heroLine1}
        highlight={authStrings.reset.heroHighlight}
        subtitle={authStrings.reset.heroSubtitle}
      />

      <LoginForm onSubmit={handleSubmit} noValidate>
        <div>
          <InputField
            ref={passwordRef}
            label={authStrings.reset.fieldPassword}
            name="password"
            type={InputFieldType.password}
            value={passwordValue}
            onChange={passwordChange}
            onBlur={passwordBlur}
            {...fieldErrorProp(errors.password?.message)}
            disabled={state.async.isLoading}
            mono
          />
          {passwordValue.length > 0 && (
            <>
              <StrengthTrack>
                <StrengthFill $percent={strength.percent} />
              </StrengthTrack>
              <StrengthLabel>Força da senha: {strength.label}</StrengthLabel>
            </>
          )}
        </div>

        <InputField
          ref={confirmRef}
          label={authStrings.reset.fieldConfirmPassword}
          name="confirmPassword"
          type={InputFieldType.password}
          value={confirmPasswordValue}
          onChange={confirmChange}
          onBlur={confirmBlur}
          {...fieldErrorProp(errors.confirmPassword?.message)}
          disabled={state.async.isLoading}
          mono
        />

        {state.async.generalError && <AuthAlert message={state.async.generalError} />}

        <Button
          type={ButtonType.submit}
          variant={ButtonVariant.blood}
          size={ButtonSize.medium}
          fullWidth
          label={authStrings.reset.submit}
          loading={state.async.isLoading}
        />
      </LoginForm>
    </AuthLayout>
  )
}

export { ResetPassword }
