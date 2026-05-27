// Config
import { defaultFonts } from '../../../config/theme';

// Libraries
import styled from 'styled-components';

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
`;

export const Label = styled.label`
  font-family: ${defaultFonts.family.mono};
  font-size: 0.625rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.input.label};
`;

interface HelpTextProps {
  $error?: boolean
}

export const HelpText = styled.span<HelpTextProps>`
  font-family: ${defaultFonts.family.ui};
  font-size: 0.75rem;
  color: ${({ theme, $error }) =>
    $error
      ? theme.color.feedback.error
      : theme.color.input.hintText};
`;
