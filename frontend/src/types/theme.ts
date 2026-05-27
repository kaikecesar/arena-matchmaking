/* =============================================================================
 * Theme Types — Core contracts for tokenized style architecture
 * ============================================================================= */

export interface ThemeFont {
  bold: number;
  medium: number;
  regular: number;
}

export interface ThemeBaseColor {
  colorAccentCopper: string;
  colorAccentCopperDeep: string;
  colorAlert: string;
  colorError: string;
  colorNeutral10: string;
  colorNeutral20: string;
  colorNeutral30: string;
  colorNeutral40: string;
  colorNeutral50: string;
  colorNeutral60: string;
  colorNeutral70: string;
  colorNeutral80: string;
  colorNeutral90: string;
  colorOnPrimary: string;
  colorOnSurface: string;
  colorPrimary10: string;
  colorPrimary20: string;
  colorPrimary30: string;
  colorPrimary40: string;
  colorPrimary50: string;
  colorSuccess: string;
  colorTransparent: string;
}

export interface TextColors {
  dim: string;
  high: string;
  low: string;
  medium: string;
  onBone: string;
  onPrimary: string;
}

export interface SurfaceColors {
  app: string;
  headerScrim: string;
  layer1: string;
  layer2: string;
  layer3: string;
  overlayHover: string;
  overlayInset: string;
  overlayLine: string;
  overlayMuted: string;
  overlayRing: string;
  overlaySubtle: string;
}

export interface BorderColors {
  bone: string;
  default: string;
  error: string;
  errorFocus: string;
  primaryFocus: string;
  primaryFocusStrong: string;
  primaryMedium: string;
  primarySelected: string;
  primarySubtle: string;
  subtle: string;
  success: string;
}

export interface BrandColors {
  copper: string;
  copperDeep: string;
  copperTint: string;
  primary: string;
  primaryDeep: string;
  primaryGlow: string;
  primarySoft: string;
  primaryTint: string;
}

export interface FeedbackColors {
  error: string;
  errorGlow: string;
  errorSoft: string;
  success: string;
  successGlow: string;
  successTint: string;
  warning: string;
}

export interface ButtonColors {
  ghostBackgroundHover: string;
  ghostBorder: string;
  ghostBorderHover: string;
  ghostText: string;
  primaryGradientEnd: string;
  primaryGradientStart: string;
  primaryText: string;
  secondaryGradientEnd: string;
  secondaryGradientStart: string;
  secondaryText: string;
}

export interface InputColors {
  background: string;
  border: string;
  borderError: string;
  borderErrorFocus: string;
  borderFocus: string;
  borderHover: string;
  errorText: string;
  hintText: string;
  label: string;
  placeholder: string;
  text: string;
  trailingBackgroundHover: string;
  trailingIcon: string;
  trailingIconHover: string;
}

export interface HeaderColors {
  background: string;
  border: string;
  text: string;
}

export interface SidebarColors {
  background: string;
  border: string;
  itemActive: string;
  itemHover: string;
  text: string;
  textMuted: string;
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
  border: BorderColors;
  brand: BrandColors;
  button: ButtonColors;
  checkbox: CheckboxColors;
  feedback: FeedbackColors;
  header: HeaderColors;
  input: InputColors;
  sidebar: SidebarColors;
  surface: SurfaceColors;
  text: TextColors;
}

export interface Theme {
  color: ThemeColor;
  font: ThemeFont;
}

export type ApplicationThemes = {
  dark?: Theme;
  default: Theme;
};

export type ThemeAccentColorKey = 'primary' | 'copper' | 'blood';
