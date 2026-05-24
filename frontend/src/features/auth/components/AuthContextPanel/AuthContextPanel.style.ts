// Libraries
import styled, { keyframes, type Keyframes } from 'styled-components'

import type { Theme } from '@/styles/theme'

/* *************************************************************************************************
******************************************** KEYFRAMES *********************************************
************************************************************************************************* */
const createContextEnter = (theme: Theme): Keyframes => keyframes`
  from {
    opacity: ${theme.opacity.none};
    transform: translateX(${theme.motion.offset.md});
  }
  to {
    opacity: ${theme.opacity.full};
    transform: translateX(0);
  }
`

/* *************************************************************************************************
*********************************************** SHELL **********************************************
************************************************************************************************* */
export const ContextShell = styled.aside`
  display: none;
  position: relative;
  min-height: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surf2};

  ${({ theme }) => theme.media.up.xl} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: ${({ theme }) => theme.layout.authContextPadding};
    border-left: ${({ theme }) => theme.borders.hairline} solid
      ${({ theme }) => theme.colors.border1};
    animation: ${({ theme }) => createContextEnter(theme)}
      ${({ theme }) => theme.motion.durations.panel}
      ${({ theme }) => theme.transitions.premium} both;
  }
`

export const ContextBackdrop = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: ${({ theme }) => theme.gradients.authContextSurface};
`

export const ContextGrid = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: ${({ theme }) => theme.opacity.eyebrow};
  background-image: ${({ theme }) => theme.gradients.gridLineH},
    ${({ theme }) => theme.gradients.gridLineV};
  background-size: ${({ theme }) => theme.spacing.xxxxl}
    ${({ theme }) => theme.spacing.xxxxl};
  mask-image: ${({ theme }) => theme.gradients.gridMask};
`

export const ContextGlow = styled.div`
  position: absolute;
  pointer-events: none;
  top: -${({ theme }) => theme.sizes.atmosphereTopLg};
  right: -${({ theme }) => theme.spacing.xxxl};
  width: ${({ theme }) => theme.sizes.atmosphereBloodMd};
  height: ${({ theme }) => theme.sizes.atmosphereBloodMd};
  border-radius: ${({ theme }) => theme.radius.round};
  background: ${({ theme }) => theme.gradients.authContextVignette},
    ${({ theme }) => theme.gradients.glowBloodSoft};
`

export const ContextInner = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.base};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.authContextInnerMax};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};

  ${({ theme }) => theme.media.up.xxl} {
    max-width: min(${({ theme }) => theme.layout.authContextInnerMax}, 80%);
  }
`

/* *************************************************************************************************
********************************************* STATUS ***********************************************
************************************************************************************************* */
export const ContextStatusStrip = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

export const ContextStatusPill = styled.span`
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

export const ContextStatusMeta = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacing.wide};
  color: ${({ theme }) => theme.colors.textLow};
`

export const ContextTelemetry = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  list-style: none;
  margin: 0;
  padding: 0;
  margin-left: auto;

  ${({ theme }) => theme.media.down.xxl} {
    margin-left: 0;
    width: 100%;
  }
`

export const ContextTelemetryItem = styled.li`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xxs};
  letter-spacing: ${({ theme }) => theme.letterSpacing.caps};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textLow};
  padding: ${({ theme }) => theme.spacing.five}
    ${({ theme }) => theme.spacing.nine};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.overlaySurface};
  border: ${({ theme }) => theme.borders.hairline} solid
    ${({ theme }) => theme.colors.border1};
`

/* *************************************************************************************************
********************************************** INTRO ***********************************************
************************************************************************************************* */
export const ContextIntro = styled.section`
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: ${({ theme }) => theme.borders.hairline} solid
    ${({ theme }) => theme.colors.border1};
`

export const ContextEyebrow = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacing.eyebrowWide};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.copper};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  opacity: ${({ theme }) => theme.opacity.eyebrow};
`

export const ContextTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizesFluid.dashboardTitle};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.heading};
  letter-spacing: ${({ theme }) => theme.letterSpacing.tight};
  color: ${({ theme }) => theme.colors.textHi};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  text-wrap: balance;
  max-width: 18ch;
`

export const ContextSubtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.ui};
  color: ${({ theme }) => theme.colors.textMid};
  max-width: 42ch;
`

/* *************************************************************************************************
********************************************** EVENT ***********************************************
************************************************************************************************* */
export const ContextEventCard = styled.article`
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.gradients.moduleFeatured},
    ${({ theme }) => theme.colors.surf1};
  border: ${({ theme }) => theme.borders.hairline} solid
    ${({ theme }) => theme.colors.bloodBorderSubtle};
  box-shadow: ${({ theme }) => theme.shadows.card};
`

export const ContextEventLabel = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacing.wide};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textLow};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

export const ContextEventName = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textHi};
  line-height: ${({ theme }) => theme.lineHeights.tight};
`

/* *************************************************************************************************
********************************************* MODULES **********************************************
************************************************************************************************* */
export const ContextModulesHeading = styled.h3`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacing.caps};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textLow};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

export const ContextModuleGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  grid-template-columns: repeat(3, minmax(0, 1fr));

  ${({ theme }) => theme.media.down.xxl} {
    grid-template-columns: 1fr;
  }
`

export const ContextModuleTile = styled.article`
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surf1};
  border: ${({ theme }) => theme.borders.hairline} solid
    ${({ theme }) => theme.colors.border1};
`

export const ContextModuleLabel = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacing.wide};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textLow};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

export const ContextModuleValue = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizesFluid.moduleValue};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.textHi};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  margin-bottom: ${({ theme }) => theme.spacing.six};
  font-variant-numeric: tabular-nums;
`

export const ContextModuleHint = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLow};
  line-height: ${({ theme }) => theme.lineHeights.ui};
`
