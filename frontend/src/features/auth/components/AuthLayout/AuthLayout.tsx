import type { ReactElement, ReactNode } from 'react'
import { BrandMark } from '@/components/ui/BrandMark'
import { Card, GlowBlood, GlowCopper, LoginHeader, PageShell } from './AuthLayout.styles'

type AuthLayoutProps = {
  children: ReactNode
  footer?: ReactNode
  wide?: boolean
}

export function AuthLayout({ children, footer, wide = false }: AuthLayoutProps): ReactElement {
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
