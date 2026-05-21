// Core
import type { ReactElement } from 'react'

// Components
import { DashboardPage } from '@/features/auth/Dashboard/DashboardPage'

// Constants
import { authStrings } from '@/i18n/pt-BR/auth'

const AthleteDashboard = (): ReactElement => {
  return (
    <DashboardPage
      title={authStrings.dashboard.athlete.title}
      subtitle={authStrings.dashboard.athlete.subtitle}
    />
  )
}

export { AthleteDashboard }
