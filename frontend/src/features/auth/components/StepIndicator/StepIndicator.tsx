import type { ReactElement } from 'react'
import { StepIndicatorRow, StepItem, StepLabel } from '../AuthLayout/AuthLayout.styles'

type StepIndicatorProps = {
  steps: readonly string[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps): ReactElement {
  return (
    <StepIndicatorRow aria-label="Progresso do cadastro">
      {steps.map((label, index) => (
        <StepItem
          key={label}
          $active={index === currentStep}
          $done={index < currentStep}
          aria-current={index === currentStep ? 'step' : undefined}
        >
          <StepLabel $active={index === currentStep}>{label}</StepLabel>
        </StepItem>
      ))}
    </StepIndicatorRow>
  )
}
