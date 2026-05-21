import styled from 'styled-components'
import type { DefaultTheme } from 'styled-components'

interface StyledEyebrowProps {
  $color?: keyof DefaultTheme['colors']
}

export const StyledEyebrow = styled.span<StyledEyebrowProps>`
  display: block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${({ theme, $color }) => ($color ? theme.colors[$color] : theme.colors.textLow)};
`
