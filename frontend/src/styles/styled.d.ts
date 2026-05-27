// Style
import type { Theme } from '@/types/theme';
import 'styled-components';

declare module 'styled-components' {
  // interface required for module augmentation (type alias does not merge)
  export interface DefaultTheme extends Theme {}
}
