// Libraries
import styled, { css } from 'styled-components';

// Config
import { defaultFonts } from '../../../config/theme';

// Component
import { TextVariant } from './Text.types';

const textVariants: Record<TextVariant, ReturnType<typeof css>> = {
  body: css`
    font-family: ${defaultFonts.family.ui};
    font-size: 0.9375rem;
    line-height: 1.55;
    color: ${({ theme }) => theme.color.text.high};
  `,
  label: css`
    font-family: ${defaultFonts.family.ui};
    font-size: 0.75rem;
    line-height: 1.55;
    color: ${({ theme }) => theme.color.text.medium};
  `,
  eyebrow: css`
    font-family: ${defaultFonts.family.mono};
    font-size: 0.625rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.color.text.low};
  `,
  heading: css`
    font-family: ${defaultFonts.family.display};
    font-size: clamp(2.5rem, 6vw, 3.5rem);
    line-height: 1.05;
    color: ${({ theme }) => theme.color.text.high};
  `,
  subheading: css`
    font-family: ${defaultFonts.family.ui};
    font-size: 0.875rem;
    color: ${({ theme }) => theme.color.text.medium};
  `,
};

interface StyledTextProps {
  $variant: TextVariant
}

export const StyledText = styled.span<StyledTextProps>`
  ${({ $variant }) => textVariants[$variant]};
`;
