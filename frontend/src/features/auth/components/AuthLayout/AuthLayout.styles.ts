// Libraries
import styled, { css, keyframes, type Keyframes } from 'styled-components'

import type { Theme } from '@/styles/theme'

import type {
  CardStyledProps,
  RoleCardButtonStyledProps,
  StepItemStyledProps,
  StepLabelStyledProps,
  StrengthFillStyledProps,
} from './AuthLayout.styles.types'

/* *************************************************************************************************
******************************************** KEYFRAMES *********************************************
************************************************************************************************* */
const createCardEnter = (theme: Theme): Keyframes => keyframes`
  from {
    opacity: ${theme.opacity.none};
    transform: translateY(${theme.motion.offset.lg});
  }
  to {
    opacity: ${theme.opacity.full};
    transform: translateY(0);
  }
`

const createFadeInDown = (theme: Theme): Keyframes => keyframes`
  from {
    opacity: ${theme.opacity.none};
    transform: translateY(-${theme.motion.offset.sm});
  }
  to {
    opacity: ${theme.opacity.full};
    transform: translateY(0);
  }
`

const createFadeIn = (theme: Theme): Keyframes => keyframes`
  from {
    opacity: ${theme.opacity.none};
  }
  to {
    opacity: ${theme.opacity.full};
  }
`

const createStepEnter = (theme: Theme): Keyframes => keyframes`
  from {
    opacity: ${theme.opacity.none};
    transform: translateX(${theme.motion.offset.lg});
  }
  to {
    opacity: ${theme.opacity.full};
    transform: translateX(0);
  }
`

const createBootPulse = (theme: Theme): Keyframes => keyframes`
  0%, 100% {
    opacity: ${theme.opacity.bootMin};
    transform: scale(${theme.motion.scale.bootMin});
  }
  50% {
    opacity: ${theme.opacity.full};
    transform: scale(1);
  }
`

/* *************************************************************************************************
******************************************* LAYOUT SHELL *******************************************
************************************************************************************************* */
export const PageShell = styled.div`
  height: 100dvh;
  height: 100svh;
  background: ${({ theme }) => theme.colors.bgApp};
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  ${({ theme }) => theme.media.up.md} {
    align-items: center;
    justify-content: flex-start;
    padding:
      calc(${({ theme }) => theme.layout.pageInsetY} + ${({ theme }) => theme.layout.safeTop})
      max(
        ${({ theme }) => theme.layout.pageInsetX},
        ${({ theme }) => theme.layout.safeRight}
      )
      calc(${({ theme }) => theme.layout.pageInsetY} + ${({ theme }) => theme.layout.safeBottom})
      max(
        ${({ theme }) => theme.layout.pageInsetX},
        ${({ theme }) => theme.layout.safeLeft}
      );
  }

  ${({ theme }) => theme.media.up.lg} {
    padding: ${({ theme }) => theme.layout.authShellPaddingMd};
  }

  ${({ theme }) => theme.media.up.xl} {
    display: grid;
    grid-template-columns: ${({ theme }) => theme.layout.authSplitPrimaryMin}
      ${({ theme }) => theme.layout.authSplitContextMin};
    column-gap: ${({ theme }) => theme.layout.authSplitGap};
    align-items: stretch;
    justify-content: stretch;
    padding: 0;
    overflow: hidden;
  }
`

export const PrimaryColumn = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  min-width: 0;

  ${({ theme }) => theme.media.up.xl} {
    flex: none;
    height: 100dvh;
    height: 100svh;
    align-items: center;
    justify-content: center;
    padding:
      calc(${({ theme }) => theme.layout.safeTop} + ${({ theme }) => theme.spacing.lg})
      ${({ theme }) => theme.layout.authPrimaryPaddingXl}
      calc(${({ theme }) => theme.layout.safeBottom} + ${({ theme }) => theme.spacing.lg})
      ${({ theme }) => theme.layout.authPrimaryPaddingXl};
    background: ${({ theme }) => theme.colors.bgApp};
    overflow: hidden;
  }
`

export const AtmosphereGlow = styled.div`
  position: absolute;
  pointer-events: none;
  border-radius: ${({ theme }) => theme.radius.round};
