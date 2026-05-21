import type { ReactElement } from 'react'
import { Eyebrow } from '@/components/ui/Eyebrow'
import {
  HeroBlock,
  HeroEyebrowWrapper,
  HeroHeading,
  HeroHighlight,
  HeroSubtitle,
} from '../AuthLayout/AuthLayout.styles'

type AuthHeroProps = {
  eyebrow: string
  line1: string
  highlight: string
  subtitle: string
  eyebrowColor?: 'copper' | 'blood'
}

export function AuthHero({
  eyebrow,
  line1,
  highlight,
  subtitle,
  eyebrowColor = 'copper',
}: AuthHeroProps): ReactElement {
  return (
    <HeroBlock>
      <HeroEyebrowWrapper>
        <Eyebrow $color={eyebrowColor}>{eyebrow}</Eyebrow>
      </HeroEyebrowWrapper>
      <HeroHeading>
        {line1} <HeroHighlight>{highlight}</HeroHighlight>
      </HeroHeading>
      <HeroSubtitle>{subtitle}</HeroSubtitle>
    </HeroBlock>
  )
}
