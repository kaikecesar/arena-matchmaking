// Libraries
import styled from 'styled-components';

export const BrandMarkWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.ten};
`;

interface IconBoxProps {
  $size: number
}

export const IconBox = styled.div<IconBoxProps>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: ${({ theme }) => theme.radius.brand};
  background: ${({ theme }) => theme.gradients.brandIcon};
  box-shadow: ${({ theme }) => theme.shadows.brandMark};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const Wordmark = styled.div`
  display: flex;
  flex-direction: column;
  line-height: ${({ theme }) => theme.lineHeights.tight};
  gap: ${({ theme }) => theme.spacing.xxs};
`;

export const WordmarkArena = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textHi};
  letter-spacing: ${({ theme }) => theme.letterSpacing.display};
`;

export const WordmarkSub = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xxs};
  letter-spacing: ${({ theme }) => theme.letterSpacing.wordmarkSub};
  color: ${({ theme }) => theme.colors.copper};
  text-transform: uppercase;
  opacity: ${({ theme }) => theme.opacity.wordmarkSub};
`;
