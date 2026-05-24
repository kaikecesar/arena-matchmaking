// Core
import type { JSX } from 'react'

// Components
import { Eyebrow } from '@/components/ui/Eyebrow'

// Types
import type { AuthHeroProps } from './AuthHero.types'

// Style
import {
  HeroBlock,
  HeroEyebrowWrapper,
  HeroHeading,
  HeroHighlight,
  HeroSubtitle,
} from '@/views/auth/components/AuthLayout/AuthLayout.style'

function AuthHero({
  eyebrow,
  line1,
  highlight,
  subtitle,
  eyebrowColor = 'copper',
}: AuthHeroProps): JSX.Element {
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

export { AuthHero }
