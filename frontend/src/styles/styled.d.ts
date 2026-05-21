import 'styled-components'
import type { Theme } from './theme'

declare module 'styled-components' {
  // interface required for module augmentation (type alias does not merge)
  export interface DefaultTheme extends Theme {}
}
