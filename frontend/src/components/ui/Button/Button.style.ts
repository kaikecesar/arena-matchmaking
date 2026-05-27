// Libraries
import styled, { css, keyframes } from 'styled-components';

// Config
import { defaultFonts } from '../../../config/theme';

// Component
import { ButtonSize, StyledButtonProps } from './Button.types';

/* ************** KEYFRAMES ******************* */
const spin = keyframes`
  to { transform: rotate(360deg); }
`;

/* ************** CONSTANTS ******************* */
const sizeStyles: Record<ButtonSize, ReturnType<typeof css>> = {
  sm: css`
    min-height: 2.75rem;
    height: auto;
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
    gap: 0.5rem;
  `,
  md: css`
    height: 2.75rem;
    padding: 0 1.375rem;
    font-size: 0.875rem;
    gap: 0.5rem;
  `,
  lg: css`
    height: 3.25rem;
    padding: 0 1.5rem;
    font-size: 1rem;
    gap: 0.75rem;
  `,
};

/* ************** STYLED BUTTON ******************* */
export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.5rem;
  font-family: ${defaultFonts.family.display};
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.2s ease,
    filter 0.2s ease,
    background 0.2s ease;
  width: ${({ $fullWidth }) =>
    $fullWidth
      ? '100%'
      : 'auto'};
  pointer-events: ${({ $loading }) =>
    $loading
      ? 'none'
      : 'auto'};

  ${({ $size }) => sizeStyles[$size]}

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'blood':
        return css`
          background: linear-gradient(
            180deg,
            ${theme.color.button.primaryGradientStart} 0%,
            ${theme.color.button.primaryGradientEnd} 100%
          );
          color: ${theme.color.button.primaryText};
          box-shadow:
            0 0.0625rem 0 rgba(255, 255, 255, 0.1) inset,
            0 0.1875rem 0.625rem ${theme.color.border.primarySubtle};

          &:hover:not(:disabled) {
            filter: brightness(1.04);
            box-shadow:
              0 0.0625rem 0 rgba(255, 255, 255, 0.12) inset,
              0 0.25rem 0.875rem rgba(210, 38, 56, 0.16);
            transform: translateY(-0.0625rem);
          }

          &:active:not(:disabled) {
            transform: translateY(0) scale(0.98);
            filter: brightness(0.98);
            box-shadow:
              0 0.0625rem 0 rgba(255, 255, 255, 0.1) inset,
              0 0.25rem 0.75rem rgba(210, 38, 56, 0.2);
          }
        `;
      case 'bone':
        return css`
          background: linear-gradient(
            180deg,
            ${theme.color.button.secondaryGradientStart} 0%,
            ${theme.color.button.secondaryGradientEnd} 100%
          );
          color: ${theme.color.button.secondaryText};

          &:hover:not(:disabled) {
            filter: brightness(1.04);
            transform: translateY(-0.0625rem);
          }

          &:active:not(:disabled) {
            transform: translateY(0) scale(0.98);
          }
        `;
      case 'ghost':
        return css`
          background: transparent;
          color: ${theme.color.button.ghostText};
          border: 0.0625rem solid ${theme.color.button.ghostBorder};

          &:hover:not(:disabled) {
            border-color: ${theme.color.button.ghostBorderHover};
            background: ${theme.color.button.ghostBackgroundHover};
          }

          &:active:not(:disabled) {
            transform: scale(0.98);
          }
        `;
      default:
        return null;
    }
  }}

  &:focus-visible {
    outline: 0.125rem solid rgba(210, 38, 56, 0.45);
    outline-offset: 0.25rem;
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
    filter: none;
  }
`;

/* ************** LOADING ******************* */
export const SpinnerSvg = styled.svg`
  animation: ${spin} 0.8s linear infinite;
  flex-shrink: 0;
`;
