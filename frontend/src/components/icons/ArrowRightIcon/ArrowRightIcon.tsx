import React from 'react'

import type { IconProps } from './ArrowRightIcon.types'
import { StyledIcon } from './ArrowRightIcon.styles'

const ArrowRightIcon: React.FC<IconProps> = ({ size = 18, title = 'Proceed' }) => {
  return (
    <StyledIcon
      width={size}
      height={size}
      viewBox="0 0 18 18"
      aria-hidden={title ? undefined : 'true'}
      role={title ? 'img' : undefined}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M3.75 9H14.25M14.25 9L9.75 4.5M14.25 9L9.75 13.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledIcon>
  )
}

export { ArrowRightIcon }
