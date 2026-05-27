// Libraries
import type { InputWrapperStyledProps, StyledInputStyledProps } from '@/components/ui/InputField/InputField.types';
import type { Theme } from '@/styles/theme';
import styled, { css, keyframes, type Keyframes } from 'styled-components';
/* ************** LAYOUT ******************* */
export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FieldLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  letter-spacing: ${({ theme }) => theme.letterSpacing.caps};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textLow};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  display: block;
`;

/* ************** INPUT ******************* */
export const InputWrapper = styled.div<InputWrapperStyledProps>`
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  isolation: isolate;
  background-color: ${({ theme }) => theme.colors.surf3};
  background-image: ${({ theme }) => theme.gradients.inputSurface};
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError
        ? theme.colors.errorBorder
        : theme.colors.border1};
  box-shadow: ${({ theme, $hasError }) =>
    $hasError
      ? theme.shadows.inputErrorFocus
      : theme.shadows.inputDefault};
  transition:
    border-color ${({ theme }) => theme.transitions.normal},
    box-shadow ${({ theme }) => theme.transitions.normal};
  opacity: ${({ theme, $disabled }) =>
    $disabled
      ? theme.opacity.disabledField
      : theme.opacity.full};

  &:hover:not(:focus-within) {
    ${({ $hasError, $disabled, theme }) =>
      !$hasError &&
      !$disabled &&
      css`
        border-color: ${theme.colors.border2};
        box-shadow: ${theme.shadows.inputHover};
      `}
  }

  &:focus-within {
    ${({ $hasError, theme }) =>
      $hasError
        ? css`
            border-color: ${theme.colors.errorFocusBorder};
            box-shadow: ${theme.shadows.inputErrorFocus};
          `
        : css`
            border-color: ${theme.colors.bloodBorderFocus};
            box-shadow: ${theme.shadows.inputFocus};
          `}
  }
`;

export const StyledInput = styled.input<StyledInputStyledProps>`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  padding: ${({ theme }) => theme.spacing.md}
    ${({ theme }) => theme.spacing.lg};
  font-family: ${({ theme, $mono }) =>
    $mono
      ? theme.fonts.mono
      : theme.fonts.ui};
  font-size: ${({ theme }) => theme.fontSizes.input};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textHi};
  width: 100%;
  min-height: ${({ theme }) => theme.layout.touchTarget};

  ${({ theme }) => theme.media.up.lg} {
    font-size: ${({ theme }) => theme.fontSizes.inputDesktop};
    min-height: auto;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textDim};
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: ${({ theme }) => theme.colors.textHi};
    caret-color: ${({ theme }) => theme.colors.textHi};
    -webkit-box-shadow: 0 0 0 ${({ theme }) => theme.sizes.autofillInset}
      ${({ theme }) => theme.colors.surf3} inset;
    transition: background-color ${({ theme }) => theme.motion.durations.autofill}
      ease-in-out 0s;
  }
`;

/* ************** ACCESSORIES ******************* */
export const TrailingSlot = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${({ theme }) => theme.layout.touchTarget};
  min-height: ${({ theme }) => theme.layout.touchTarget};
  padding: 0 ${({ theme }) => theme.spacing.ten} 0 0;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textLow};
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radius.sm};
  transition:
    color ${({ theme }) => theme.transitions.normal},
    background ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.textHi};
    background: ${({ theme }) => theme.colors.overlayMuted};
  }

  &:focus-visible {
    outline: ${({ theme }) => theme.shadows.focusOutline};
    outline-offset: ${({ theme }) => theme.spacing.hairline};
  }
`;

const createFieldErrorIn = (theme: Theme): Keyframes => keyframes`
  from {
    opacity: ${theme.opacity.none};
    transform: translateY(-${theme.motion.offset.xs});
  }
  to {
    opacity: ${theme.opacity.full};
    transform: translateY(0);
  }
`;

export const ErrorMessage = styled.span`
  display: block;
  margin-top: ${({ theme }) => theme.spacing.six};
  padding-left: ${({ theme }) => theme.spacing.xxs};
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: ${({ theme }) => theme.fontSizes.error};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.lineHeights.ui};
  letter-spacing: ${({ theme }) => theme.letterSpacing.micro};
  color: ${({ theme }) => theme.colors.errorSoft};
  animation: ${({ theme }) => createFieldErrorIn(theme)}
    ${({ theme }) => theme.motion.durations.fieldError}
    ${({ theme }) => theme.transitions.premium} both;
`;

export const HintText = styled.span`
  display: block;
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLow};
`;
