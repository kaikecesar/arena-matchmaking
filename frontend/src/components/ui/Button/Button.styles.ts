// Libraries
import styled, { keyframes, css } from 'styled-components';

import type { ButtonVariant, ButtonSize } from './Button.types';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const sizeStyles: Record<ButtonSize, ReturnType<typeof css>> = {
  sm: css`
    height: 36px;
    padding: 0 16px;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    gap: ${({ theme }) => theme.spacing.sm};
  `,
  md: css`
    height: 44px;
    padding: 0 20px;
    font-size: ${({ theme }) => theme.fontSizes.md};
    gap: ${({ theme }) => theme.spacing.md};
  `,
  lg: css`
    height: 56px;
    padding: 0 24px;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    gap: ${({ theme }) => theme.spacing.lg};
  `,
};

interface StyledButtonProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
  $loading: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.normal};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  pointer-events: ${({ $loading }) => ($loading ? 'none' : 'auto')};

  ${({ $size }) => sizeStyles[$size]}

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'blood':
        return css`
          background: linear-gradient(
            180deg,
            ${theme.colors.blood} 0%,
            ${theme.colors.bloodSoft} 100%
          );
          color: ${theme.colors.textHi};
          box-shadow: ${theme.shadows.buttonBlood};

          &:hover:not(:disabled) {
            filter: brightness(1.08);
          }
          &:active:not(:disabled) {
            transform: scale(0.98);
          }
        `;
      case 'bone':
        return css`
          background: linear-gradient(
            180deg,
            ${theme.colors.boneLight} 0%,
            ${theme.colors.boneSoft} 100%
          );
          color: ${theme.colors.bgApp};

          &:hover:not(:disabled) {
            filter: brightness(1.04);
          }
          &:active:not(:disabled) {
            transform: scale(0.98);
          }
        `;
      case 'ghost':
        return css`
          background: transparent;
          color: ${theme.colors.textHi};
          border: 1px solid ${theme.colors.border1};

          &:hover:not(:disabled) {
            border-color: ${theme.colors.border2};
            background: ${theme.colors.surf2};
          }
          &:active:not(:disabled) {
            transform: scale(0.98);
          }
        `;
      default:
        return null;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SpinnerSvg = styled.svg`
  animation: ${spin} 0.8s linear infinite;
  flex-shrink: 0;
`;
