import type { ReactElement } from 'react'
import { AuthBootstrap as AuthBootstrapShell } from '@/features/auth/components/AuthLayout/AuthLayout.styles'

export function AuthBootstrap(): ReactElement {
  return <AuthBootstrapShell aria-busy="true">Carregando sessão…</AuthBootstrapShell>
}
