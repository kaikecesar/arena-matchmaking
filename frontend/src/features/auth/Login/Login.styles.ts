import styled from 'styled-components';

// ─── Page shell ───────────────────────────────────────────────────────────────

export const PageShell = styled.div`
  min-height: 100dvh;
  background: ${({ theme }) => theme.colors.bgApp};
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    align-items: center;
    justify-content: center;
  }
`;

// ─── Background atmosphere (decorative glows) ─────────────────────────────────

export const AtmosphereGlow = styled.div`
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
`;

export const GlowBlood = styled(AtmosphereGlow)`
  top: -100px;
  right: -120px;
  width: 460px;
  height: 460px;
  background: radial-gradient(
    circle,
    ${({ theme }) => theme.colors.bloodGlow} 0%,
    transparent 65%
  );
`;

export const GlowCopper = styled(AtmosphereGlow)`
  bottom: -120px;
  left: -80px;
  width: 320px;
  height: 320px;
  background: radial-gradient(
    circle,
    ${({ theme }) => theme.colors.copperTint} 0%,
    transparent 65%
  );
`;

// ─── Card (desktop only) ──────────────────────────────────────────────────────

export const Card = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 460px;
    padding: 48px;
    background: ${({ theme }) => theme.colors.surf1};
    border: 1px solid ${({ theme }) => theme.colors.border1};
    border-radius: ${({ theme }) => theme.radius.xl};
    box-shadow: ${({ theme }) => theme.shadows.pop};
  }
`;

// ─── Header ───────────────────────────────────────────────────────────────────

export const LoginHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  height: 56px;
  padding: ${({ theme }) => theme.spacing.md} 18px 0;
  display: flex;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: static;
    height: auto;
    padding: 0 0 ${({ theme }) => theme.spacing.xxxl};
  }
`;

// ─── Hero block ───────────────────────────────────────────────────────────────

export const HeroBlock = styled.section`
  padding: ${({ theme }) => theme.spacing.xxxl} 0
    ${({ theme }) => theme.spacing.xxl};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 0 0 ${({ theme }) => theme.spacing.xxxl};
  }
`;

export const HeroEyebrowWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const HeroHeading = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  font-size: clamp(40px, 8vw, 56px);
  line-height: 0.92;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.textHi};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 44px;
  }
`;

export const HeroHighlight = styled.span`
  color: ${({ theme }) => theme.colors.blood};
`;

export const HeroSubtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: 13px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMid};
  max-width: 300px;
`;

// ─── Form ─────────────────────────────────────────────────────────────────────

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const FormFooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const ForgotLink = styled.button`
  background: transparent;
  border: none;
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.copper};
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

// ─── General error alert ──────────────────────────────────────────────────────

export const GeneralErrorBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.bloodTint};
  border: 1px solid rgba(180, 31, 48, 0.3);
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 12px 14px;
  animation: fadeInDown 0.2s ease;

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const GeneralErrorText = styled.p`
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.blood};
  line-height: 1.4;
`;

// ─── Page footer ──────────────────────────────────────────────────────────────

export const PageFooter = styled.footer`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border1};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FooterLeft = styled.span`
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textMid};
`;

export const FooterCreateLink = styled.button`
  background: transparent;
  border: none;
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textHi};
  cursor: pointer;
  padding: 0;
  margin-left: 4px;

  &:hover {
    text-decoration: underline;
  }
`;

export const SecurityBadge = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textLow};
`;
