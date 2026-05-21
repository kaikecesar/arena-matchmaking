// Core
import type { ReactElement } from 'react'

// Components
import { DashboardPage } from '@/features/auth/Dashboard/DashboardPage'

// Constants
import { authStrings } from '@/i18n/pt-BR/auth'

const OrganizerDashboard = (): ReactElement => {
  return (
    <DashboardPage
      title={authStrings.dashboard.organizer.title}
      subtitle={authStrings.dashboard.organizer.subtitle}
      modules={authStrings.dashboard.organizer.modules}
    />
  )
}

export { OrganizerDashboard }
