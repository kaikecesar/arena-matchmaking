import type { ReactElement, ReactNode } from 'react'
import { WarningIcon } from '@/components/icons'
import { GeneralErrorBox, GeneralErrorText } from '../AuthLayout/AuthLayout.styles'

type AuthAlertProps = {
  message: string
  icon?: ReactNode
}

export function AuthAlert({ message, icon }: AuthAlertProps): ReactElement {
  return (
    <GeneralErrorBox role="alert" aria-live="polite">
      {icon ?? <WarningIcon />}
      <GeneralErrorText>{message}</GeneralErrorText>
    </GeneralErrorBox>
  )
}
