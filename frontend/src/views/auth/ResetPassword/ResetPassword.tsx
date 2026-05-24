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
import { AuthAlert } from '@/views/auth/components/AuthAlert/AuthAlert'
import { AuthHero } from '@/views/auth/components/AuthHero/AuthHero'
import { AuthLayout } from '@/views/auth/components/AuthLayout/AuthLayout'

// Hooks
import { useResetPassword } from '@/views/auth/ResetPassword/useResetPassword'

// Utils
import { authFieldErrorProp } from '@/utils/formProps'

// I18n
import { authStrings } from '@/i18n/pt-BR/auth'

// Style
import {
  LoginForm,
  StrengthFill,
  StrengthLabel,
  StrengthTrack,
  SuccessPanel,
  SuccessSubtitle,
  SuccessTitle,
} from '@/views/auth/Login/Login.style'

function ResetPassword(): JSX.Element {
  /* ***********************************************************************************************
  ***************************************** DERIVED STATE ******************************************
  *********************************************************************************************** */
  const {
    register,
    formState,
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
            {...authFieldErrorProp({
              field: 'password',
              formState,
              fallback: authStrings.reset.errorPassword,
            })}
            disabled={state.async.isLoading}
            mono
          />
          {passwordValue.length > 0 && (
            <>
              <StrengthTrack>
                <StrengthFill $percent={strength.percent} />
              </StrengthTrack>
              <StrengthLabel>
                {authStrings.reset.strengthLabel}: {strength.label}
              </StrengthLabel>
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
          {...authFieldErrorProp({
            field: 'confirmPassword',
            formState,
            fallback: authStrings.reset.errorConfirmPassword,
          })}
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
