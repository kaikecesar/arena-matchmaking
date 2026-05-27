// Libraries
import styled from 'styled-components';

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
`;

export const Label = styled.label`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacing.label};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textLow};
`;

interface HelpTextProps {
  $error?: boolean
}

export const HelpText = styled.span<HelpTextProps>`
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme, $error }) =>
    $error
      ? theme.colors.error
      : theme.colors.textLow};
`;
