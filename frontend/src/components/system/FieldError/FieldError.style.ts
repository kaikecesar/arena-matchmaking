// Config
import { defaultFonts } from '../../../config/theme';

// Libraries
import styled from 'styled-components';

export const ErrorText = styled.span`
  display: block;
  margin-top: 0.375rem;
  padding-left: 0.125rem;
  font-family: ${defaultFonts.family.ui};
  font-size: 0.6875rem;
  font-weight: ${({ theme }) => theme.font.medium};
  line-height: 1.45;
  letter-spacing: 0.01em;
  color: ${({ theme }) => theme.color.feedback.errorSoft};
`;