`

export const GlowBlood = styled(AtmosphereGlow)`
  top: -${({ theme }) => theme.sizes.atmosphereOffsetLg};
  right: -${({ theme }) => theme.sizes.atmosphereOffsetMd};
  width: ${({ theme }) => theme.sizes.atmosphereBlood};
  height: ${({ theme }) => theme.sizes.atmosphereBlood};
  background: ${({ theme }) => theme.gradients.glowBlood};

  ${({ theme }) => theme.media.up.lg} {
    right: ${({ theme }) => theme.layout.atmosphereBloodRightLg};
    top: -${({ theme }) => theme.sizes.atmosphereTopLg};
  }

  ${({ theme }) => theme.media.up.xl} {
    right: ${({ theme }) => theme.layout.atmosphereBloodRightXl};
    top: 8%;
    width: ${({ theme }) => theme.sizes.atmosphereBloodMd};
    height: ${({ theme }) => theme.sizes.atmosphereBloodMd};
  }
`

export const GlowCopper = styled(AtmosphereGlow)`
  bottom: -${({ theme }) => theme.sizes.atmosphereOffsetLg};
  left: -${({ theme }) => theme.sizes.atmosphereOffsetMd};
  width: ${({ theme }) => theme.sizes.atmosphereCopper};
  height: ${({ theme }) => theme.sizes.atmosphereCopper};
  background: ${({ theme }) => theme.gradients.glowCopper};

  ${({ theme }) => theme.media.up.lg} {
    left: ${({ theme }) => theme.layout.atmosphereCopperLeftLg};
    bottom: -${({ theme }) => theme.sizes.atmosphereOffsetSm};
  }

  ${({ theme }) => theme.media.up.xl} {
    left: ${({ theme }) => theme.layout.atmosphereCopperLeftXl};
    bottom: 12%;
    opacity: ${({ theme }) => theme.opacity.eyebrow};
  }
`

/* *************************************************************************************************
****************************************** CARD & HEADER *******************************************
************************************************************************************************* */
export const Card = styled.div<CardStyledProps>`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.base};
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding:
    calc(${({ theme }) => theme.layout.safeTop} + ${({ theme }) => theme.spacing.sm})
    max(
      ${({ theme }) => theme.layout.pageInsetX},
      ${({ theme }) => theme.layout.safeRight}
    )
    calc(${({ theme }) => theme.layout.safeBottom} + ${({ theme }) => theme.spacing.xl})
    max(
      ${({ theme }) => theme.layout.pageInsetX},
      ${({ theme }) => theme.layout.safeLeft}
    );
  animation: ${({ theme }) => createCardEnter(theme)}
    ${({ theme }) => theme.motion.durations.card}
    ${({ theme }) => theme.transitions.premium} both;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: max(
      ${({ theme }) => theme.layout.pageInsetX},
      ${({ theme }) => theme.layout.safeLeft}
    );
    right: max(
      ${({ theme }) => theme.layout.pageInsetX},
      ${({ theme }) => theme.layout.safeRight}
    );
    height: ${({ theme }) => theme.borders.hairline};
    background: ${({ theme }) => theme.gradients.cardTopLine};
    opacity: ${({ theme }) => theme.opacity.none};
  }

  ${({ theme }) => theme.media.up.md} {
    flex: none;
    width: 100%;
    max-width: ${({ $wide, theme }) =>
      $wide
        ? `min(${theme.layout.authCardWideMaxMd}, 100%)`
        : `min(${theme.layout.authCardMaxMd}, 100%)`};
    margin: ${({ theme }) => theme.layout.sectionGap} auto;
    padding: ${({ theme }) => theme.layout.authCardPaddingMd};
    padding-top: calc(
      ${({ theme }) => theme.layout.authCardPaddingMd} + ${({ theme }) => theme.layout.safeTop}
    );
    padding-bottom: calc(
      ${({ theme }) => theme.layout.authCardPaddingMd} + ${({ theme }) => theme.layout.safeBottom}
    );
    background: ${({ theme }) => theme.colors.surf1};
    border: ${({ theme }) => theme.borders.hairline} solid
      ${({ theme }) => theme.colors.overlayLine};
    border-radius: ${({ theme }) => theme.radius.xl};
    box-shadow: ${({ theme }) => theme.shadows.pop};

    &::before {
      opacity: ${({ theme }) => theme.opacity.full};
      left: ${({ theme }) => theme.layout.authCardLineInset};
      right: ${({ theme }) => theme.layout.authCardLineInset};
    }
  }

  ${({ theme }) => theme.media.up.lg} {
    max-width: ${({ $wide, theme }) =>
      $wide
        ? `min(${theme.layout.authCardWideMaxLg}, 100%)`
        : `min(${theme.layout.authCardMaxLg}, 100%)`};
    margin-top: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }

  ${({ theme }) => theme.media.up.xl} {
    width: 100%;
    max-width: ${({ $wide, theme }) =>
      $wide
        ? theme.layout.authCardWideMaxXl
        : theme.layout.authCardMaxXl};
    margin: 0 auto;
    padding: ${({ theme }) => theme.layout.authCardPaddingXl};
    padding-bottom: calc(
      ${({ theme }) => theme.spacing.xxxl} + ${({ theme }) => theme.layout.safeBottom}
    );

    &::before {
      left: ${({ theme }) => theme.layout.authCardLineInsetLg};
      right: ${({ theme }) => theme.layout.authCardLineInsetLg};
    }
  }
