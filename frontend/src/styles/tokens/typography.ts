export const fonts = {
  display: "'Barlow Semi Condensed', sans-serif",
  ui: "'Manrope', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
} as const;

export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

export const fontSizes = {
  xxs: '9px',
  xs: '10px',
  sm: '12px',
  md: '14px',
  lg: '15px',
  xl: '18px',
  xxl: '22px',
  xxxl: '28px',
  display: '36px',
  input: '16px',
  inputDesktop: '15px',
  error: '11px',
  caption: '13px',
  heroLg: '31px',
} as const;

export const fontSizesFluid = {
  display: 'clamp(40px, 6vw, 56px)',
  dashboardTitle: 'clamp(22px, 5.5vw, 30px)',
  moduleValue: 'clamp(20px, 3vw, 22px)',
  authHero: 'clamp(26px, 7.5vw, 34px)',
  authHeroMd: 'clamp(28px, 5vw, 32px)',
} as const;

export const letterSpacing = {
  micro: '0.01em',
  tight: '-0.02em',
  normal: '0',
  wide: '0.04em',
  caps: '0.12em',
  display: '0.02em',
  label: '0.18em',
  eyebrowWide: '0.16em',
  wordmarkSub: '0.14em',
  security: '0.08em',
  review: '0.1em',
} as const;

export const lineHeights = {
  body: 1.55,
  ui: 1.45,
  heading: 1.12,
  tight: 1.05,
  compact: 1.3,
  meta: 1.4,
  success: 1.5,
} as const;
