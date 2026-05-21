import type { ReactNode } from 'react'

import type { ThemeColorKey } from '@/components/ui/Eyebrow/Eyebrow.types'

export type AuthHeroEyebrowColor = Extract<ThemeColorKey, 'copper' | 'blood'>

export interface AuthHeroProps {
  eyebrow: string
  line1: string
  highlight: string
  subtitle: string
  eyebrowColor?: AuthHeroEyebrowColor | undefined
}

export type AuthHeroEyebrowProps = Pick<AuthHeroProps, 'eyebrow' | 'eyebrowColor'>

export type AuthHeroHeadingProps = Pick<AuthHeroProps, 'line1' | 'highlight'> & {
  children?: ReactNode | undefined
}
