import type { DefaultTheme } from 'styled-components'

export interface EyebrowProps {
  children: React.ReactNode
  $color?: keyof DefaultTheme['colors']
}
