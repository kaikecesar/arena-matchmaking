import { colors } from '@/styles/tokens/colors'

export const shadows = {
  card: `0 1px 0 ${colors.overlaySubtle} inset, 0 4px 14px rgba(0,0,0,0.24)`,
  pop: `0 1px 0 ${colors.overlayLine} inset, 0 12px 28px -12px rgba(0,0,0,0.38)`,
  focus: `0 0 0 3px rgba(210, 38, 56, 0.11)`,
  buttonBlood: `0 1px 0 ${colors.overlayInsetMedium} inset, 0 3px 10px rgba(210,38,56,0.14)`,
  buttonBloodHover: [
    `0 1px 0 ${colors.overlayInsetStrong} inset,`,
    '0 4px 14px rgba(210, 38, 56, 0.16)',
  ].join(' '),
  buttonBloodActive: [
    `0 1px 0 ${colors.overlayInsetMedium} inset,`,
    '0 4px 12px rgba(210, 38, 56, 0.2)',
  ].join(' '),
  tileLift: '0 2px 8px rgba(0,0,0,0.18)',
  inputDefault: `inset 0 1px 0 ${colors.overlayMuted}, 0 1px 2px rgba(0,0,0,0.16)`,
  inputHover: `inset 0 1px 0 ${colors.overlayHover}, 0 2px 6px rgba(0, 0, 0, 0.2)`,
  inputErrorFocus: `inset 0 1px 0 ${colors.overlayMuted}, 0 0 0 3px rgba(210, 38, 56, 0.11)`,
  inputFocus: `inset 0 1px 0 ${colors.overlayInset}, 0 0 0 3px rgba(210, 38, 56, 0.11)`,
  brandMark: `0 0 0 1px ${colors.overlayRing} inset, 0 2px 6px rgba(210, 38, 56, 0.12)`,
  checkboxChecked: '0 1px 4px rgba(210, 38, 56, 0.2)',
  checkboxUnchecked: `inset 0 1px 0 ${colors.overlayMuted}`,
  focusOutline: `2px solid ${colors.bloodOutlineStrong}`,
  focusOutlineSoft: `2px solid ${colors.bloodOutline}`,
  glow: {
    successDot: '0 0 4px rgba(74, 222, 128, 0.35)',
  },
} as const
