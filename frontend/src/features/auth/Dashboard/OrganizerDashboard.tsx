// Core
import type { JSX } from 'react'

// Components
import { DashboardPage } from '@/features/auth/Dashboard/DashboardPage'

// I18n
import { authStrings } from '@/i18n/pt-BR/auth'

function OrganizerDashboard(): JSX.Element {
  return (
    <DashboardPage
      title={authStrings.dashboard.organizer.title}
      subtitle={authStrings.dashboard.organizer.subtitle}
      modules={authStrings.dashboard.organizer.modules}
    />
  )
}

export { OrganizerDashboard }
