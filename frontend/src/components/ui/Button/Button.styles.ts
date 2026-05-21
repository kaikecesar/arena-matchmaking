// Libraries
import styled, { keyframes, css } from 'styled-components'

import type { ButtonVariant, ButtonSize } from './Button.types'

const spin = keyframes`
  to { transform: rotate(360deg); }
`

const sizeStyles: Record<ButtonSize, ReturnType<typeof css>> = {
  sm: css`
    height: 36px;
    padding: 0 16px;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    gap: ${({ theme }) => theme.spacing.sm};
  `,
  md: css`
    height: 48px;
    padding: 0 22px;
    font-size: ${({ theme }) => theme.fontSizes.md};
    gap: ${({ theme }) => theme.spacing.sm};
  `,
  lg: css`
    height: 52px;
    padding: 0 24px;
    font-size: ${({ theme }) => theme.fontSizes.lg};
    gap: ${({ theme }) => theme.spacing.md};
  `,
}

interface StyledButtonProps {
  $variant: ButtonVariant
  $size: ButtonSize
  $fullWidth: boolean
  $loading: boolean
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    transform ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.normal},
    filter ${({ theme }) => theme.transitions.normal},
    background ${({ theme }) => theme.transitions.normal};
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
            filter: brightness(1.06);
            box-shadow:
              0 1px 0 rgba(255, 255, 255, 0.16) inset,
              0 10px 24px rgba(210, 38, 56, 0.28);
            transform: translateY(-1px);
          }

          &:active:not(:disabled) {
            transform: translateY(0) scale(0.99);
            filter: brightness(0.98);
            box-shadow:
              0 1px 0 rgba(255, 255, 255, 0.1) inset,
              0 4px 12px rgba(210, 38, 56, 0.2);
          }
        `
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
            transform: translateY(-1px);
          }

          &:active:not(:disabled) {
            transform: translateY(0) scale(0.99);
          }
        `
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
            transform: scale(0.99);
          }
        `
      default:
        return null
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const SpinnerSvg = styled.svg`
  animation: ${spin} 0.8s linear infinite;
  flex-shrink: 0;
`
