import styled, { css, keyframes } from 'styled-components'

const cardEnter = keyframes`
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

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
    padding: ${({ theme }) => theme.spacing.lg};
  }
`

export const AtmosphereGlow = styled.div`
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
`

export const GlowBlood = styled(AtmosphereGlow)`
  top: -140px;
  right: -160px;
  width: 420px;
  height: 420px;
  background: radial-gradient(
    circle,
    rgba(210, 38, 56, 0.14) 0%,
    rgba(210, 38, 56, 0.05) 42%,
    transparent 68%
  );
`

export const GlowCopper = styled(AtmosphereGlow)`
  bottom: -140px;
  left: -100px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(216, 161, 104, 0.08) 0%, transparent 68%);
`

export const Card = styled.div<{ $wide?: boolean }>`
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  animation: ${cardEnter} 0.55s ${({ theme }) => theme.transitions.premium} both;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: ${({ $wide }) => ($wide ? '480px' : '440px')};
    padding: 40px 44px 36px;
    background: ${({ theme }) => theme.colors.surf1};
    border: 1px solid rgba(255, 255, 255, 0.04);
    border-radius: ${({ theme }) => theme.radius.xl};
    box-shadow: ${({ theme }) => theme.shadows.pop};
  }
`

export const LoginHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  height: 52px;
  padding: ${({ theme }) => theme.spacing.sm} 0 0;
  display: flex;
  align-items: center;

  & > div {
    gap: 10px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: static;
    height: auto;
    padding: 0 0 ${({ theme }) => theme.spacing.xl};
  }
`

export const HeroBlock = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} 0 ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 0 0 ${({ theme }) => theme.spacing.lg};
  }
`

export const HeroEyebrowWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  span {
    font-size: 10px;
    letter-spacing: 0.16em;
    opacity: 0.92;
  }
`

export const HeroHeading = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: clamp(34px, 7vw, 46px);
  line-height: 1.1;
  letter-spacing: -0.012em;
  color: ${({ theme }) => theme.colors.textHi};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-wrap: balance;
  max-width: 11.5em;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 42px;
    max-width: 12em;
  }
`

export const HeroHighlight = styled.span`
  color: ${({ theme }) => theme.colors.blood};
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
`

export const HeroSubtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: 14px;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMid};
  max-width: 36ch;
`

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const FormFooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: 2px;
`

export const ForgotLink = styled.button`
  background: transparent;
  border: none;
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.copper};
  cursor: pointer;
  padding: 0;
  transition: color ${({ theme }) => theme.transitions.normal};

  &:hover {
    color: ${({ theme }) => theme.colors.textHi};
  }
`

export const GeneralErrorBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.bloodTint};
  border: 1px solid rgba(180, 31, 48, 0.28);
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 11px 13px;
  animation: ${fadeInDown} 0.28s ${({ theme }) => theme.transitions.premium} both;
`

export const GeneralErrorText = styled.p`
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.blood};
  line-height: 1.45;
`

export const PageFooter = styled.footer`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border1};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

export const FooterLeft = styled.span`
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textMid};
`

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
  transition: color ${({ theme }) => theme.transitions.normal};

  &:hover {
    color: ${({ theme }) => theme.colors.blood};
  }
`

export const SecurityBadge = styled.span`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  padding: 5px 10px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid ${({ theme }) => theme.colors.border1};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textLow};
  white-space: nowrap;
`

export const StepIndicatorRow = styled.ol`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  list-style: none;
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  padding: 0;
`

export const StepItem = styled.li<{ $active: boolean; $done: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;

  &::before {
    content: '';
    display: block;
    height: 3px;
    border-radius: 999px;
    background: ${({ theme, $active, $done }) =>
      $active || $done ? theme.colors.blood : theme.colors.border1};
    opacity: ${({ $done, $active }) => ($done && !$active ? 0.55 : 1)};
    transition: background ${({ theme }) => theme.transitions.normal};
  }
`

export const StepLabel = styled.span<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 9px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme, $active }) => ($active ? theme.colors.textMid : theme.colors.textLow)};
`

export const RoleGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const RoleCardButton = styled.button<{ $selected: boolean }>`
  text-align: left;
  padding: 14px 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  transition:
    border-color ${({ theme }) => theme.transitions.normal},
    background ${({ theme }) => theme.transitions.normal},
    box-shadow ${({ theme }) => theme.transitions.normal};

  ${({ theme, $selected }) =>
    $selected
      ? css`
          background: ${theme.colors.bloodTint};
          border: 1px solid rgba(210, 38, 56, 0.45);
          box-shadow: 0 0 0 1px rgba(210, 38, 56, 0.15);
        `
      : css`
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, transparent 100%),
            ${theme.colors.surf3};
          border: 1px solid ${theme.colors.border1};

          &:hover {
            border-color: ${theme.colors.border2};
          }
        `}
`

export const RoleCardTitle = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 15px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.textHi};
  margin-bottom: 4px;
`

export const RoleCardDescription = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: 12px;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.textMid};
`

export const FormActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};

  & > * {
    flex: 1;
  }
`

export const SuccessPanel = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl} 0;
  animation: ${fadeIn} 0.45s ${({ theme }) => theme.transitions.premium} both;
`

export const SuccessTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 24px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.textHi};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

export const SuccessSubtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textMid};
`

export const ReviewList = styled.dl`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surf3};
  border: 1px solid ${({ theme }) => theme.colors.border1};
`

export const ReviewRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
`

export const ReviewLabel = styled.dt`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textLow};
`

export const ReviewValue = styled.dd`
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textHi};
  text-align: right;
`

export const StrengthTrack = styled.div`
  height: 4px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.border1};
  overflow: hidden;
  margin-top: 8px;
`

export const StrengthFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  border-radius: inherit;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.bloodSoft}, ${({ theme }) => theme.colors.blood});
  transition: width ${({ theme }) => theme.transitions.premium};
`

export const StrengthLabel = styled.span`
  display: block;
  margin-top: 6px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.textLow};
`

export const AuthBootstrap = styled.div`
  min-height: 100dvh;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.bgApp};
  color: ${({ theme }) => theme.colors.textLow};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
`
