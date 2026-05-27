// Core
import type { ReactNode } from 'react';

// Types
import type { DefaultTheme } from 'styled-components';

export interface StyledEyebrowProps {
  $color?: ThemeColorKey | undefined;
}

export type ThemeColorKey = keyof DefaultTheme['colors']

export interface EyebrowProps {
  children: ReactNode;
  $color?: ThemeColorKey | undefined;
}
