import type { ReactElement } from 'react'
import { authStrings } from '@/i18n/pt-BR/auth'
import { DashboardPage } from './DashboardPage'

export function AthleteDashboard(): ReactElement {
  return (
    <DashboardPage
      title={authStrings.dashboard.athlete.title}
      subtitle={authStrings.dashboard.athlete.subtitle}
    />
  )
}
