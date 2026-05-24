// Core
import type { JSX } from 'react'

// Components
import { BrandMark } from '@/components/ui/BrandMark'
import { AuthContextPanel } from '@/views/auth/components/AuthContextPanel/AuthContextPanel'

// Types
import type { AuthLayoutProps } from './AuthLayout.types'

// Style
import {
  Card,
  GlowBlood,
  GlowCopper,
  LoginHeader,
  PageShell,
  PrimaryColumn,
} from '@/views/auth/components/AuthLayout/AuthLayout.style'

function AuthLayout({ children, footer, wide = false }: AuthLayoutProps): JSX.Element {
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
