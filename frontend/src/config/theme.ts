/* =============================================================================
 * Theme Configuration — Three-layer composition with strict token contracts
 * ============================================================================= */

// Types
import {
  ApplicationThemes,
  Theme,
  ThemeBaseColor,
  ThemeColor,
  ThemeFont,
} from '../types/theme';

/* =============================================================================
 * Layer 1 — Font Abstraction with immutable dictionaries and pure composition
 * ============================================================================= */

const fontFamilies = {
  display: "'Barlow Semi Condensed', sans-serif",
  ui: "'Manrope', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
} as const;

const fontWeights = {
  regular: 400,
  medium: 500,
  bold: 700,
} as const;

const shorthand = {
  regular: `${fontWeights.regular} 0.9375rem/1.55 ${fontFamilies.ui}`,
  medium: `${fontWeights.medium} 0.9375rem/1.55 ${fontFamilies.ui}`,
  bold: `${fontWeights.bold} 0.9375rem/1.45 ${fontFamilies.display}`,
} as const;

export const defaultFonts = {
  family: fontFamilies,
  weight: fontWeights,
  shorthand,
} as const;

const composeThemeFont = (): ThemeFont => ({
  regular: fontWeights.regular,
  medium: fontWeights.medium,
  bold: fontWeights.bold,
});

/* =============================================================================
 * Layer 2 — Primary Design Tokens mapped to ThemeBaseColor contract keys
 * ============================================================================= */

const primitiveTokens = {
  brand: {
    primaryDeep: '#7c1422',
    primary: '#d22638',
    primaryHover: '#b41f30',
    primaryGlow: 'rgba(210, 38, 56, 0.28)',
    primarySoftBg: 'rgba(210, 38, 56, 0.10)',
    accentCopper: '#d8a168',
    accentCopperDeep: '#a47545',
    accentCopperSoftBg: 'rgba(216, 161, 104, 0.10)',
  },
  neutral: {
    bgApp: '#101114',
    bgContainer: '#16171b',
    bgElevated: '#1c1e23',
    bgInput: '#232529',
    borderSubtle: '#25272d',
    borderDefault: '#2e3037',
    textPrimary: '#f3f3f5',
    textSecondary: '#b9bbc1',
    textDisabled: '#6b6e76',
    textQuaternary: '#45474d',
    hoverNeutral: 'rgba(255, 255, 255, 0.04)',
    overlaySubtle: 'rgba(255, 255, 255, 0.03)',
    overlayMuted: 'rgba(255, 255, 255, 0.04)',
    overlayHover: 'rgba(255, 255, 255, 0.06)',
    overlayInset: 'rgba(255, 255, 255, 0.05)',
    overlayLine: 'rgba(255, 255, 255, 0.045)',
    overlayRing: 'rgba(255, 255, 255, 0.05)',
    headerScrim: 'rgba(16, 17, 20, 0.88)',
  },
  feedback: {
    success: {
      main: '#4ade80',
      border: 'rgba(74, 222, 128, 0.18)',
      background: 'rgba(74, 222, 128, 0.06)',
      glow: 'rgba(74, 222, 128, 0.35)',
    },
    error: {
      main: '#d22638',
      border: 'rgba(232, 120, 128, 0.32)',
      borderFocus: 'rgba(232, 120, 128, 0.52)',
      background: 'rgba(232, 120, 128, 0.09)',
      softText: 'rgba(232, 120, 128, 0.9)',
    },
    warning: {
      main: '#f59e0b',
      border: 'rgba(245, 158, 11, 0.24)',
      background: 'rgba(245, 158, 11, 0.10)',
    },
    info: {
      main: '#4da3ff',
      border: 'rgba(77, 163, 255, 0.24)',
      background: 'rgba(77, 163, 255, 0.10)',
    },
  },
  chart: {
    scale01: '#3b82f6',
    scale02: '#14b8a6',
    scale03: '#f59e0b',
    scale04: '#a855f7',
    scale05: '#ef4444',
    scale06: '#22c55e',
    scale07: '#eab308',
    scale08: '#06b6d4',
  },
  elevation: {
    shadow: '0 0.75rem 1.75rem -0.75rem rgba(0, 0, 0, 0.38)',
    shadowLight: '0 0.25rem 0.875rem rgba(0, 0, 0, 0.24)',
  },
  common: {
    onPrimary: '#f3f3f5',
    onSurface: '#101114',
    transparent: 'transparent',
    boneStart: '#f7f6f3',
    boneEnd: '#e5e2db',
    boneBorder: '#dcd8cf',
  },
} as const;

export const defaultColors = {
  colorPrimary10: primitiveTokens.brand.primaryDeep,
  colorPrimary20: primitiveTokens.brand.primaryHover,
  colorPrimary30: primitiveTokens.brand.primary,
  colorPrimary40: primitiveTokens.brand.primaryGlow,
  colorPrimary50: primitiveTokens.brand.primarySoftBg,
  colorNeutral10: primitiveTokens.neutral.bgApp,
  colorNeutral20: primitiveTokens.neutral.bgContainer,
  colorNeutral30: primitiveTokens.neutral.bgElevated,
  colorNeutral40: primitiveTokens.neutral.bgInput,
  colorNeutral50: primitiveTokens.neutral.borderSubtle,
  colorNeutral60: primitiveTokens.neutral.borderDefault,
  colorNeutral70: primitiveTokens.neutral.textDisabled,
  colorNeutral80: primitiveTokens.neutral.textSecondary,
  colorNeutral90: primitiveTokens.neutral.textPrimary,
  colorError: primitiveTokens.feedback.error.main,
  colorSuccess: primitiveTokens.feedback.success.main,
  colorAlert: primitiveTokens.feedback.warning.main,
  colorAccentCopper: primitiveTokens.brand.accentCopper,
  colorAccentCopperDeep: primitiveTokens.brand.accentCopperDeep,
  colorOnPrimary: primitiveTokens.common.onPrimary,
  colorOnSurface: primitiveTokens.common.onSurface,
  colorTransparent: primitiveTokens.common.transparent,
} as const satisfies ThemeBaseColor;

