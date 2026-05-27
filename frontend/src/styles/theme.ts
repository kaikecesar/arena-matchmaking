// Style
import { breakpoints } from '@/styles/tokens/breakpoints';
import { borders } from '@/styles/tokens/borders';
import { colors } from '@/styles/tokens/colors';
import { effects } from '@/styles/tokens/effects';
import { gradients } from '@/styles/tokens/gradients';
import { layout } from '@/styles/tokens/layout';
import { motion } from '@/styles/tokens/motion';
import { opacity } from '@/styles/tokens/opacity';
import { radius } from '@/styles/tokens/radius';
import { shadows } from '@/styles/tokens/shadows';
import { sizes } from '@/styles/tokens/sizes';
import { spacing } from '@/styles/tokens/spacing';
import { transitions } from '@/styles/tokens/transitions';
import {
  fonts,
  fontSizes,
  fontSizesFluid,
  fontWeights,
  letterSpacing,
  lineHeights,
} from '@/styles/tokens/typography';
import { zIndex } from '@/styles/tokens/zIndex';

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
});

export const theme = {
  colors,
  opacity,
  fonts,
  fontWeights,
  fontSizes,
  fontSizesFluid,
  letterSpacing,
  lineHeights,
  radius,
  borders,
  shadows,
  spacing,
  sizes,
  layout,
  gradients,
  effects,
  motion,
  transitions,
  breakpoints,
  zIndex,
  media: createMedia(breakpoints),
} as const;

export type Theme = typeof theme
