import React from 'react'
import type { EyebrowProps } from './Eyebrow.types'
import { StyledEyebrow } from './Eyebrow.styles'

const Eyebrow = ({ children, $color }: EyebrowProps): React.ReactElement => {
  return (
    <StyledEyebrow $color={$color}>
      {children}
    </StyledEyebrow>
  )
}

export { Eyebrow }
