// Core
import { ReactNode } from 'react';

// Types
import { ThemeAccentColorKey } from '../../../types/theme';

export interface StyledEyebrowProps {
  $color?: ThemeAccentColorKey | undefined;
}

export interface EyebrowProps {
  $color?: ThemeAccentColorKey | undefined;
  children: ReactNode;
  testId?: string | undefined;
}
