// Libraries
import styled from 'styled-components'

interface StyledStackProps {
  $direction: 'row' | 'column'
  $gap: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'
  $align: 'stretch' | 'flex-start' | 'center' | 'flex-end' | 'baseline'
  $justify: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
}

export const StyledStack = styled.div<StyledStackProps>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  gap: ${({ theme, $gap }) => theme.spacing[$gap]};
  align-items: ${({ $align }) => $align};
  justify-content: ${({ $justify }) => $justify};
`
