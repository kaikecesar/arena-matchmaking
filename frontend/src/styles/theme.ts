import { breakpoints } from './tokens/breakpoints';
import { colors } from './tokens/colors';
import { fontSizes, fontWeights, fonts, lineHeights } from './tokens/typography';
import { radius } from './tokens/radius';
import { shadows } from './tokens/shadows';
import { spacing } from './tokens/spacing';
import { transitions } from './tokens/transitions';
import { zIndex } from './tokens/zIndex';

const createMedia = <T extends Record<string, string>>(values: T) => ({
  up: Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, `@media (min-width: ${value})`]),
  ) as Record<keyof T, string>,
  down: Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, `@media (max-width: ${value})`]),
  ) as Record<keyof T, string>,
});

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
} as const;

export type Theme = typeof theme;
