// Libraries
import styled from 'styled-components'

// Types
import type {
  StackAlign,
  StackDirection,
  StackGap,
  StackJustify,
} from '@/components/system/Stack/Stack.types'

interface StyledStackProps {
  $direction: StackDirection
  $gap: StackGap
  $align: StackAlign
  $justify: StackJustify
}

export const StyledStack = styled.div<StyledStackProps>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  gap: ${({ theme, $gap }) => theme.spacing[$gap]};
  align-items: ${({ $align }) => $align};
  justify-content: ${({ $justify }) => $justify};
`
