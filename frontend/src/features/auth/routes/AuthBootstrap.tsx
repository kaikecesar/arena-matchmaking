// Core
import type { ReactElement } from 'react'

// I18n
import { authStrings } from '@/i18n/pt-BR/auth'

// Styles
import { AuthBootstrap as AuthBootstrapShell } from '@/features/auth/components/AuthLayout/AuthLayout.styles'

const AuthBootstrap = (): ReactElement => {
  return (
    <AuthBootstrapShell aria-busy="true">
      {authStrings.bootstrapLoading}
    </AuthBootstrapShell>
  )
}

export { AuthBootstrap }
