// Core
import type { JSX } from 'react'

// I18n
import { authStrings } from '@/i18n/pt-BR/auth'

// Style
import { AuthBootstrap as AuthBootstrapShell } from '@/views/auth/components/AuthLayout/AuthLayout.style'

function AuthBootstrap(): JSX.Element {
  return (
    <AuthBootstrapShell aria-busy="true">
      {authStrings.bootstrapLoading}
    </AuthBootstrapShell>
  )
}

export { AuthBootstrap }
