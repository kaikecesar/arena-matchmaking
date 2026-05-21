import { useState } from 'react'
import type { ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

import { AuthLayout } from '@/features/auth/components/AuthLayout/AuthLayout'
import { AuthHero } from '@/features/auth/components/AuthHero/AuthHero'
import { AuthAlert } from '@/features/auth/components/AuthAlert/AuthAlert'
import { authService } from '@/features/auth/services'
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '@/features/auth/schemas'
import { getAuthErrorMessage } from '@/features/auth/utils/authErrors'
import { LoginForm, ForgotLink, SuccessPanel, SuccessTitle, SuccessSubtitle } from '@/features/auth/Login/Login.styles'
import { InputField, InputFieldType } from '@/components/ui/InputField'
import { Button, ButtonSize, ButtonType, ButtonVariant } from '@/components/ui/Button'
import { ROUTES } from '@/constants/routes'
import { authStrings } from '@/i18n/pt-BR/auth'
import { formatCPF } from '@/utils/formatCPF'

export function ForgotPassword(): ReactElement {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [generalError, setGeneralError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [displayValue, setDisplayValue] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { identifier: '' },
  })

  const { ref, onBlur } = register('identifier')

  const onIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const raw = e.target.value
    if (raw.includes('@')) {
      setDisplayValue(raw)
      setValue('identifier', raw, { shouldValidate: false })
      return
    }
    const digits = raw.replace(/\D/g, '')
    setDisplayValue(formatCPF(digits))
    setValue('identifier', digits, { shouldValidate: false })
  }

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)
    setGeneralError(null)
    try {
      await authService.forgotPassword(data)
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
          <SuccessTitle>{authStrings.forgot.successTitle}</SuccessTitle>
          <SuccessSubtitle>{authStrings.forgot.successSubtitle}</SuccessSubtitle>
        </SuccessPanel>
        <Button
          type={ButtonType.button}
          variant={ButtonVariant.blood}
          size={ButtonSize.medium}
          fullWidth
          label={authStrings.forgot.backToLogin}
          onClick={() => void navigate(ROUTES.resetPassword + '?token=mock-recovery')}
        />
      </AuthLayout>
    )
  }

  return (
    <AuthLayout>
      <AuthHero
        eyebrow={authStrings.forgot.eyebrow}
        line1={authStrings.forgot.heroLine1}
        highlight={authStrings.forgot.heroHighlight}
        subtitle={authStrings.forgot.heroSubtitle}
      />

      <LoginForm onSubmit={(e) => void onSubmit(e)} noValidate>
        <InputField
          ref={ref}
          label={authStrings.forgot.fieldIdentifier}
          name="identifier"
          type={InputFieldType.text}
          value={displayValue}
          onChange={onIdentifierChange}
          onBlur={onBlur}
          error={errors.identifier?.message}
          autoComplete="username"
          disabled={isLoading}
        />

        {generalError && <AuthAlert message={generalError} />}

        <Button
          type={ButtonType.submit}
          variant={ButtonVariant.blood}
          size={ButtonSize.medium}
          fullWidth
          label={authStrings.forgot.submit}
          loading={isLoading}
        />

        <ForgotLink type="button" onClick={() => void navigate(ROUTES.login)}>
          {authStrings.forgot.backToLogin}
        </ForgotLink>
      </LoginForm>
    </AuthLayout>
  )
}
