// Libraries
import { StackGap } from '@/components/system/Stack/Stack.types';
import type {
  StackAlign,
  StackDirection,
  StackJustify,
} from '@/components/system/Stack/Stack.types';
import styled from 'styled-components';

const stackGapRem: Record<StackGap, string> = {
  [StackGap.xxs]: '0.125rem',
  [StackGap.xs]: '0.25rem',
  [StackGap.sm]: '0.5rem',
  [StackGap.md]: '0.75rem',
  [StackGap.lg]: '1rem',
  [StackGap.xl]: '1.25rem',
  [StackGap.xxl]: '1.5rem',
  [StackGap.xxxl]: '2rem',
};

interface StyledStackProps {
  $direction: StackDirection
  $gap: StackGap
  $align: StackAlign
  $justify: StackJustify
}

export const StyledStack = styled.div<StyledStackProps>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  gap: ${({ $gap }) => stackGapRem[$gap]};
  align-items: ${({ $align }) => $align};
  justify-content: ${({ $justify }) => $justify};
`;
