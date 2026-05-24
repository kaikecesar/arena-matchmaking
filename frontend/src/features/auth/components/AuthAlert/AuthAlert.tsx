// Core
import type { JSX } from 'react'

// Components
import { WarningIcon } from '@/components/icons'

// Types
import type { AuthAlertProps } from './AuthAlert.types'

// Style
import { GeneralErrorBox, GeneralErrorText } from '@/features/auth/components/AuthLayout/AuthLayout.style'

function AuthAlert({ message, icon }: AuthAlertProps): JSX.Element {
  return (
    <GeneralErrorBox role="alert" aria-live="polite">
      {icon ?? <WarningIcon />}
      <GeneralErrorText>{message}</GeneralErrorText>
    </GeneralErrorBox>
  )
}

export { AuthAlert }
