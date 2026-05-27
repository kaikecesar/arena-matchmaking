/* =============================================================================
 * Theme Types — Core contracts for tokenized style architecture
 * ============================================================================= */

export interface ThemeFont {
  regular: number;
  medium: number;
  bold: number;
}

export interface ThemeBaseColor {
  colorPrimary10: string;
  colorPrimary20: string;
  colorPrimary30: string;
  colorPrimary40: string;
  colorPrimary50: string;
  colorNeutral10: string;
  colorNeutral20: string;
  colorNeutral30: string;
  colorNeutral40: string;
  colorNeutral50: string;
  colorNeutral60: string;
  colorNeutral70: string;
  colorNeutral80: string;
  colorNeutral90: string;
  colorError: string;
  colorSuccess: string;
  colorAlert: string;
  colorAccentCopper: string;
  colorAccentCopperDeep: string;
  colorOnPrimary: string;
  colorOnSurface: string;
  colorTransparent: string;
}

export interface TextColors {
  high: string;
  medium: string;
  low: string;
  dim: string;
  onPrimary: string;
  onBone: string;
}

export interface SurfaceColors {
  app: string;
  layer1: string;
  layer2: string;
  layer3: string;
  overlaySubtle: string;
  overlayMuted: string;
  overlayHover: string;
  overlayInset: string;
  overlayLine: string;
  overlayRing: string;
  headerScrim: string;
}

export interface BorderColors {
  subtle: string;
  default: string;
  primarySubtle: string;
  primaryMedium: string;
  primarySelected: string;
  primaryFocus: string;
  primaryFocusStrong: string;
  error: string;
  errorFocus: string;
  success: string;
  bone: string;
}

export interface BrandColors {
  primary: string;
  primarySoft: string;
  primaryDeep: string;
  primaryGlow: string;
  primaryTint: string;
  copper: string;
  copperDeep: string;
  copperTint: string;
}

export interface FeedbackColors {
  error: string;
  errorSoft: string;
  errorGlow: string;
  success: string;
  successTint: string;
  successGlow: string;
  warning: string;
}

export interface ButtonColors {
  primaryGradientStart: string;
  primaryGradientEnd: string;
  primaryText: string;
  secondaryGradientStart: string;
  secondaryGradientEnd: string;
  secondaryText: string;
  ghostText: string;
  ghostBorder: string;
  ghostBorderHover: string;
  ghostBackgroundHover: string;
}

export interface InputColors {
  background: string;
  text: string;
  placeholder: string;
  label: string;
  border: string;
  borderHover: string;
  borderFocus: string;
  borderError: string;
  borderErrorFocus: string;
  trailingIcon: string;
  trailingIconHover: string;
  trailingBackgroundHover: string;
  errorText: string;
  hintText: string;
}

export interface HeaderColors {
  background: string;
  text: string;
  border: string;
}

export interface SidebarColors {
  background: string;
  text: string;
  textMuted: string;
  border: string;
  itemHover: string;
  itemActive: string;
}

export interface CheckboxColors {
  background: string;
  backgroundChecked: string;
  border: string;
  borderChecked: string;
  label: string;
}

export interface ThemeColor {
  base: ThemeBaseColor;
  text: TextColors;
  surface: SurfaceColors;
  border: BorderColors;
  brand: BrandColors;
  feedback: FeedbackColors;
  button: ButtonColors;
  input: InputColors;
  header: HeaderColors;
  sidebar: SidebarColors;
  checkbox: CheckboxColors;
}

export interface Theme {
  font: ThemeFont;
  color: ThemeColor;
}

export type ApplicationThemes = {
  default: Theme;
  dark?: Theme;
};

export type ThemeAccentColorKey = 'primary' | 'copper' | 'blood';