`

export const LoginHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  min-height: ${({ theme }) => theme.layout.touchTarget};
  margin: 0 calc(
      -1 * max(
        ${({ theme }) => theme.layout.pageInsetX},
        ${({ theme }) => theme.layout.safeLeft}
      )
    )
    ${({ theme }) => theme.spacing.sm};
  padding:
    ${({ theme }) => theme.spacing.sm}
    max(${({ theme }) => theme.layout.pageInsetX}, ${({ theme }) => theme.layout.safeRight})
    ${({ theme }) => theme.spacing.sm}
    max(${({ theme }) => theme.layout.pageInsetX}, ${({ theme }) => theme.layout.safeLeft});
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.headerScrim};
  backdrop-filter: ${({ theme }) => theme.effects.headerBlur};
  border-bottom: ${({ theme }) => theme.borders.hairline} solid
    ${({ theme }) => theme.colors.border1};

  & > div {
    gap: ${({ theme }) => theme.spacing.ten};
  }

  ${({ theme }) => theme.media.up.md} {
    margin: 0 0 ${({ theme }) => theme.spacing.lg};
    padding: 0;
    background: transparent;
    backdrop-filter: none;
    border-bottom: none;
  }

  ${({ theme }) => theme.media.up.xl} {
    position: static;
    min-height: auto;
    padding: 0 0 ${({ theme }) => theme.spacing.xl};
  }
`

/* *************************************************************************************************
*********************************************** HERO ***********************************************
************************************************************************************************* */
export const HeroBlock = styled.section`
  padding: ${({ theme }) => theme.spacing.md} 0 ${({ theme }) => theme.spacing.md};

  ${({ theme }) => theme.media.up.md} {
    padding: ${({ theme }) => theme.spacing.lg} 0 ${({ theme }) => theme.spacing.md};
  }

  ${({ theme }) => theme.media.up.xl} {
    padding: 0 0 ${({ theme }) => theme.spacing.xl};
  }
`

export const HeroEyebrowWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  span {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    letter-spacing: ${({ theme }) => theme.letterSpacing.eyebrowWide};
    opacity: ${({ theme }) => theme.opacity.eyebrow};
  }
`

export const HeroHeading = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizesFluid.authHero};
  line-height: ${({ theme }) => theme.lineHeights.heading};
  letter-spacing: ${({ theme }) => theme.letterSpacing.tight};
  color: ${({ theme }) => theme.colors.textHi};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  text-wrap: balance;
  max-width: 11ch;

  ${({ theme }) => theme.media.up.sm} {
    max-width: 13ch;
  }

  ${({ theme }) => theme.media.up.md} {
    font-size: ${({ theme }) => theme.fontSizesFluid.authHeroMd};
    max-width: 14ch;
  }

  ${({ theme }) => theme.media.up.lg} {
    font-size: ${({ theme }) => theme.fontSizesFluid.authHeroMd};
    max-width: 15ch;
  }

  ${({ theme }) => theme.media.up.xl} {
    font-size: ${({ theme }) => theme.fontSizes.heroLg};
    max-width: none;
  }
`

export const HeroHighlight = styled.span`
  color: ${({ theme }) => theme.colors.blood};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`

export const HeroSubtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.ui};
  color: ${({ theme }) => theme.colors.textMid};
  max-width: 34ch;

  ${({ theme }) => theme.media.up.md} {
    max-width: 38ch;
  }
`

export const SectionLead = styled.p`
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textHi};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  line-height: ${({ theme }) => theme.lineHeights.ui};
`

export const SectionHint = styled.p`
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLow};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: ${({ theme }) => theme.lineHeights.ui};
`

export const FormStep = styled.div`
  animation: ${({ theme }) => createStepEnter(theme)}
    ${({ theme }) => theme.motion.durations.step}
    ${({ theme }) => theme.transitions.premium} both;
