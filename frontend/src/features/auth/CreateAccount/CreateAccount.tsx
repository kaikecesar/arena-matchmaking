import { useState } from 'react'
import type { ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

import { AuthLayout } from '@/features/auth/components/AuthLayout/AuthLayout'
import { AuthHero } from '@/features/auth/components/AuthHero/AuthHero'
import { AuthAlert } from '@/features/auth/components/AuthAlert/AuthAlert'
import { StepIndicator } from '@/features/auth/components/StepIndicator/StepIndicator'
import { useAuth } from '@/features/auth/hooks/useAuth'
import {
  registerPasswordSchema,
  registerProfileSchema,
  type RegisterPasswordValues,
  type RegisterProfileValues,
} from '@/features/auth/schemas'
import type { RegisterRole } from '@/features/auth/types'
import { getPasswordStrength } from '@/features/auth/utils/passwordStrength'
import { formatCPF } from '@/utils/formatCPF'
import {
  LoginForm,
  RoleGrid,
  RoleCardButton,
  RoleCardTitle,
  RoleCardDescription,
  FormActions,
  ReviewList,
  ReviewRow,
  ReviewLabel,
  ReviewValue,
  SuccessPanel,
  SuccessTitle,
  SuccessSubtitle,
  StrengthTrack,
  StrengthFill,
  StrengthLabel,
  HeroSubtitle,
  PageFooter,
  FooterLeft,
  FooterCreateLink,
  SecurityBadge,
} from '@/features/auth/Login/Login.styles'
import { InputField, InputFieldType } from '@/components/ui/InputField'
import { Button, ButtonSize, ButtonType, ButtonVariant } from '@/components/ui/Button'
import { ROUTES } from '@/constants/routes'
import { authStrings } from '@/i18n/pt-BR/auth'

const STEPS = [
  authStrings.register.stepRole,
  authStrings.register.stepProfile,
  authStrings.register.stepSecurity,
  authStrings.register.stepReview,
] as const

const ROLE_LABELS = {
  organizer: authStrings.register.roles.organizer.title,
  athlete: authStrings.register.roles.athlete.title,
  coach: authStrings.register.roles.coach.title,
} as const

export function CreateAccount(): ReactElement {
  const navigate = useNavigate()
  const { register: registerUser, isSubmitting } = useAuth()

  const [step, setStep] = useState(0)
  const [role, setRole] = useState<RegisterRole | null>(null)
  const [roleError, setRoleError] = useState<string | null>(null)
  const [generalError, setGeneralError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [documentDisplay, setDocumentDisplay] = useState('')

  const [profileData, setProfileData] = useState<RegisterProfileValues | null>(null)
  const [passwordData, setPasswordData] = useState<RegisterPasswordValues | null>(null)

  const profileForm = useForm<RegisterProfileValues>({
    resolver: zodResolver(registerProfileSchema),
    defaultValues: { name: '', email: '', document: '' },
  })

  const passwordForm = useForm<RegisterPasswordValues>({
    resolver: zodResolver(registerPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  const passwordValue = passwordForm.watch('password') ?? ''
  const strength = getPasswordStrength(passwordValue, authStrings.register.strength)

  const goNext = (): void => {
    setGeneralError(null)
    setRoleError(null)
    if (step === 0) {
      if (!role) {
        setRoleError(authStrings.register.errorSelectRole)
        return
      }
      setStep(1)
      return
    }
    if (step === 1) {
      void profileForm.handleSubmit((data) => {
        setProfileData(data)
        setStep(2)
      })()
      return
    }
    if (step === 2) {
      void passwordForm.handleSubmit((data) => {
        setPasswordData(data)
        setStep(3)
      })()
    }
  }

  const goBack = (): void => {
    setGeneralError(null)
    setStep((s) => Math.max(0, s - 1))
  }

  const onConfirm = async (): Promise<void> => {
    if (!role || !profileData || !passwordData) return
    setGeneralError(null)
    try {
      await registerUser({
        role,
        name: profileData.name,
        email: profileData.email,
        document: profileData.document.replace(/\D/g, ''),
        password: passwordData.password,
      })
      setIsSuccess(true)
    } catch (error) {
      setGeneralError(error instanceof Error ? error.message : authStrings.errorGeneric)
    }
  }

  if (isSuccess) {
    return (
      <AuthLayout wide>
        <SuccessPanel>
          <SuccessTitle>{authStrings.register.successTitle}</SuccessTitle>
          <SuccessSubtitle>{authStrings.register.successSubtitle}</SuccessSubtitle>
        </SuccessPanel>
      </AuthLayout>
    )
  }

  const footer = (
    <PageFooter>
      <FooterLeft>
        {authStrings.hasAccount}
        <FooterCreateLink type="button" onClick={() => void navigate(ROUTES.login)}>
          {authStrings.signIn}
        </FooterCreateLink>
      </FooterLeft>
      <SecurityBadge>{authStrings.securityBadge}</SecurityBadge>
    </PageFooter>
  )

  return (
    <AuthLayout wide footer={footer}>
      <AuthHero
        eyebrow={authStrings.register.eyebrow}
        line1={authStrings.register.heroLine1}
        highlight={authStrings.register.heroHighlight}
        subtitle={authStrings.register.heroSubtitle}
      />

      <StepIndicator steps={STEPS} currentStep={step} />

      {step === 0 && (
        <LoginForm
          onSubmit={(e) => {
            e.preventDefault()
            goNext()
          }}
          noValidate
        >
          <HeroSubtitle>{authStrings.register.roleTitle}</HeroSubtitle>
          <RoleGrid>
            {(['organizer', 'athlete', 'coach'] as const).map((key) => (
              <RoleCardButton
                key={key}
                type="button"
                $selected={role === key}
                onClick={() => {
                  setRole(key)
                  setRoleError(null)
                }}
              >
                <RoleCardTitle>{authStrings.register.roles[key].title}</RoleCardTitle>
                <RoleCardDescription>
                  {authStrings.register.roles[key].description}
                </RoleCardDescription>
              </RoleCardButton>
            ))}
          </RoleGrid>
          {roleError && <AuthAlert message={roleError} />}
          <Button
            type={ButtonType.submit}
            variant={ButtonVariant.blood}
            size={ButtonSize.medium}
            fullWidth
            label={authStrings.register.continue}
          />
        </LoginForm>
      )}

      {step === 1 && (
        <LoginForm
          onSubmit={(e) => {
            e.preventDefault()
            goNext()
          }}
          noValidate
        >
          <InputField
            label={authStrings.register.fieldName}
            name="name"
            type={InputFieldType.text}
            value={profileForm.watch('name')}
            onChange={profileForm.register('name').onChange}
            onBlur={profileForm.register('name').onBlur}
            error={profileForm.formState.errors.name?.message}
          />
          <InputField
            label={authStrings.register.fieldEmail}
            name="email"
            type={InputFieldType.text}
            value={profileForm.watch('email')}
            onChange={profileForm.register('email').onChange}
            onBlur={profileForm.register('email').onBlur}
            error={profileForm.formState.errors.email?.message}
          />
          <InputField
            label={authStrings.register.fieldDocument}
            name="document"
            type={InputFieldType.text}
            value={documentDisplay}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, '')
              setDocumentDisplay(formatCPF(digits))
              void profileForm.setValue('document', digits, { shouldValidate: false })
            }}
            onBlur={profileForm.register('document').onBlur}
            error={profileForm.formState.errors.document?.message}
          />
          <FormActions>
            <Button
              type={ButtonType.button}
              variant={ButtonVariant.ghost}
              size={ButtonSize.medium}
              label={authStrings.register.back}
              onClick={goBack}
            />
            <Button
              type={ButtonType.submit}
              variant={ButtonVariant.blood}
              size={ButtonSize.medium}
              label={authStrings.register.continue}
            />
          </FormActions>
        </LoginForm>
      )}

      {step === 2 && (
        <LoginForm
          onSubmit={(e) => {
            e.preventDefault()
            goNext()
          }}
          noValidate
        >
          <div>
            <InputField
              label={authStrings.register.fieldPassword}
              name="password"
              type={InputFieldType.password}
              value={passwordValue}
              onChange={passwordForm.register('password').onChange}
              onBlur={passwordForm.register('password').onBlur}
              error={passwordForm.formState.errors.password?.message}
              mono
            />
            {passwordValue.length > 0 && (
              <>
                <StrengthTrack>
                  <StrengthFill $percent={strength.percent} />
                </StrengthTrack>
                <StrengthLabel>Força: {strength.label}</StrengthLabel>
              </>
            )}
          </div>
          <InputField
            label={authStrings.register.fieldConfirmPassword}
            name="confirmPassword"
            type={InputFieldType.password}
            value={passwordForm.watch('confirmPassword') ?? ''}
            onChange={passwordForm.register('confirmPassword').onChange}
            onBlur={passwordForm.register('confirmPassword').onBlur}
            error={passwordForm.formState.errors.confirmPassword?.message}
            mono
          />
          <FormActions>
            <Button
              type={ButtonType.button}
              variant={ButtonVariant.ghost}
              size={ButtonSize.medium}
              label={authStrings.register.back}
              onClick={goBack}
            />
            <Button
              type={ButtonType.submit}
              variant={ButtonVariant.blood}
              size={ButtonSize.medium}
              label={authStrings.register.continue}
            />
          </FormActions>
        </LoginForm>
      )}

      {step === 3 && profileData && passwordData && role && (
        <LoginForm
          onSubmit={(e) => {
            e.preventDefault()
            void onConfirm()
          }}
          noValidate
        >
          <ReviewList>
            <ReviewRow>
              <ReviewLabel>{authStrings.register.reviewRole}</ReviewLabel>
              <ReviewValue>{ROLE_LABELS[role]}</ReviewValue>
            </ReviewRow>
            <ReviewRow>
              <ReviewLabel>{authStrings.register.reviewName}</ReviewLabel>
              <ReviewValue>{profileData.name}</ReviewValue>
            </ReviewRow>
            <ReviewRow>
              <ReviewLabel>{authStrings.register.reviewEmail}</ReviewLabel>
              <ReviewValue>{profileData.email}</ReviewValue>
            </ReviewRow>
            <ReviewRow>
              <ReviewLabel>{authStrings.register.reviewDocument}</ReviewLabel>
              <ReviewValue>{formatCPF(profileData.document)}</ReviewValue>
            </ReviewRow>
          </ReviewList>

          {generalError && <AuthAlert message={generalError} />}

          <FormActions>
            <Button
              type={ButtonType.button}
              variant={ButtonVariant.ghost}
              size={ButtonSize.medium}
              label={authStrings.register.back}
              onClick={goBack}
              disabled={isSubmitting}
            />
            <Button
              type={ButtonType.submit}
              variant={ButtonVariant.blood}
              size={ButtonSize.medium}
              label={authStrings.register.submit}
              loading={isSubmitting}
            />
          </FormActions>
        </LoginForm>
      )}
    </AuthLayout>
  )
}
