// Core
import type { ReactElement } from 'react'

// Components
import { WarningIcon } from '@/components/icons'

// Types
import type { AuthAlertProps } from './AuthAlert.types'

// Styles
import { GeneralErrorBox, GeneralErrorText } from '@/features/auth/components/AuthLayout/AuthLayout.style'

const AuthAlert = ({ message, icon }: AuthAlertProps): ReactElement => {
  return (
    <GeneralErrorBox role="alert" aria-live="polite">
      {icon ?? <WarningIcon />}
      <GeneralErrorText>{message}</GeneralErrorText>
    </GeneralErrorBox>
  )
}

export { AuthAlert }
