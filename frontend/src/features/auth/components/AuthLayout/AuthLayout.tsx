// Core
import type { ReactElement } from 'react'

// Components
import { BrandMark } from '@/components/ui/BrandMark'

// Types
import type { AuthLayoutProps } from './AuthLayout.types'

// Styles
import {
  Card,
  GlowBlood,
  GlowCopper,
  LoginHeader,
  PageShell,
} from '@/features/auth/components/AuthLayout/AuthLayout.styles'

const AuthLayout = ({ children, footer, wide = false }: AuthLayoutProps): ReactElement => {
  return (
    <PageShell>
      <GlowBlood />
      <GlowCopper />
      <Card $wide={wide}>
        <LoginHeader>
          <BrandMark size={28} />
        </LoginHeader>
        {children}
        {footer}
      </Card>
    </PageShell>
  )
}

export { AuthLayout }
