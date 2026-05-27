// Libraries
import styled from 'styled-components';

export const ErrorText = styled.span`
  display: block;
  margin-top: ${({ theme }) => theme.spacing.six};
  padding-left: ${({ theme }) => theme.spacing.xxs};
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: ${({ theme }) => theme.fontSizes.error};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.lineHeights.ui};
  letter-spacing: ${({ theme }) => theme.letterSpacing.micro};
  color: ${({ theme }) => theme.colors.errorSoft};
`;
