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
import { StepIndicator } from '@/features/auth/components/StepIndicator/StepIndicator'

// Hooks
import { useCreateAccount } from '@/features/auth/CreateAccount/useCreateAccount'

// Utils
import { formatCPF } from '@/utils/formatCPF'
import { fieldErrorProp } from '@/utils/formProps'

// Constants
import { authStrings } from '@/i18n/pt-BR/auth'

// Types
import type { ReactElement } from 'react'
import type { RegisterRole } from '@/features/auth/types'

// Styles
import {
  FooterCreateLink,
  FooterLeft,
  FormActions,
  HeroSubtitle,
  LoginForm,
  PageFooter,
  ReviewLabel,
  ReviewList,
  ReviewRow,
  ReviewValue,
  RoleCardButton,
  RoleCardDescription,
  RoleCardTitle,
  RoleGrid,
  SecurityBadge,
  StrengthFill,
  StrengthLabel,
  StrengthTrack,
  SuccessPanel,
  SuccessSubtitle,
  SuccessTitle,
} from '@/features/auth/Login/Login.styles'

/* *************************************************************************************************
******************************************** CONSTANTS *********************************************
************************************************************************************************* */
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

const CreateAccount = (): ReactElement => {
  /* ***********************************************************************************************
  ***************************************** DERIVED STATE ******************************************
  *********************************************************************************************** */
  const {
    state,
    profileForm,
    passwordForm,
    passwordValue,
    strength,
    roleKeys,
    selectRole,
    goNext,
    goBack,
    onDocumentChange,
    onConfirm,
    goToLogin,
    isSubmitting,
  } = useCreateAccount()

  const { step } = state.ui
  const { selectedRole, profileData, passwordData } = state.form

  /* ***********************************************************************************************
  *************************************** COMPONENT HANDLING ***************************************
  *********************************************************************************************** */
  if (state.ui.isSuccess) {
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
        <FooterCreateLink type="button" onClick={goToLogin}>
          {authStrings.signIn}
        </FooterCreateLink>
      </FooterLeft>
      <SecurityBadge>{authStrings.securityBadge}</SecurityBadge>
    </PageFooter>
  )

  /* ***********************************************************************************************
  ********************************************* RENDER *********************************************
  *********************************************************************************************** */
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
            {roleKeys.map((key: RegisterRole) => (
              <RoleCardButton
                key={key}
                type="button"
                $selected={selectedRole === key}
                onClick={() => selectRole(key)}
              >
                <RoleCardTitle>{authStrings.register.roles[key].title}</RoleCardTitle>
                <RoleCardDescription>
                  {authStrings.register.roles[key].description}
                </RoleCardDescription>
              </RoleCardButton>
            ))}
          </RoleGrid>
          {state.async.roleError && <AuthAlert message={state.async.roleError} />}
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
            {...fieldErrorProp(profileForm.formState.errors.name?.message)}
          />
          <InputField
            label={authStrings.register.fieldEmail}
            name="email"
            type={InputFieldType.text}
            value={profileForm.watch('email')}
            onChange={profileForm.register('email').onChange}
            onBlur={profileForm.register('email').onBlur}
            {...fieldErrorProp(profileForm.formState.errors.email?.message)}
          />
          <InputField
            label={authStrings.register.fieldDocument}
            name="document"
            type={InputFieldType.text}
            value={state.ui.documentDisplay}
            onChange={(e) => onDocumentChange(e.target.value)}
            onBlur={profileForm.register('document').onBlur}
            {...fieldErrorProp(profileForm.formState.errors.document?.message)}
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
              {...fieldErrorProp(passwordForm.formState.errors.password?.message)}
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
            {...fieldErrorProp(passwordForm.formState.errors.confirmPassword?.message)}
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

      {step === 3 && profileData && passwordData && selectedRole && (
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
              <ReviewValue>{ROLE_LABELS[selectedRole]}</ReviewValue>
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

          {state.async.generalError && <AuthAlert message={state.async.generalError} />}

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

export { CreateAccount }
