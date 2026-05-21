// Libraries
import styled from 'styled-components';

export const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  user-select: none;
`;

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
`;

interface VisualBoxProps {
  $checked: boolean;
}

export const VisualBox = styled.div<VisualBoxProps>`
  width: 18px;
  height: 18px;
  border-radius: ${({ theme }) => theme.radius.sm};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease, border-color 0.15s ease;

  ${({ $checked, theme }) =>
    $checked
      ? `
        background: linear-gradient(
          135deg,
          ${theme.colors.blood} 0%,
          ${theme.colors.bloodSoft} 100%
        );
        border: none;
      `
      : `
        background: ${theme.colors.surf3};
        border: 1px solid ${theme.colors.border2};
      `}
`;

export const CheckboxLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textMid};
`;
