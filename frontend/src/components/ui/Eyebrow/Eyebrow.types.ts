// Types
import type { DefaultTheme } from 'styled-components'

export type ThemeColorKey = keyof DefaultTheme['colors']

export interface EyebrowProps {
  children: React.ReactNode
  $color?: ThemeColorKey | undefined
}
