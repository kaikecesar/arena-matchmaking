// Styles
import { breakpoints } from '@/styles/tokens/breakpoints'
import { colors } from '@/styles/tokens/colors'
import { radius } from '@/styles/tokens/radius'
import { shadows } from '@/styles/tokens/shadows'
import { spacing } from '@/styles/tokens/spacing'
import { transitions } from '@/styles/tokens/transitions'
import {
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
} from '@/styles/tokens/typography'
import { zIndex } from '@/styles/tokens/zIndex'

type MediaQueries<T extends Record<string, string>> = {
  up: Record<keyof T, string>
  down: Record<keyof T, string>
}

const createMedia = <T extends Record<string, string>>(values: T): MediaQueries<T> => ({
  // Required: Object.fromEntries erases keyof T; breakpoints keys are fixed at compile time.
  up: Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, `@media (min-width: ${value})`])
  ) as Record<keyof T, string>,
  down: Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, `@media (max-width: ${value})`])
  ) as Record<keyof T, string>,
})

export const theme = {
  colors,
  fonts,
  fontWeights,
  fontSizes,
  lineHeights,
  radius,
  shadows,
  spacing,
  transitions,
  breakpoints,
  zIndex,
  media: createMedia(breakpoints),
} as const

export type Theme = typeof theme
