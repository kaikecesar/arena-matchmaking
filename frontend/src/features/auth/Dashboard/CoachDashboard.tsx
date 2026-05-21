import type { ReactElement } from 'react'
import { authStrings } from '@/i18n/pt-BR/auth'
import { DashboardPage } from './DashboardPage'

export function CoachDashboard(): ReactElement {
  return (
    <DashboardPage
      title={authStrings.dashboard.coach.title}
      subtitle={authStrings.dashboard.coach.subtitle}
    />
  )
}
