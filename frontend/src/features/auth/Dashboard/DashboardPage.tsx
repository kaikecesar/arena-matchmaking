// Core
import type { ReactElement } from 'react'

// Components
import { BrandMark } from '@/components/ui/BrandMark'
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'

// Hooks
import { useAuth } from '@/features/auth/hooks/useAuth'

// I18n
import { authStrings } from '@/i18n/pt-BR/auth'

// Types
import type { DashboardModule } from '@/features/auth/Dashboard/DashboardPage.types'
import { UserRole } from '@/features/auth/types'

// Styles
import {
  DashboardCard,
  DashboardGlow,
  DashboardHeader,
  DashboardHeaderStart,
  DashboardMain,
  DashboardOperator,
  DashboardOperatorName,
  DashboardOperatorRole,
  DashboardShell,
  DashboardSubtitle,
  DashboardViewport,
  DashboardTitle,
  ModuleGrid,
  ModuleHint,
  ModuleLabel,
  ModulesHeading,
  ModuleTile,
  ModuleValue,
  StatusMeta,
  StatusPill,
  StatusStrip,
} from '@/features/auth/Dashboard/Dashboard.style'

type DashboardPageProps = {
  title: string
  subtitle: string
  modules: readonly DashboardModule[]
}

const DASHBOARD_ROLE_LABEL: Record<UserRole, string> = {
  [UserRole.organizer]: authStrings.dashboard.roleLabels.organizer,
  [UserRole.athlete]: authStrings.dashboard.roleLabels.athlete,
  [UserRole.coach]: authStrings.dashboard.roleLabels.coach,
}

const DashboardPage = ({
  title,
  subtitle,
  modules,
}: DashboardPageProps): ReactElement => {
  const { user, logout, isSubmitting } = useAuth()

  return (
    <DashboardShell>
      <DashboardGlow aria-hidden />
      <DashboardViewport>
        <DashboardHeader>
          <DashboardHeaderStart>
            <BrandMark size={32} />
            {user && (
              <DashboardOperator>
                <DashboardOperatorName>{user.name}</DashboardOperatorName>
                <DashboardOperatorRole>
                  {DASHBOARD_ROLE_LABEL[user.role]}
                </DashboardOperatorRole>
              </DashboardOperator>
            )}
          </DashboardHeaderStart>
          <Button
            type={ButtonType.button}
            variant={ButtonVariant.ghost}
            size={ButtonSize.small}
            label={authStrings.dashboard.logout}
            onClick={() => void logout()}
            loading={isSubmitting}
          />
        </DashboardHeader>

        <DashboardMain>
          <StatusStrip>
            <StatusPill>{authStrings.dashboard.sessionLive}</StatusPill>
            <StatusMeta>
              {authStrings.dashboard.lastSync}: {authStrings.dashboard.lastSyncValue}
            </StatusMeta>
          </StatusStrip>

          <DashboardCard>
            <Eyebrow $color="copper">{authStrings.dashboard.eyebrow}</Eyebrow>
            <DashboardTitle>{title}</DashboardTitle>
            <DashboardSubtitle>{subtitle}</DashboardSubtitle>
          </DashboardCard>

          <ModulesHeading>{authStrings.dashboard.modulesHeading}</ModulesHeading>
          <ModuleGrid>
            {modules.map((module) => (
              <ModuleTile key={module.label}>
                <ModuleLabel>{module.label}</ModuleLabel>
                <ModuleValue>{module.value}</ModuleValue>
                <ModuleHint>{module.hint}</ModuleHint>
              </ModuleTile>
            ))}
          </ModuleGrid>
        </DashboardMain>
      </DashboardViewport>
    </DashboardShell>
  )
}

export { DashboardPage }
