// Core
import type { ReactElement } from 'react'

// Components
import { Eyebrow } from '@/components/ui/Eyebrow'

// Types
import type { AuthHeroProps } from './AuthHero.types'

// Styles
import {
  HeroBlock,
  HeroEyebrowWrapper,
  HeroHeading,
  HeroHighlight,
  HeroSubtitle,
} from '@/features/auth/components/AuthLayout/AuthLayout.style'

const AuthHero = ({
  eyebrow,
  line1,
  highlight,
  subtitle,
  eyebrowColor = 'copper',
}: AuthHeroProps): ReactElement => {
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
