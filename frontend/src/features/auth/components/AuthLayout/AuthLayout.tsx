// Core
import type { ReactElement } from 'react'

// Components
import { BrandMark } from '@/components/ui/BrandMark'
import { AuthContextPanel } from '@/features/auth/components/AuthContextPanel/AuthContextPanel'

// Types
import type { AuthLayoutProps } from './AuthLayout.types'

// Styles
import {
  Card,
  GlowBlood,
  GlowCopper,
  LoginHeader,
  PageShell,
  PrimaryColumn,
} from '@/features/auth/components/AuthLayout/AuthLayout.styles'

const AuthLayout = ({ children, footer, wide = false }: AuthLayoutProps): ReactElement => {
  return (
    <PageShell>
      <PrimaryColumn>
        <GlowBlood aria-hidden />
        <GlowCopper aria-hidden />
        <Card $wide={wide}>
          <LoginHeader>
            <BrandMark size={32} />
          </LoginHeader>
          {children}
          {footer}
        </Card>
      </PrimaryColumn>
      <AuthContextPanel />
    </PageShell>
  )
}

export { AuthLayout }
