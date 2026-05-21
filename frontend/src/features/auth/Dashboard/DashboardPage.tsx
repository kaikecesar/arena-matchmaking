import type { ReactElement } from 'react'
import { BrandMark } from '@/components/ui/BrandMark'
import { Button, ButtonSize, ButtonType, ButtonVariant } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { authStrings } from '@/i18n/pt-BR/auth'
import {
  DashboardCard,
  DashboardHeader,
  DashboardShell,
  DashboardSubtitle,
  DashboardTitle,
  DashboardMeta,
} from './Dashboard.styles'

type DashboardPageProps = {
  title: string
  subtitle: string
}

export function DashboardPage({ title, subtitle }: DashboardPageProps): ReactElement {
  const { user, logout, isSubmitting } = useAuth()

  return (
    <DashboardShell>
      <DashboardHeader>
        <BrandMark size={32} />
        <Button
          type={ButtonType.button}
          variant={ButtonVariant.ghost}
          size={ButtonSize.small}
          label={authStrings.dashboard.logout}
          onClick={() => void logout()}
          loading={isSubmitting}
        />
      </DashboardHeader>

      <DashboardCard>
        <Eyebrow $color="copper">{authStrings.dashboard.eyebrow}</Eyebrow>
        <DashboardTitle>{title}</DashboardTitle>
        <DashboardSubtitle>{subtitle}</DashboardSubtitle>
        {user && (
          <DashboardMeta>
            Operador: {user.name} · {user.role}
          </DashboardMeta>
        )}
      </DashboardCard>
    </DashboardShell>
  )
}
