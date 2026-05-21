// Libraries
import styled from 'styled-components'

// Types
import type { ThemeColorKey } from '@/components/ui/Eyebrow/Eyebrow.types'

interface StyledEyebrowProps {
  $color?: ThemeColorKey | undefined
}

export const StyledEyebrow = styled.span<StyledEyebrowProps>`
  display: block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  letter-spacing: ${({ theme }) => theme.letterSpacing.caps};
  text-transform: uppercase;
  color: ${({ theme, $color }) =>
    $color
      ? theme.colors[$color]
      : theme.colors.textLow};
`
