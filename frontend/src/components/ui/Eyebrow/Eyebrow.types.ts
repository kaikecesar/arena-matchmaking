// Core
import type { ReactNode } from 'react';

// Types
import type { ThemeAccentColorKey } from '@/types/theme';

export interface StyledEyebrowProps {
  $color?: ThemeAccentColorKey | undefined;
}

export interface EyebrowProps {
  children: ReactNode;
  $color?: ThemeAccentColorKey | undefined;
}
