// Core
import type { JSX } from 'react'

// Components
import { DashboardPage } from '@/features/auth/Dashboard/DashboardPage'

// I18n
import { authStrings } from '@/i18n/pt-BR/auth'

function CoachDashboard(): JSX.Element {
  return (
    <DashboardPage
      title={authStrings.dashboard.coach.title}
      subtitle={authStrings.dashboard.coach.subtitle}
      modules={authStrings.dashboard.coach.modules}
    />
  )
}

export { CoachDashboard }
