import styled, { css } from 'styled-components';
import type { TextVariant } from './Text.types';

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
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textLow};
  `,
  heading: css`
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: clamp(40px, 6vw, 56px);
    line-height: 1.05;
    color: ${({ theme }) => theme.colors.textHi};
  `,
  subheading: css`
    font-family: ${({ theme }) => theme.fonts.ui};
    font-size: ${({ theme }) => theme.fontSizes.md};
    color: ${({ theme }) => theme.colors.textMid};
  `,
};

interface StyledTextProps {
  $variant: TextVariant;
}

export const StyledText = styled.span<StyledTextProps>`
  ${({ $variant }) => textVariants[$variant]};
`;