/* =============================================================================
 * Layer 3 — Contextual UI Mapping from primitive tokens and base palette
 * ============================================================================= */

const composeThemeColor = (base: ThemeBaseColor): ThemeColor => ({
  base,
  text: {
    high: base.colorNeutral90,
    medium: base.colorNeutral80,
    low: base.colorNeutral70,
    dim: primitiveTokens.neutral.textQuaternary,
    onPrimary: base.colorOnPrimary,
    onBone: base.colorOnSurface,
  },
  surface: {
    app: base.colorNeutral10,
    layer1: base.colorNeutral20,
    layer2: base.colorNeutral30,
    layer3: base.colorNeutral40,
    overlaySubtle: primitiveTokens.neutral.overlaySubtle,
    overlayMuted: primitiveTokens.neutral.overlayMuted,
    overlayHover: primitiveTokens.neutral.overlayHover,
    overlayInset: primitiveTokens.neutral.overlayInset,
    overlayLine: primitiveTokens.neutral.overlayLine,
    overlayRing: primitiveTokens.neutral.overlayRing,
    headerScrim: primitiveTokens.neutral.headerScrim,
  },
  border: {
    subtle: base.colorNeutral50,
    default: base.colorNeutral60,
    primarySubtle: 'rgba(210, 38, 56, 0.14)',
    primaryMedium: 'rgba(210, 38, 56, 0.22)',
    primarySelected: 'rgba(210, 38, 56, 0.32)',
    primaryFocus: 'rgba(210, 38, 56, 0.38)',
    primaryFocusStrong: 'rgba(210, 38, 56, 0.42)',
    error: primitiveTokens.feedback.error.border,
    errorFocus: primitiveTokens.feedback.error.borderFocus,
    success: primitiveTokens.feedback.success.border,
    bone: primitiveTokens.common.boneBorder,
  },
  brand: {
    primary: base.colorPrimary30,
    primarySoft: base.colorPrimary20,
    primaryDeep: base.colorPrimary10,
    primaryGlow: base.colorPrimary40,
    primaryTint: base.colorPrimary50,
    copper: base.colorAccentCopper,
    copperDeep: base.colorAccentCopperDeep,
    copperTint: primitiveTokens.brand.accentCopperSoftBg,
  },
  feedback: {
    error: base.colorError,
    errorSoft: primitiveTokens.feedback.error.softText,
    errorGlow: primitiveTokens.feedback.error.background,
    success: base.colorSuccess,
    successTint: primitiveTokens.feedback.success.background,
    successGlow: primitiveTokens.feedback.success.glow,
    warning: base.colorAlert,
  },
  button: {
    primaryGradientStart: base.colorPrimary30,
    primaryGradientEnd: base.colorPrimary20,
    primaryText: base.colorOnPrimary,
    secondaryGradientStart: primitiveTokens.common.boneStart,
    secondaryGradientEnd: primitiveTokens.common.boneEnd,
    secondaryText: base.colorOnSurface,
    ghostText: base.colorOnPrimary,
    ghostBorder: base.colorNeutral50,
    ghostBorderHover: base.colorNeutral60,
    ghostBackgroundHover: base.colorNeutral30,
  },
  input: {
    background: base.colorNeutral40,
    text: base.colorNeutral90,
    placeholder: primitiveTokens.neutral.textQuaternary,
    label: base.colorNeutral70,
    border: base.colorNeutral50,
    borderHover: base.colorNeutral60,
    borderFocus: 'rgba(210, 38, 56, 0.38)',
    borderError: primitiveTokens.feedback.error.border,
    borderErrorFocus: primitiveTokens.feedback.error.borderFocus,
    trailingIcon: base.colorNeutral70,
    trailingIconHover: base.colorNeutral90,
    trailingBackgroundHover: primitiveTokens.neutral.hoverNeutral,
    errorText: primitiveTokens.feedback.error.softText,
    hintText: base.colorNeutral70,
  },
  header: {
    background: primitiveTokens.neutral.headerScrim,
    text: base.colorNeutral90,
    border: base.colorNeutral50,
  },
  sidebar: {
    background: base.colorNeutral20,
    text: base.colorNeutral90,
    textMuted: base.colorNeutral80,
    border: base.colorNeutral50,
    itemHover: base.colorNeutral30,
    itemActive: base.colorPrimary50,
  },
  checkbox: {
    background: base.colorNeutral40,
    backgroundChecked: base.colorNeutral40,
    border: base.colorNeutral60,
    borderChecked: base.colorPrimary30,
    label: base.colorNeutral80,
  },
});

/* =============================================================================
 * Final Exports — Theme instances composed exclusively from defaultColors
 * ============================================================================= */

const semanticDefault = composeThemeColor(defaultColors);

const defaultTheme: Theme = {
  font: composeThemeFont(),
  color: semanticDefault,
};

export const themes: ApplicationThemes = {
  default: defaultTheme,
};

export const theme: Theme = themes.default;
