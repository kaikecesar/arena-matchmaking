// Core
import type { ReactElement } from 'react'

// Types
import type { EyebrowProps } from '@/components/ui/Eyebrow/Eyebrow.types'

// Styles
import { StyledEyebrow } from '@/components/ui/Eyebrow/Eyebrow.styles'

const Eyebrow = ({ children, $color }: EyebrowProps): ReactElement => (
  <StyledEyebrow
    {...($color !== undefined
      ? { $color }
      : {})}
  >
    {children}
  </StyledEyebrow>
)

export { Eyebrow }