`

export const BackLinkRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.xs};
`

/* *************************************************************************************************
*********************************************** FORM ***********************************************
************************************************************************************************* */
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
  margin-top: ${({ theme }) => theme.spacing.xxs};

  ${({ theme }) => theme.media.down.sm} {
    flex-direction: column;
    align-items: stretch;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`

export const ForgotLink = styled.button`
  background: transparent;
  border: none;
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.copper};
  cursor: pointer;
  min-height: ${({ theme }) => theme.layout.touchTarget};
  padding: 0 ${({ theme }) => theme.spacing.xs};
  margin-right: calc(-1 * ${({ theme }) => theme.spacing.xs});
  transition: color ${({ theme }) => theme.transitions.normal};

  ${({ theme }) => theme.media.down.sm} {
    align-self: flex-end;
    margin-right: 0;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.textHi};
  }

  &:focus-visible {
    outline: ${({ theme }) => theme.shadows.focusOutlineSoft};
    outline-offset: ${({ theme }) => theme.spacing.xs};
    border-radius: ${({ theme }) => theme.radius.focus};
  }
`

export const GeneralErrorBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.bloodTint};
  border: ${({ theme }) => theme.borders.hairline} solid
    ${({ theme }) => theme.colors.bloodSoftBorder};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: ${({ theme }) => theme.spacing.eleven}
    ${({ theme }) => theme.spacing.thirteen};
  animation: ${({ theme }) => createFadeInDown(theme)}
    ${({ theme }) => theme.motion.durations.fadeDown}
    ${({ theme }) => theme.transitions.premium} both;
`

export const GeneralErrorText = styled.p`
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.errorSoft};
  line-height: ${({ theme }) => theme.lineHeights.ui};
`

/* *************************************************************************************************
********************************************** FOOTER **********************************************
************************************************************************************************* */
export const PageFooter = styled.footer`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: ${({ theme }) => theme.borders.hairline} solid
    ${({ theme }) => theme.colors.border1};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  ${({ theme }) => theme.media.down.sm} {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const FooterLeft = styled.span`
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: ${({ theme }) => theme.fontSizes.caption};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textMid};
`

export const FooterCreateLink = styled.button`
  background: transparent;
  border: none;
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: ${({ theme }) => theme.fontSizes.caption};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textHi};
  cursor: pointer;
  padding: 0;
  margin-left: ${({ theme }) => theme.spacing.xs};
  transition: color ${({ theme }) => theme.transitions.normal};

  &:hover {
    color: ${({ theme }) => theme.colors.blood};
  }

  &:focus-visible {
    outline: ${({ theme }) => theme.shadows.focusOutlineSoft};
    outline-offset: ${({ theme }) => theme.spacing.xs};
    border-radius: ${({ theme }) => theme.radius.focus};
  }
`

export const SecurityBadge = styled.span`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  padding: ${({ theme }) => theme.spacing.five}
    ${({ theme }) => theme.spacing.ten};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.overlaySurface};
  border: ${({ theme }) => theme.borders.hairline} solid
    ${({ theme }) => theme.colors.border1};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  letter-spacing: ${({ theme }) => theme.letterSpacing.security};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textLow};
  white-space: nowrap;
`

/* *************************************************************************************************
******************************************** ONBOARDING ********************************************
************************************************************************************************* */
export const StepIndicatorRow = styled.ol`
  display: flex;
  gap: ${({ theme }) => theme.spacing.ten};
  list-style: none;
  margin: 0 0 ${({ theme }) => theme.spacing.twentyTwo};
  padding: 0;
`

export const StepItem = styled.li<StepItemStyledProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.six};

  &::before {
    content: '';
    display: block;
    height: ${({ theme }) => theme.borders.step};
    border-radius: ${({ theme }) => theme.radius.pill};
    background: ${({ theme, $active, $done }) =>
      $active || $done
        ? theme.colors.blood
        : theme.colors.border1};
    opacity: ${({ theme, $done, $active }) =>
      $done && !$active
        ? theme.opacity.stepDone
        : theme.opacity.full};
    transition: background ${({ theme }) => theme.transitions.normal};
  }
`

export const StepLabel = styled.span<StepLabelStyledProps>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xxs};
  letter-spacing: ${({ theme }) => theme.letterSpacing.caps};
  text-transform: uppercase;
  color: ${({ theme, $active }) =>
    $active
      ? theme.colors.textMid
      : theme.colors.textLow};
