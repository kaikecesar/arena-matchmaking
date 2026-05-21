// Core
import type { ReactElement } from 'react'

// Components
import { DashboardPage } from '@/features/auth/Dashboard/DashboardPage'

// Constants
import { authStrings } from '@/i18n/pt-BR/auth'

const CoachDashboard = (): ReactElement => {
  return (
    <DashboardPage
      title={authStrings.dashboard.coach.title}
      subtitle={authStrings.dashboard.coach.subtitle}
    />
  )
}

export { CoachDashboard }
