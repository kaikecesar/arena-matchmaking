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
  xs: '10px',
  sm: '12px',
  md: '14px',
  lg: '16px',
  xl: '20px',
  xxl: '24px',
  xxxl: '32px',
  display: '44px',
} as const;

export const lineHeights = {
  body: 1.5,
  heading: 1.1,
} as const;
