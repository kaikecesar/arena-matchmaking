// Libraries
import type { StyledEyebrowProps } from '@/components/ui/Eyebrow/Eyebrow.types';
import { defaultFonts } from '@/config/theme';
import styled from 'styled-components';

const accentColor = (
  theme: { color: { brand: { primary: string; copper: string }; text: { low: string } } },
  color: StyledEyebrowProps['$color'],
): string => {
  if (color === 'primary' || color === 'blood') {
    return theme.color.brand.primary;
  }
  if (color === 'copper') {
    return theme.color.brand.copper;
  }
  return theme.color.text.low;
};

export const StyledEyebrow = styled.span<StyledEyebrowProps>`
  display: block;
  font-family: ${defaultFonts.family.mono};
  font-size: 0.625rem;
  font-weight: ${({ theme }) => theme.font.medium};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme, $color }) => accentColor(theme, $color)};
`;
