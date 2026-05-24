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
import { StepIndicator } from '@/layout/StepIndicator/StepIndicator'

// Hooks
import { useCreateAccount } from '@/views/auth/CreateAccount/useCreateAccount'

// Utils
import { formatCPF } from '@/plugins/utils/formatCPF'
import { authFieldErrorProp } from '@/plugins/utils/formProps'

// I18n
import { authStrings } from '@/i18n/pt-BR/auth'

// Types
import type { JSX } from 'react'
import type { RegisterRole } from '@/types/auth'

// Style
import {
  FooterCreateLink,
  FooterLeft,
  FormActions,
  FormStep,
  LoginForm,
  SectionHint,
  SectionLead,
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
} from '@/views/auth/Login/Login.style'

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

function CreateAccount(): JSX.Element {
  /* ***********************************************************************************************
  ***************************************** DERIVED STATE ******************************************
  *********************************************************************************************** */
  const {
    state,
    profileForm,
    passwordForm,
    nameValue,
    emailValue,
    passwordValue,
    confirmPasswordValue,
    onNameChange,
    onNameBlur,
    onEmailChange,
    onEmailBlur,
    onDocumentBlur,
    onPasswordChange,
    onPasswordBlur,
    onConfirmPasswordChange,
    onConfirmPasswordBlur,
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
        <FormStep key="role">
          <LoginForm
            onSubmit={(e) => {
              e.preventDefault()
              goNext()
            }}
            noValidate
          >
            <div>
              <SectionLead>{authStrings.register.roleTitle}</SectionLead>
              <SectionHint>{authStrings.register.roleSubtitle}</SectionHint>
            </div>
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
        </FormStep>
      )}

      {step === 1 && (
        <FormStep key="profile">
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
            value={nameValue}
            onChange={onNameChange}
            onBlur={onNameBlur}
            {...authFieldErrorProp({
              field: 'name',
              formState: profileForm.formState,
              fallback: authStrings.register.errorName,
            })}
          />
          <InputField
            label={authStrings.register.fieldEmail}
            name="email"
            type={InputFieldType.text}
            value={emailValue}
            onChange={onEmailChange}
            onBlur={onEmailBlur}
            {...authFieldErrorProp({
              field: 'email',
              formState: profileForm.formState,
              fallback: authStrings.register.errorEmailInvalid,
            })}
          />
          <InputField
            label={authStrings.register.fieldDocument}
            name="document"
            type={InputFieldType.text}
            value={state.ui.documentDisplay}
            onChange={(e) => onDocumentChange(e.target.value)}
            onBlur={onDocumentBlur}
            {...authFieldErrorProp({
              field: 'document',
              formState: profileForm.formState,
              fallback: authStrings.register.errorDocument,
            })}
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
        </FormStep>
      )}

      {step === 2 && (
        <FormStep key="security">
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
              onChange={onPasswordChange}
              onBlur={onPasswordBlur}
              {...authFieldErrorProp({
                field: 'password',
                formState: passwordForm.formState,
                fallback: authStrings.register.errorPassword,
              })}
              mono
            />
            {passwordValue.length > 0 && (
              <>
                <StrengthTrack>
                  <StrengthFill $percent={strength.percent} />
                </StrengthTrack>
                <StrengthLabel>
                  {authStrings.register.strengthLabel}: {strength.label}
                </StrengthLabel>
              </>
            )}
          </div>
          <InputField
            label={authStrings.register.fieldConfirmPassword}
            name="confirmPassword"
            type={InputFieldType.password}
            value={confirmPasswordValue}
            onChange={onConfirmPasswordChange}
            onBlur={onConfirmPasswordBlur}
            {...authFieldErrorProp({
              field: 'confirmPassword',
              formState: passwordForm.formState,
              fallback: authStrings.register.errorConfirmPassword,
            })}
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
        </FormStep>
      )}

      {step === 3 && profileData && passwordData && selectedRole && (
        <FormStep key="review">
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
        </FormStep>
      )}
    </AuthLayout>
  )
}

export { CreateAccount }
