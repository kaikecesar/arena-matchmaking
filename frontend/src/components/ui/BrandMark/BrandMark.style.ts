// Libraries
import styled from 'styled-components';

// Config
import { defaultFonts } from '../../../config/theme';

export const BrandMarkWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

interface IconBoxProps {
  $size: number
}

export const IconBox = styled.div<IconBoxProps>`
  width: ${({ $size }) => $size / 16}rem;
  height: ${({ $size }) => $size / 16}rem;
  border-radius: 0.625rem;
  background: linear-gradient(
    145deg,
    ${({ theme }) => theme.color.brand.primary} 0%,
    ${({ theme }) => theme.color.brand.primaryDeep} 100%
  );
  box-shadow:
    0 0 0 0.0625rem ${({ theme }) => theme.color.surface.overlayRing} inset,
    0 0.125rem 0.375rem rgba(210, 38, 56, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const Wordmark = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.05;
  gap: 0.125rem;
`;

export const WordmarkArena = styled.span`
  font-family: ${defaultFonts.family.display};
  font-weight: ${({ theme }) => theme.font.bold};
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.color.text.high};
  letter-spacing: 0.02em;
`;

export const WordmarkSub = styled.span`
  font-family: ${defaultFonts.family.mono};
  font-size: 0.5625rem;
  letter-spacing: 0.14em;
  color: ${({ theme }) => theme.color.brand.copper};
  text-transform: uppercase;
  opacity: 0.85;
`;
