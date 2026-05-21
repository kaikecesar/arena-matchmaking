import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { BrandMark } from '@/components/ui/BrandMark';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { InputField } from '@/components/ui/InputField';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { ArrowRightIcon, EyeOffIcon, EyeOpenIcon, WarningIcon } from '@/components/icons';
import { ROUTES } from '@/constants/routes';
import { authStrings } from '@/i18n/pt-BR/auth';
import { useLoginForm } from './useLoginForm';
// ─── Page ─────────────────────────────────────────────────────────────────────

const Login = (): ReactElement => {
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
              onClick={() => void navigate(ROUTES.FORGOT_PASSWORD)}
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
              onClick={() => void navigate(ROUTES.REGISTER)}
            >
              {authStrings.createAccount}
            </FooterCreateLink>
          </FooterLeft>
          <SecurityBadge>{authStrings.securityBadge}</SecurityBadge>
        </PageFooter>
      </Card>
    </PageShell>
  );
};

export { Login };
