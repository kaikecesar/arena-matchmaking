// Libraries
import styled from 'styled-components'

// Types
import type { StackProps } from './Stack.types'

export const StyledStack = styled.div<Pick<StackProps, 'direction' | 'gap' | 'align' | 'justify'>>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  gap: ${({ theme, $gap }) => theme.spacing[$gap]};
  align-items: ${({ $align }) => $align};
  justify-content: ${({ $justify }) => $justify};
`
