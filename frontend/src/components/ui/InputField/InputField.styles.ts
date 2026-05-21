import styled, { css } from 'styled-components';

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FieldLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textLow};
  margin-bottom: 7px;
  display: block;
`;

interface InputWrapperProps {
  $hasError: boolean;
  $disabled: boolean;
}

export const InputWrapper = styled.div<InputWrapperProps>`
  position: relative;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.surf3};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.blood : theme.colors.border1};
  box-shadow: ${({ theme, $hasError }) =>
    $hasError ? `0 0 0 3px ${theme.colors.bloodTint}` : 'none'};
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};

  &:focus-within {
    ${({ $hasError, theme }) =>
      !$hasError &&
      css`
        border-color: ${theme.colors.blood};
        box-shadow: 0 0 0 3px ${theme.colors.bloodTint};
      `}
  }
`;

interface StyledInputProps {
  $mono: boolean;
}

export const StyledInput = styled.input<StyledInputProps>`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  padding: 14px 16px;
  font-family: ${({ theme, $mono }) =>
    $mono ? theme.fonts.mono : theme.fonts.ui};
  font-size: 15px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textHi};
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textDim};
  }

  /* Remove browser autofill background */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px ${({ theme }) => theme.colors.surf3} inset;
    -webkit-text-fill-color: ${({ theme }) => theme.colors.textHi};
    transition: background-color 5000s ease-in-out 0s;
  }
`;

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

  &:hover {
    color: ${({ theme }) => theme.colors.textMid};
  }
`;

export const ErrorMessage = styled.span`
  display: block;
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.blood};
  animation: fadeInDown 0.2s ease;

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
`;

export const HintText = styled.span`
  display: block;
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textLow};
`;
