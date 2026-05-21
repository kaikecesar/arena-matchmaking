// Libraries
import styled, { keyframes, css } from 'styled-components'

// Types
import type { ButtonSize, ButtonVariant } from '@/components/ui/Button/Button.types'

/* *************************************************************************************************
******************************************** KEYFRAMES *********************************************
************************************************************************************************* */
const spin = keyframes`
  to { transform: rotate(360deg); }
`

/* *************************************************************************************************
******************************************** CONSTANTS *********************************************
************************************************************************************************* */
const sizeStyles: Record<ButtonSize, ReturnType<typeof css>> = {
  sm: css`
    min-height: ${({ theme }) => theme.layout.touchTarget};
    height: auto;
    padding: ${({ theme }) => theme.spacing.sm}
      ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    gap: ${({ theme }) => theme.spacing.sm};
  `,
  md: css`
    height: ${({ theme }) => theme.sizes.buttonMd};
    padding: 0 ${({ theme }) => theme.spacing.twentyTwo};
    font-size: ${({ theme }) => theme.fontSizes.md};
    gap: ${({ theme }) => theme.spacing.sm};
  `,
  lg: css`
    height: ${({ theme }) => theme.sizes.buttonLg};
    padding: 0 ${({ theme }) => theme.spacing.xxl};
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

/* *************************************************************************************************
****************************************** STYLED BUTTON *******************************************
************************************************************************************************* */
export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: ${({ theme }) => theme.letterSpacing.wide};
  text-transform: uppercase;
  cursor: pointer;
  transition:
    transform ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.normal},
    filter ${({ theme }) => theme.transitions.normal},
    background ${({ theme }) => theme.transitions.normal};
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
          background: ${theme.gradients.buttonBlood};
          color: ${theme.colors.textHi};
          box-shadow: ${theme.shadows.buttonBlood};

          &:hover:not(:disabled) {
            filter: brightness(1.04);
            box-shadow: ${theme.shadows.buttonBloodHover};
            transform: translateY(-${theme.motion.offset.hairline});
          }

          &:active:not(:disabled) {
            transform: translateY(0) scale(${theme.motion.scale.press});
            filter: brightness(0.98);
            box-shadow: ${theme.shadows.buttonBloodActive};
          }
        `
      case 'bone':
        return css`
          background: ${theme.gradients.buttonBone};
          color: ${theme.colors.bgApp};

          &:hover:not(:disabled) {
            filter: brightness(1.04);
            transform: translateY(-${theme.motion.offset.hairline});
          }

          &:active:not(:disabled) {
            transform: translateY(0) scale(${theme.motion.scale.press});
          }
        `
      case 'ghost':
        return css`
          background: transparent;
          color: ${theme.colors.textHi};
          border: ${theme.borders.hairline} solid ${theme.colors.border1};

          &:hover:not(:disabled) {
            border-color: ${theme.colors.border2};
            background: ${theme.colors.surf2};
          }

          &:active:not(:disabled) {
            transform: scale(${theme.motion.scale.press});
          }
        `
      default:
        return null
    }
  }}

  &:focus-visible {
    outline: ${({ theme }) => theme.shadows.focusOutline};
    outline-offset: ${({ theme }) => theme.spacing.xs};
  }

  &:disabled {
    opacity: ${({ theme }) => theme.opacity.disabled};
    cursor: not-allowed;
    transform: none;
    filter: none;
  }
`

/* *************************************************************************************************
********************************************* LOADING **********************************************
************************************************************************************************* */
export const SpinnerSvg = styled.svg`
  animation: ${spin} ${({ theme }) => theme.motion.durations.spin} linear infinite;
  flex-shrink: 0;
`
