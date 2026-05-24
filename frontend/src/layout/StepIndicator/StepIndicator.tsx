// Core
import type { JSX } from 'react'

// I18n
import { authStrings } from '@/i18n/pt-BR/auth'

// Types
import type { StepIndicatorProps } from './StepIndicator.types'

// Style
import { StepIndicatorRow, StepItem, StepLabel } from '@/layout/AuthLayout/AuthLayout.style'

function StepIndicator({ steps, currentStep }: StepIndicatorProps): JSX.Element {
  return (
    <StepIndicatorRow aria-label={authStrings.a11yStepProgress}>
      {steps.map((label, index) => (
        <StepItem
          key={label}
          $active={index === currentStep}
          $done={index < currentStep}
          aria-current={
            index === currentStep
              ? 'step'
              : undefined
          }
        >
          <StepLabel $active={index === currentStep}>{label}</StepLabel>
        </StepItem>
      ))}
    </StepIndicatorRow>
  )
}

export { StepIndicator }
