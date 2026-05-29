// Types
import { Theme } from '../types/theme';

// Libraries
import 'styled-components';

declare module 'styled-components' {
  // interface required for module augmentation (type alias does not merge)
  export interface DefaultTheme extends Theme {}
}
