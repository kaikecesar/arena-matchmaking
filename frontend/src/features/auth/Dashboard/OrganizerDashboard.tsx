import type { ReactElement } from 'react'
import { authStrings } from '@/i18n/pt-BR/auth'
import { DashboardPage } from './DashboardPage'

export function OrganizerDashboard(): ReactElement {
  return (
    <DashboardPage
      title={authStrings.dashboard.organizer.title}
      subtitle={authStrings.dashboard.organizer.subtitle}
    />
  )
}
