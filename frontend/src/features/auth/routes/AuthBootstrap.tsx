// Core
import type { ReactElement } from 'react'

// Styles
import { AuthBootstrap as AuthBootstrapShell } from '@/features/auth/components/AuthLayout/AuthLayout.styles'

const AuthBootstrap = (): ReactElement => {
  return <AuthBootstrapShell aria-busy="true">Carregando sessão…</AuthBootstrapShell>
}

export { AuthBootstrap }
