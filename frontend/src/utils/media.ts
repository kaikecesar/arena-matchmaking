/* =============================================================================
 * Media queries — breakpoints em rem (mobile-first), fora do tema de cores
 * ============================================================================= */

export const breakpoints = {
  sm: '30rem',
  md: '48rem',
  lg: '64rem',
  xl: '80rem',
  xxl: '96rem',
} as const;

type BreakpointKey = keyof typeof breakpoints;

type MediaQueries = {
  up: Record<BreakpointKey, string>
  down: Record<BreakpointKey, string>
};

const createMedia = (): MediaQueries => ({
  up: Object.fromEntries(
    Object.entries(breakpoints).map(([key, value]) => [
      key,
      `@media (min-width: ${value})`,
    ]),
  ) as Record<BreakpointKey, string>,
  down: Object.fromEntries(
    Object.entries(breakpoints).map(([key, value]) => [
      key,
      `@media (max-width: ${value})`,
    ]),
  ) as Record<BreakpointKey, string>,
});

export const media = createMedia();
