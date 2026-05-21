import { useState } from 'react'
import type { ReactElement } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { AuthLayout } from '@/features/auth/components/AuthLayout/AuthLayout'
import { AuthHero } from '@/features/auth/components/AuthHero/AuthHero'
import { AuthAlert } from '@/features/auth/components/AuthAlert/AuthAlert'
import { authService } from '@/features/auth/services'
import { resetPasswordSchema, type ResetPasswordFormValues } from '@/features/auth/schemas'
import { getAuthErrorMessage } from '@/features/auth/utils/authErrors'
import { getPasswordStrength } from '@/features/auth/utils/passwordStrength'
import {
  LoginForm,
  SuccessPanel,
  SuccessTitle,
  SuccessSubtitle,
  StrengthTrack,
  StrengthFill,
  StrengthLabel,
} from '@/features/auth/Login/Login.styles'
import { InputField, InputFieldType } from '@/components/ui/InputField'
import { Button, ButtonSize, ButtonType, ButtonVariant } from '@/components/ui/Button'
import { ROUTES } from '@/constants/routes'
import { authStrings } from '@/i18n/pt-BR/auth'

export function ResetPassword(): ReactElement {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? 'mock-recovery'

  const [isLoading, setIsLoading] = useState(false)
  const [generalError, setGeneralError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  const passwordValue = useWatch({ control, name: 'password', defaultValue: '' }) ?? ''
  const strength = getPasswordStrength(passwordValue, authStrings.reset.strength)

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)
    setGeneralError(null)
    try {
      await authService.resetPassword({ ...data, token })
      setIsSuccess(true)
    } catch (error) {
      setGeneralError(getAuthErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  })

  if (isSuccess) {
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
          onClick={() => void navigate(ROUTES.login)}
        />
      </AuthLayout>
    )
  }

  const { ref: passwordRef, onChange: passwordChange, onBlur: passwordBlur } = register('password')
  const {
    ref: confirmRef,
    onChange: confirmChange,
    onBlur: confirmBlur,
  } = register('confirmPassword')

  return (
    <AuthLayout>
      <AuthHero
        eyebrow={authStrings.reset.eyebrow}
        line1={authStrings.reset.heroLine1}
        highlight={authStrings.reset.heroHighlight}
        subtitle={authStrings.reset.heroSubtitle}
      />

      <LoginForm onSubmit={(e) => void onSubmit(e)} noValidate>
        <div>
          <InputField
            ref={passwordRef}
            label={authStrings.reset.fieldPassword}
            name="password"
            type={InputFieldType.password}
            value={passwordValue}
            onChange={passwordChange}
            onBlur={passwordBlur}
            error={errors.password?.message}
            disabled={isLoading}
            mono
          />
          {passwordValue.length > 0 && (
            <>
              <StrengthTrack>
                <StrengthFill $percent={strength.percent} />
              </StrengthTrack>
              <StrengthLabel>
                Força da senha: {strength.label}
              </StrengthLabel>
            </>
          )}
        </div>

        <InputField
          ref={confirmRef}
          label={authStrings.reset.fieldConfirmPassword}
          name="confirmPassword"
          type={InputFieldType.password}
          value={useWatch({ control, name: 'confirmPassword', defaultValue: '' }) ?? ''}
          onChange={confirmChange}
          onBlur={confirmBlur}
          error={errors.confirmPassword?.message}
          disabled={isLoading}
          mono
        />

        {generalError && <AuthAlert message={generalError} />}

        <Button
          type={ButtonType.submit}
          variant={ButtonVariant.blood}
          size={ButtonSize.medium}
          fullWidth
          label={authStrings.reset.submit}
          loading={isLoading}
        />
      </LoginForm>
    </AuthLayout>
  )
}
