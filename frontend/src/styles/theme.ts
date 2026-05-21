export const theme = {
  colors: {
    // Surfaces
    bgApp:      '#101114',
    surf1:      '#16171b',
    surf2:      '#1c1e23',
    surf3:      '#232529',
    // Borders
    border1:    '#25272d',
    border2:    '#2e3037',
    // Text
    textHi:     '#f3f3f5',
    textMid:    '#b9bbc1',
    textLow:    '#6b6e76',
    textDim:    '#45474d',
    // Blood accent
    blood:      '#d22638',
    bloodSoft:  '#b41f30',
    bloodDeep:  '#7c1422',
    bloodGlow:  'rgba(210, 38, 56, 0.28)',
    bloodTint:  'rgba(210, 38, 56, 0.10)',
    // Copper accent
    copper:     '#d8a168',
    copperDeep: '#a47545',
    copperTint: 'rgba(216, 161, 104, 0.10)',
    // Semantic
    success:    '#4ade80',
    warning:    '#f59e0b',
    error:      '#d22638',
  },
  fonts: {
    display: "'Barlow Semi Condensed', sans-serif",
    ui:      "'Manrope', system-ui, sans-serif",
    mono:    "'JetBrains Mono', monospace",
  },
  fontWeights: {
    regular:   400,
    medium:    500,
    semibold:  600,
    bold:      700,
    extrabold: 800,
    black:     900,
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '20px',
  },
  shadows: {
    card:        '0 1px 0 rgba(255,255,255,0.03) inset, 0 8px 24px rgba(0,0,0,0.35)',
    pop:         '0 1px 0 rgba(255,255,255,0.05) inset, 0 12px 32px rgba(0,0,0,0.5)',
    ringBlood:   '0 0 0 1px #d22638, 0 0 24px rgba(210,38,56,0.28)',
    buttonBlood: '0 1px 0 rgba(255,255,255,0.15) inset, 0 12px 28px rgba(210,38,56,0.28)',
  },
  breakpoints: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  spacing: {
    xs:   '4px',
    sm:   '8px',
    md:   '12px',
    lg:   '16px',
    xl:   '20px',
    xxl:  '24px',
    xxxl: '32px',
  },
} as const;

export type Theme = typeof theme;
