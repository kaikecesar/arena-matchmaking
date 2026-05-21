// Libraries
import styled from 'styled-components'

export const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
  min-height: 22px;
`

export const HiddenInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`

interface VisualBoxProps {
  $checked: boolean
}

export const VisualBox = styled.div<VisualBoxProps>`
  width: 20px;
  height: 20px;
  border-radius: ${({ theme }) => theme.radius.sm};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.normal},
    box-shadow ${({ theme }) => theme.transitions.normal},
    transform ${({ theme }) => theme.transitions.fast};

  ${({ $checked, theme }) =>
    $checked
      ? `
        background: linear-gradient(
          135deg,
          ${theme.colors.blood} 0%,
          ${theme.colors.bloodSoft} 100%
        );
        border: none;
        box-shadow: 0 2px 8px rgba(210, 38, 56, 0.28);
      `
      : `
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.04) 0%,
          transparent 100%
        ),
          ${theme.colors.surf3};
        border: 1px solid ${theme.colors.border2};
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
      `}

  ${CheckboxWrapper}:hover & {
    border-color: ${({ theme, $checked }) =>
      $checked
        ? 'transparent'
        : theme.colors.border2};
    transform: scale(1.02);
  }

  ${CheckboxWrapper}:active & {
    transform: scale(0.98);
  }
`

export const CheckboxLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textMid};
  line-height: 1.3;
`
