// Libraries
import styled, { css } from 'styled-components'

// Types
import type { VisualBoxStyledProps } from '@/components/ui/Checkbox/Checkbox.types'

export const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.ten};
  cursor: pointer;
  user-select: none;
  min-height: ${({ theme }) => theme.layout.touchTarget};
  padding: ${({ theme }) => theme.spacing.xs} 0;
`

export const HiddenInput = styled.input`
  position: absolute;
  width: ${({ theme }) => theme.borders.hairline};
  height: ${({ theme }) => theme.borders.hairline};
  padding: 0;
  margin: -${({ theme }) => theme.borders.hairline};
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`

export const VisualBox = styled.div<VisualBoxStyledProps>`
  width: ${({ theme }) => theme.sizes.checkbox};
  height: ${({ theme }) => theme.sizes.checkbox};
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
      ? css`
          background: ${theme.colors.surf3};
          border: ${theme.borders.hairline} solid ${theme.colors.blood};
          box-shadow: none;
        `
      : css`
          background: ${theme.gradients.checkboxUnchecked}, ${theme.colors.surf3};
          border: ${theme.borders.hairline} solid ${theme.colors.border2};
          box-shadow: ${theme.shadows.checkboxUnchecked};
        `}

  ${CheckboxWrapper}:hover & {
    border-color: ${({ theme, $checked }) =>
      $checked
        ? theme.colors.blood
        : theme.colors.border2};
    transform: scale(${({ theme }) => theme.motion.scale.hoverUp});
  }

  ${CheckboxWrapper}:active & {
    transform: scale(${({ theme }) => theme.motion.scale.activeDown});
  }

  ${CheckboxWrapper}:focus-within & {
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }
`

export const CheckboxLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: ${({ theme }) => theme.fontSizes.caption};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textMid};
  line-height: ${({ theme }) => theme.lineHeights.compact};
`
