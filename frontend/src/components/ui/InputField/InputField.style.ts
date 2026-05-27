// Libraries
import styled, { css, keyframes } from 'styled-components';

import { media } from '../../../utils/media';

// Config
import { defaultFonts } from '../../../config/theme';

// Component
import {
  InputWrapperStyledProps,
  StyledInputStyledProps,
} from './InputField.types';

/* ************** LAYOUT ******************* */
export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FieldLabel = styled.label`
  font-family: ${defaultFonts.family.mono};
  font-size: 0.625rem;
  font-weight: ${({ theme }) => theme.font.medium};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.input.label};
  margin-bottom: 0.5rem;
  display: block;
`;

/* ************** INPUT ******************* */
export const InputWrapper = styled.div<InputWrapperStyledProps>`
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  isolation: isolate;
  background-color: ${({ theme }) => theme.color.input.background};
  background-image: linear-gradient(
    180deg,
    ${({ theme }) => theme.color.surface.overlaySubtle} 0%,
    transparent 38%
  );
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 0.5rem;
  border: 0.0625rem solid
    ${({ theme, $hasError }) =>
      $hasError
        ? theme.color.input.borderError
        : theme.color.input.border};
  box-shadow: ${({ theme, $hasError }) => {
    const inset = `inset 0 0.0625rem 0 ${theme.color.surface.overlayMuted}`;
    return $hasError
      ? `${inset}, 0 0 0.75rem ${theme.color.feedback.errorGlow}`
      : `${inset}, 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.16)`;
  }};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  opacity: ${({ $disabled }) =>
    $disabled
      ? 0.55
      : 1};

  &:hover:not(:focus-within) {
    ${({ $hasError, $disabled, theme }) =>
      !$hasError &&
      !$disabled &&
      css`
        border-color: ${theme.color.input.borderHover};
        box-shadow:
          inset 0 0.0625rem 0 ${theme.color.surface.overlayHover},
          0 0.125rem 0.375rem rgba(0, 0, 0, 0.2);
      `}
  }

  &:focus-within {
    ${({ $hasError, theme }) =>
      $hasError
        ? css`
            border-color: ${theme.color.input.borderErrorFocus};
            box-shadow:
              inset 0 0.0625rem 0 ${theme.color.surface.overlayMuted},
              0 0 0.75rem ${theme.color.feedback.errorGlow};
          `
        : css`
            border-color: ${theme.color.input.borderFocus};
            box-shadow:
              inset 0 0.0625rem 0 ${theme.color.surface.overlayInset},
              0 0 0.75rem rgba(210, 38, 56, 0.07);
          `}
  }
`;

export const StyledInput = styled.input<StyledInputStyledProps>`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  padding: 0.75rem 1rem;
  font-family: ${({ $mono }) =>
    $mono
      ? defaultFonts.family.mono
      : defaultFonts.family.ui};
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.font.medium};
  color: ${({ theme }) => theme.color.input.text};
  width: 100%;
  min-height: 2.75rem;

  ${media.up.lg} {
    font-size: 0.9375rem;
    min-height: auto;
  }

  &::placeholder {
    color: ${({ theme }) => theme.color.input.placeholder};
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: ${({ theme }) => theme.color.input.text};
    caret-color: ${({ theme }) => theme.color.input.text};
    -webkit-box-shadow: 0 0 0 62.5rem ${({ theme }) => theme.color.input.background} inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

/* ************** ACCESSORIES ******************* */
export const TrailingSlot = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2.75rem;
  min-height: 2.75rem;
  padding: 0 0.625rem 0 0;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.color.input.trailingIcon};
  flex-shrink: 0;
  border-radius: 0.375rem;
  transition:
    color 0.2s ease,
    background 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.color.input.trailingIconHover};
    background: ${({ theme }) => theme.color.input.trailingBackgroundHover};
  }

  &:focus-visible {
    outline: 0.125rem solid rgba(210, 38, 56, 0.45);
    outline-offset: 0.0625rem;
  }
`;

const fieldErrorIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-0.25rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ErrorMessage = styled.span`
  display: block;
  margin-top: 0.375rem;
  padding-left: 0.125rem;
  font-family: ${defaultFonts.family.ui};
  font-size: 0.6875rem;
  font-weight: ${({ theme }) => theme.font.medium};
  line-height: 1.45;
  letter-spacing: 0.01em;
  color: ${({ theme }) => theme.color.input.errorText};
  animation: ${fieldErrorIn} 0.3s cubic-bezier(0.22, 1, 0.36, 1) both;
`;

export const HintText = styled.span`
  display: block;
  margin-top: 0.25rem;
  font-family: ${defaultFonts.family.ui};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.color.input.hintText};
`;
