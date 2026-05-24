// Core
import type { ReactElement } from 'react'

// I18n
import { authStrings } from '@/i18n/pt-BR/auth'

// Types
import type { StepIndicatorProps } from './StepIndicator.types'

// Styles
import { StepIndicatorRow, StepItem, StepLabel } from '@/features/auth/components/AuthLayout/AuthLayout.styles'

const StepIndicator = ({ steps, currentStep }: StepIndicatorProps): ReactElement => {
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
