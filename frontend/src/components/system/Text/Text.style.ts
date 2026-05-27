// Libraries
import styled, { css } from 'styled-components';

// Types
import type { TextVariant } from '@/components/system/Text/Text.types';

const textVariants: Record<TextVariant, ReturnType<typeof css>> = {
  body: css`
    font-family: ${({ theme }) => theme.fonts.ui};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    line-height: ${({ theme }) => theme.lineHeights.body};
    color: ${({ theme }) => theme.colors.textHi};
  `,
  label: css`
    font-family: ${({ theme }) => theme.fonts.ui};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    line-height: ${({ theme }) => theme.lineHeights.body};
    color: ${({ theme }) => theme.colors.textMid};
  `,
  eyebrow: css`
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    letter-spacing: ${({ theme }) => theme.letterSpacing.label};
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textLow};
  `,
  heading: css`
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: ${({ theme }) => theme.fontSizesFluid.display};
    line-height: ${({ theme }) => theme.lineHeights.tight};
    color: ${({ theme }) => theme.colors.textHi};
  `,
  subheading: css`
    font-family: ${({ theme }) => theme.fonts.ui};
    font-size: ${({ theme }) => theme.fontSizes.md};
    color: ${({ theme }) => theme.colors.textMid};
  `,
};

interface StyledTextProps {
  $variant: TextVariant
}

export const StyledText = styled.span<StyledTextProps>`
  ${({ $variant }) => textVariants[$variant]};
`;
