// Libraries
import styled from 'styled-components'

export const BrandMarkWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

interface IconBoxProps {
  $size: number
}

export const IconBox = styled.div<IconBoxProps>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 8px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.blood} 0%,
    ${({ theme }) => theme.colors.bloodDeep} 100%
  );
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.06) inset,
    0 4px 12px ${({ theme }) => theme.colors.bloodGlow};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

export const Wordmark = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1;
`

export const WordmarkArena = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textHi};
  letter-spacing: 0.01em;
`

export const WordmarkSub = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 8.5px;
  letter-spacing: 0.2em;
  color: ${({ theme }) => theme.colors.copper};
  text-transform: uppercase;
  margin-top: 1px;
`
