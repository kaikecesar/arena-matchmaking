// Libraries
import styled from 'styled-components'

export const BrandMarkWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

interface IconBoxProps {
  $size: number
}

export const IconBox = styled.div<IconBoxProps>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 9px;
  background: linear-gradient(
    145deg,
    ${({ theme }) => theme.colors.blood} 0%,
    ${({ theme }) => theme.colors.bloodDeep} 100%
  );
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.07) inset,
    0 4px 14px rgba(210, 38, 56, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

export const Wordmark = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.05;
  gap: 2px;
`

export const WordmarkArena = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 15px;
  color: ${({ theme }) => theme.colors.textHi};
  letter-spacing: 0.02em;
`

export const WordmarkSub = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 9px;
  letter-spacing: 0.14em;
  color: ${({ theme }) => theme.colors.copper};
  text-transform: uppercase;
  opacity: 0.9;
`
