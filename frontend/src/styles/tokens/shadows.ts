import { colors } from '@/styles/tokens/colors'

export const shadows = {
  card: `0 1px 0 ${colors.overlaySubtle} inset, 0 4px 14px ${colors.shadowCard}`,
  pop: `0 1px 0 ${colors.overlayLine} inset, 0 12px 28px -12px ${colors.shadowPop}`,
  focus: `0 0 0 3px ${colors.bloodFocusRing}`,
  buttonBlood: `0 1px 0 ${colors.overlayInsetMedium} inset, 0 3px 10px ${colors.bloodBorderSubtle}`,
  buttonBloodHover: [
    `0 1px 0 ${colors.overlayInsetStrong} inset,`,
    `0 4px 14px ${colors.bloodShadowHover}`,
  ].join(' '),
  buttonBloodActive: [
    `0 1px 0 ${colors.overlayInsetMedium} inset,`,
    `0 4px 12px ${colors.bloodShadowActive}`,
  ].join(' '),
  tileLift: `0 2px 8px ${colors.shadowLight}`,
  inputDefault: `inset 0 1px 0 ${colors.overlayMuted}, 0 1px 2px ${colors.shadowFaint}`,
  inputHover: `inset 0 1px 0 ${colors.overlayHover}, 0 2px 6px ${colors.shadowMid}`,
  inputErrorFocus: [
    `inset 0 1px 0 ${colors.overlayMuted},`,
    `0 0 0 1px ${colors.bloodBorderMedium},`,
    `0 0 14px ${colors.bloodGlowAmbient}`,
  ].join(' '),
  inputFocus: [
    `inset 0 1px 0 ${colors.overlayInset},`,
    `0 0 0 1px ${colors.bloodBorderSubtle},`,
    `0 0 14px ${colors.bloodGlowAmbient}`,
  ].join(' '),
  brandMark: `0 0 0 1px ${colors.overlayRing} inset, 0 2px 6px ${colors.bloodShadowBrand}`,
  checkboxChecked: `0 1px 4px ${colors.bloodShadowActive}`,
  checkboxUnchecked: `inset 0 1px 0 ${colors.overlayMuted}`,
  focusOutline: `2px solid ${colors.bloodOutlineStrong}`,
  focusOutlineSoft: `2px solid ${colors.bloodOutline}`,
  glow: {
    successDot: `0 0 4px ${colors.successGlow}`,
  },
} as const
