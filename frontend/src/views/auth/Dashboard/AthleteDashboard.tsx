// Core
import type { JSX } from 'react'

// Components
import { DashboardPage } from '@/views/auth/Dashboard/DashboardPage'

// I18n
import { authStrings } from '@/i18n/pt-BR/auth'

function AthleteDashboard(): JSX.Element {
  return (
    <DashboardPage
      title={authStrings.dashboard.athlete.title}
      subtitle={authStrings.dashboard.athlete.subtitle}
      modules={authStrings.dashboard.athlete.modules}
    />
  )
}

export { AthleteDashboard }
