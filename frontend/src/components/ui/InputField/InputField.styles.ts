// Libraries
import styled, { css } from 'styled-components'

/* *************************************************************************************************
********************************************** LAYOUT **********************************************
************************************************************************************************* */
export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const FieldLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textLow};
  margin-bottom: 8px;
  display: block;
`

/* *************************************************************************************************
********************************************** INPUT ***********************************************
************************************************************************************************* */
interface InputWrapperProps {
  $hasError: boolean
  $disabled: boolean
}

export const InputWrapper = styled.div<InputWrapperProps>`
  position: relative;
  display: flex;
  align-items: center;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.035) 0%,
    rgba(255, 255, 255, 0) 38%
  ),
    ${({ theme }) => theme.colors.surf3};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError
        ? theme.colors.blood
        : theme.colors.border1};
  box-shadow: ${({ theme, $hasError }) =>
    $hasError
      ? `inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 3px ${theme.colors.bloodTint}`
      : 'inset 0 1px 0 rgba(255,255,255,0.05), 0 1px 2px rgba(0,0,0,0.18)'};
  transition:
    border-color ${({ theme }) => theme.transitions.normal},
    box-shadow ${({ theme }) => theme.transitions.normal},
    background ${({ theme }) => theme.transitions.normal};
  opacity: ${({ $disabled }) =>
    $disabled
      ? 0.55
      : 1};

  &:hover:not(:focus-within) {
    ${({ $hasError, $disabled, theme }) =>
      !$hasError &&
      !$disabled &&
      css`
        border-color: ${theme.colors.border2};
        box-shadow:
          inset 0 1px 0 rgba(255, 255, 255, 0.06),
          0 2px 6px rgba(0, 0, 0, 0.2);
      `}
  }

  &:focus-within {
    ${({ $hasError, theme }) =>
      !$hasError &&
      css`
        border-color: rgba(210, 38, 56, 0.65);
        box-shadow:
          inset 0 1px 0 rgba(255, 255, 255, 0.06),
          0 0 0 3px ${theme.colors.bloodTint},
          0 4px 14px rgba(210, 38, 56, 0.12);
      `}
  }
`

interface StyledInputProps {
  $mono: boolean
}

export const StyledInput = styled.input<StyledInputProps>`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  padding: 13px 16px;
  font-family: ${({ theme, $mono }) =>
    $mono
      ? theme.fonts.mono
      : theme.fonts.ui};
  font-size: 15px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textHi};
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textDim};
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px ${({ theme }) => theme.colors.surf3} inset;
    -webkit-text-fill-color: ${({ theme }) => theme.colors.textHi};
    transition: background-color 5000s ease-in-out 0s;
  }
`

/* *************************************************************************************************
******************************************* ACCESSORIES ********************************************
************************************************************************************************* */
export const TrailingSlot = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 14px 0 0;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textLow};
  flex-shrink: 0;
  transition: color ${({ theme }) => theme.transitions.normal};

  &:hover {
    color: ${({ theme }) => theme.colors.textHi};
  }
`

export const ErrorMessage = styled.span`
  display: block;
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.blood};
  animation: fadeInDown 0.28s cubic-bezier(0.22, 1, 0.36, 1) both;

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

export const HintText = styled.span`
  display: block;
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textLow};
`
