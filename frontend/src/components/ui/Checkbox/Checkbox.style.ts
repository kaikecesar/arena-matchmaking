// Config
import { defaultFonts } from '../../../config/theme';

// Types
import { VisualBoxStyledProps } from './Checkbox.types';

// Libraries
import styled, { css } from 'styled-components';

export const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  cursor: pointer;
  user-select: none;
  min-height: 2.75rem;
  padding: 0.25rem 0;
`;

export const HiddenInput = styled.input`
  position: absolute;
  width: 0.0625rem;
  height: 0.0625rem;
  padding: 0;
  margin: -0.0625rem;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

export const VisualBox = styled.div<VisualBoxStyledProps>`
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 0.375rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.15s ease;

  ${({ $checked, theme }) =>
    $checked
      ? css`
          background: ${theme.color.checkbox.backgroundChecked};
          border: 0.0625rem solid ${theme.color.checkbox.borderChecked};
          box-shadow: none;
        `
      : css`
          background:
            linear-gradient(180deg, ${theme.color.surface.overlayMuted} 0%, transparent 100%),
            ${theme.color.checkbox.background};
          border: 0.0625rem solid ${theme.color.checkbox.border};
          box-shadow: inset 0 0.0625rem 0 ${theme.color.surface.overlayMuted};
        `}

  ${CheckboxWrapper}:hover & {
    border-color: ${({ theme, $checked }) =>
      $checked
        ? theme.color.checkbox.borderChecked
        : theme.color.checkbox.border};
    transform: scale(1.02);
  }

  ${CheckboxWrapper}:active & {
    transform: scale(0.98);
  }

  ${CheckboxWrapper}:focus-within & {
    box-shadow: 0 0 0 0.1875rem rgba(210, 38, 56, 0.11);
  }
`;

export const CheckboxLabel = styled.span`
  font-family: ${defaultFonts.family.ui};
  font-size: 0.8125rem;
  font-weight: ${({ theme }) => theme.font.medium};
  color: ${({ theme }) => theme.color.checkbox.label};
  line-height: 1.3;
`;
