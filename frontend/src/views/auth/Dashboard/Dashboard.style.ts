// Libraries
import styled, { keyframes, type Keyframes } from 'styled-components'

import type { Theme } from '@/styles/theme'

/* ************** KEYFRAMES ******************* */
const createPanelEnter = (theme: Theme): Keyframes => keyframes`
  from {
    opacity: ${theme.opacity.none};
    transform: translateY(${theme.motion.offset.md});
  }
  to {
    opacity: ${theme.opacity.full};
    transform: translateY(0);
  }
`

/* ************** SHELL ******************* */
export const DashboardShell = styled.div`
  position: relative;
  min-height: 100dvh;
  min-height: 100svh;
  background: ${({ theme }) => theme.colors.bgApp};
  padding:
    calc(${({ theme }) => theme.layout.safeTop} + ${({ theme }) => theme.layout.pageInsetY})
    max(${({ theme }) => theme.layout.pageInsetX}, ${({ theme }) => theme.layout.safeRight})
    calc(${({ theme }) => theme.layout.safeBottom} + ${({ theme }) => theme.layout.pageInsetY})
    max(${({ theme }) => theme.layout.pageInsetX}, ${({ theme }) => theme.layout.safeLeft});
  overflow-x: hidden;

  ${({ theme }) => theme.media.up.md} {
    padding:
      calc(
        ${({ theme }) => theme.layout.safeTop} +
          ${({ theme }) => theme.layout.dashboardPaddingMd}
      )
      max(
        ${({ theme }) => theme.layout.pageInsetX},
        ${({ theme }) => theme.layout.safeRight}
      )
      calc(
        ${({ theme }) => theme.layout.safeBottom} +
          ${({ theme }) => theme.layout.dashboardPaddingMd}
      )
      max(
        ${({ theme }) => theme.layout.pageInsetX},
        ${({ theme }) => theme.layout.safeLeft}
      );
  }

  ${({ theme }) => theme.media.up.lg} {
    padding:
      calc(
        ${({ theme }) => theme.layout.safeTop} +
          ${({ theme }) => theme.layout.dashboardPaddingTopLg}
      )
      ${({ theme }) => theme.layout.dashboardPaddingLg}
      calc(
        ${({ theme }) => theme.layout.safeBottom} +
          ${({ theme }) => theme.layout.dashboardPaddingTopLg}
      )
      ${({ theme }) => theme.layout.dashboardPaddingLg};
  }

  ${({ theme }) => theme.media.up.xxl} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

export const DashboardViewport = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.base};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.dashboardContentMax};

  ${({ theme }) => theme.media.up.lg} {
    max-width: ${({ theme }) => theme.layout.dashboardContentWide};
  }

  ${({ theme }) => theme.media.up.xxl} {
    max-width: ${({ theme }) => theme.layout.appShellMax};
  }
`

export const DashboardGlow = styled.div`
  position: absolute;
  pointer-events: none;
  top: -${({ theme }) => theme.sizes.atmosphereTopLg};
  right: -${({ theme }) => theme.spacing.xxxxl};
  width: ${({ theme }) => theme.sizes.atmosphereBloodMd};
  height: ${({ theme }) => theme.sizes.atmosphereBloodMd};
  border-radius: ${({ theme }) => theme.radius.round};
  background: ${({ theme }) => theme.gradients.glowBloodSoft};
`

export const DashboardHeader = styled.header`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.layout.dashboardHeaderGap};
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: ${({ theme }) => theme.borders.hairline} solid
    ${({ theme }) => theme.colors.border1};

  & > button {
    flex-shrink: 0;
    min-height: ${({ theme }) => theme.layout.touchTarget};
  }

  ${({ theme }) => theme.media.up.md} {
    flex-wrap: nowrap;
    gap: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.layout.dashboardHeaderGapMd};
  }
`

export const DashboardHeaderStart = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  min-width: 0;
`

export const DashboardOperator = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.six} ${({ theme }) => theme.spacing.ten};
  padding-left: ${({ theme }) => theme.spacing.xxs};
`

export const DashboardOperatorName = styled.span`
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textMid};
`

export const DashboardOperatorRole = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacing.wide};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.copper};
`

export const DashboardMain = styled.main`
  animation: ${({ theme }) => createPanelEnter(theme)}
    ${({ theme }) => theme.motion.durations.panel}
    ${({ theme }) => theme.transitions.premium} both;
`

export const DashboardTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizesFluid.dashboardTitle};
  text-wrap: balance;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.heading};
  letter-spacing: ${({ theme }) => theme.letterSpacing.tight};
  color: ${({ theme }) => theme.colors.textHi};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

export const DashboardSubtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.ui};
  color: ${({ theme }) => theme.colors.textMid};
  max-width: 46ch;
`

export const DashboardCard = styled.section`
  padding: ${({ theme }) => theme.layout.cardInset};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.gradients.dashboardCard},
    ${({ theme }) => theme.colors.surf1};
  border: ${({ theme }) => theme.borders.hairline} solid
    ${({ theme }) => theme.colors.overlayLine};
  box-shadow: ${({ theme }) => theme.shadows.card};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

/* ************** STATUS ******************* */
export const StatusStrip = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

export const StatusPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.five}
    ${({ theme }) => theme.spacing.eleven};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.successTint};
  border: ${({ theme }) => theme.borders.hairline} solid
    ${({ theme }) => theme.colors.successBorder};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacing.wide};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.success};

  &::before {
    content: '';
    width: ${({ theme }) => theme.sizes.statusDot};
    height: ${({ theme }) => theme.sizes.statusDot};
    border-radius: ${({ theme }) => theme.radius.round};
    background: currentColor;
    box-shadow: ${({ theme }) => theme.shadows.glow.successDot};
  }
`

export const StatusMeta = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacing.wide};
  color: ${({ theme }) => theme.colors.textLow};
  line-height: ${({ theme }) => theme.lineHeights.meta};
  max-width: 100%;
`

/* ************** MODULES ******************* */
export const ModulesHeading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacing.caps};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textLow};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

export const ModuleGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  grid-template-columns: 1fr;

  ${({ theme }) => theme.media.up.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    & > article:first-child {
      grid-column: 1 / -1;
    }
  }

  ${({ theme }) => theme.media.up.lg} {
    grid-template-columns: 1.15fr 1fr 1fr;

    & > article:first-child {
      grid-column: auto;
    }
  }
`

export const ModuleTile = styled.article`
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surf2};
  border: ${({ theme }) => theme.borders.hairline} solid
    ${({ theme }) => theme.colors.border1};
  transition:
    border-color ${({ theme }) => theme.transitions.normal},
    box-shadow ${({ theme }) => theme.transitions.normal},
    transform ${({ theme }) => theme.transitions.micro};

  &:first-child {
    background: ${({ theme }) => theme.gradients.moduleFeatured},
      ${({ theme }) => theme.colors.surf2};
    border-color: ${({ theme }) => theme.colors.bloodBorderSubtle};
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: ${({ theme }) => theme.colors.border2};
      box-shadow: ${({ theme }) => theme.shadows.tileLift};
      transform: translateY(-${({ theme }) => theme.motion.offset.hairline});
    }

    &:first-child:hover {
      border-color: ${({ theme }) => theme.colors.bloodBorderMedium};
    }
  }
`

export const ModuleLabel = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacing.wide};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textLow};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

export const ModuleValue = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizesFluid.moduleValue};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textHi};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  margin-bottom: ${({ theme }) => theme.spacing.six};
  font-variant-numeric: tabular-nums;
`

export const ModuleHint = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLow};
  line-height: ${({ theme }) => theme.lineHeights.ui};
`