`

/* *************************************************************************************************
****************************************** ROLE SELECTION ******************************************
************************************************************************************************* */
export const RoleGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const RoleCardButton = styled.button<RoleCardButtonStyledProps>`
  text-align: left;
  min-height: ${({ theme }) => theme.layout.touchTarget};
  padding: ${({ theme }) => theme.spacing.fourteen}
    ${({ theme }) => theme.spacing.lg}
    ${({ theme }) => theme.spacing.fourteen}
    ${({ theme }) => theme.spacing.eighteen};
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  position: relative;
  width: 100%;
  transition:
    border-color ${({ theme }) => theme.transitions.normal},
    background ${({ theme }) => theme.transitions.normal},
    transform ${({ theme }) => theme.transitions.fast};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: ${({ theme }) => theme.spacing.ten};
    bottom: ${({ theme }) => theme.spacing.ten};
    width: ${({ theme }) => theme.sizes.roleAccent};
    border-radius: ${({ theme }) => theme.radius.roleAccent};
    background: transparent;
    transition: background ${({ theme }) => theme.transitions.normal};
  }

  ${({ theme, $selected }) =>
    $selected
      ? css`
          background: ${theme.colors.bloodTint};
          border: ${theme.borders.hairline} solid ${theme.colors.bloodBorderSelected};

          &::before {
            background: ${theme.colors.blood};
          }
        `
      : css`
          background: ${theme.colors.surf3};
          border: ${theme.borders.hairline} solid ${theme.colors.border1};

          &:hover {
            border-color: ${theme.colors.border2};
            transform: translateX(${theme.motion.offset.hairline});
          }
        `}
`

export const RoleCardTitle = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textHi};
  margin-bottom: ${({ theme }) => theme.spacing.xxxs};
`

export const RoleCardDescription = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.ui};
  color: ${({ theme }) => theme.colors.textMid};
`

export const FormActions = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};

  & > * {
    flex: 1;
    width: 100%;
  }

  ${({ theme }) => theme.media.up.sm} {
    flex-direction: row;

    & > * {
      width: auto;
    }
  }
`

/* *************************************************************************************************
********************************************* SUCCESS **********************************************
************************************************************************************************* */
export const SuccessPanel = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl} 0;
  animation: ${({ theme }) => createFadeIn(theme)}
    ${({ theme }) => theme.motion.durations.fade}
    ${({ theme }) => theme.transitions.premium} both;
`

export const SuccessTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textHi};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

export const SuccessSubtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.success};
  color: ${({ theme }) => theme.colors.textMid};
`

/* *************************************************************************************************
**************************************** REVIEW & STRENGTH *****************************************
************************************************************************************************* */
export const ReviewList = styled.dl`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surf3};
  border: ${({ theme }) => theme.borders.hairline} solid
    ${({ theme }) => theme.colors.border1};
`

export const ReviewRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
`

export const ReviewLabel = styled.dt`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacing.review};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textLow};
`

export const ReviewValue = styled.dd`
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: ${({ theme }) => theme.fontSizes.caption};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textHi};
  text-align: right;
`

export const StrengthTrack = styled.div`
  height: ${({ theme }) => theme.sizes.strengthBar};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.border1};
  overflow: hidden;
  margin-top: ${({ theme }) => theme.spacing.sm};
`

export const StrengthFill = styled.div<StrengthFillStyledProps>`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  border-radius: inherit;
  background: ${({ theme }) => theme.gradients.strengthFill};
  transition: width ${({ theme }) => theme.transitions.premium};
`

export const StrengthLabel = styled.span`
  display: block;
  margin-top: ${({ theme }) => theme.spacing.six};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacing.security};
  color: ${({ theme }) => theme.colors.textLow};
`

/* *************************************************************************************************
******************************************** BOOTSTRAP *********************************************
************************************************************************************************* */
export const AuthBootstrap = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.bgApp};
  color: ${({ theme }) => theme.colors.textLow};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.error};
  letter-spacing: ${({ theme }) => theme.letterSpacing.caps};
  text-transform: uppercase;

  &::before {
    content: '';
    width: ${({ theme }) => theme.sizes.bootDot};
    height: ${({ theme }) => theme.sizes.bootDot};
    border-radius: ${({ theme }) => theme.radius.round};
    background: ${({ theme }) => theme.colors.blood};
    animation: ${({ theme }) => createBootPulse(theme)}
      ${({ theme }) => theme.motion.durations.bootPulse} ease-in-out infinite;
  }
`
