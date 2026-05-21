import { useNavigate } from 'react-router-dom';
import { BrandMark } from '@/components/ui/BrandMark';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { InputField } from '@/components/ui/InputField';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { authStrings } from '@/i18n/pt-BR/auth';
import { useLoginForm } from './useLoginForm';
import {
  PageShell,
  GlowBlood,
  GlowCopper,
  Card,
  LoginHeader,
  HeroBlock,
  HeroEyebrowWrapper,
  HeroHeading,
  HeroHighlight,
  HeroSubtitle,
  LoginForm,
  FormFooterRow,
  ForgotLink,
  GeneralErrorBox,
  GeneralErrorText,
  PageFooter,
  FooterLeft,
  FooterCreateLink,
  SecurityBadge,
} from './Login.styles';

// ─── SVG icons (inline, no deps) ─────────────────────────────────────────────

function EyeOpenIcon(): React.ReactElement {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1.5 9C1.5 9 4 3.75 9 3.75C14 3.75 16.5 9 16.5 9C16.5 9 14 14.25 9 14.25C4 14.25 1.5 9 1.5 9Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="9"
        cy="9"
        r="2.25"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function EyeOffIcon(): React.ReactElement {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.25 2.25L15.75 15.75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M7.5 7.61A2.25 2.25 0 0 0 10.39 10.5M5.01 5.12C3.3 6.22 2.25 9 2.25 9s2.25 5.25 6.75 5.25c1.32 0 2.47-.35 3.44-.9M12.47 12.58C13.92 11.5 15.75 9 15.75 9S13.5 3.75 9 3.75c-.73 0-1.42.1-2.06.28"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon(): React.ReactElement {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.75 9H14.25M14.25 9L9.75 4.5M14.25 9L9.75 13.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WarningIcon(): React.ReactElement {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0, marginTop: 1 }}
    >
      <path
        d="M8 1.5L14.5 13H1.5L8 1.5Z"
        stroke="#f3a0a7"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="8"
        y1="6"
        x2="8"
        y2="9.5"
        stroke="#f3a0a7"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="8" cy="11.5" r="0.75" fill="#f3a0a7" />
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function LoginPage(): React.ReactElement {
  const navigate = useNavigate();
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
  } = useLoginForm();

  const { onBlur: identifierOnBlur, ref: identifierRef } = register('identifier');
  const { onChange: rhfPasswordChange, onBlur: passwordOnBlur, ref: passwordRef } =
    register('password');

  return (
    <PageShell>
      <GlowBlood />
      <GlowCopper />

      <Card>
        {/* ── Header ── */}
        <LoginHeader>
          <BrandMark size={28} />
        </LoginHeader>

        {/* ── Hero ── */}
        <HeroBlock>
          <HeroEyebrowWrapper>
            <Eyebrow $color="copper">{authStrings.systemTagline}</Eyebrow>
          </HeroEyebrowWrapper>
          <HeroHeading>
            {authStrings.heroLine1}{' '}
            <HeroHighlight>{authStrings.heroHighlight}</HeroHighlight>.
          </HeroHeading>
          <HeroSubtitle>{authStrings.heroSubtitle}</HeroSubtitle>
        </HeroBlock>

        {/* ── Form ── */}
        <LoginForm
          onSubmit={handleSubmit}
          noValidate
          aria-label="Formulário de login"
        >
          {/* Identifier field — controlled with CPF formatting */}
          <InputField
            ref={identifierRef}
            label={authStrings.fieldEmailLabel}
            name="identifier"
            type="text"
            value={identifierDisplayValue}
            onChange={onIdentifierChange}
            onBlur={identifierOnBlur}
            error={errors.identifier?.message}
            autoComplete="username"
            disabled={isLoading}
          />

          {/* Password field */}
          <InputField
            ref={passwordRef}
            label={authStrings.fieldPasswordLabel}
            name="password"
            type={isPasswordVisible ? 'text' : 'password'}
            value={passwordValue}
            onChange={rhfPasswordChange}
            onBlur={passwordOnBlur}
            error={errors.password?.message}
            autoComplete="current-password"
            mono
            disabled={isLoading}
            trailingIcon={
              isPasswordVisible ? <EyeOffIcon /> : <EyeOpenIcon />
            }
            onTrailingIconClick={togglePasswordVisibility}
          />

          {/* Checkbox + forgot password */}
          <FormFooterRow>
            <Checkbox
              name="keepSession"
              checked={keepSession}
              onChange={onKeepSessionChange}
              label={authStrings.keepSession}
            />
            <ForgotLink
              type="button"
              onClick={() => void navigate('/forgot-password')}
            >
              {authStrings.forgotPassword}
            </ForgotLink>
          </FormFooterRow>

          {/* General error */}
          {generalError && (
            <GeneralErrorBox role="alert" aria-live="polite">
              <WarningIcon />
              <GeneralErrorText>{generalError}</GeneralErrorText>
            </GeneralErrorBox>
          )}

          {/* Submit */}
          <Button
            type="submit"
            variant="blood"
            size="lg"
            fullWidth
            label={authStrings.submitButton}
            loading={isLoading}
            aria-label={isLoading ? authStrings.a11yLoading : undefined}
            trailingIcon={!isLoading ? <ArrowRightIcon /> : undefined}
          />
        </LoginForm>

        {/* ── Footer ── */}
        <PageFooter>
          <FooterLeft>
            {authStrings.noAccount}
            <FooterCreateLink
              type="button"
              onClick={() => void navigate('/register')}
            >
              {authStrings.createAccount}
            </FooterCreateLink>
          </FooterLeft>
          <SecurityBadge>{authStrings.securityBadge}</SecurityBadge>
        </PageFooter>
      </Card>
    </PageShell>
  );
}
