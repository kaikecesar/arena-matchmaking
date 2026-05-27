// Core
import type { JSX } from 'react';

// Types
import type { BrandMarkProps } from '@/components/ui/BrandMark/BrandMark.types';

// Style
import {
  BrandMarkWrapper,
  IconBox,
  Wordmark,
  WordmarkArena,
  WordmarkSub,
} from '@/components/ui/BrandMark/BrandMark.style';

function BrandMark({
  size = 28,
}: BrandMarkProps): JSX.Element {
  const iconSize = Math.round(size * 0.57); // ~16px at default 28

  return (
    <BrandMarkWrapper>
      <IconBox $size={size}>
        {/* Stylised "A" arrow mark — points up like a fighting stance */}
        <svg width={iconSize} height={iconSize} viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M8 2L13 12H3L8 2Z"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M5.5 8.5H10.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </IconBox>
      <Wordmark>
        <WordmarkArena>ARENA</WordmarkArena>
        <WordmarkSub>MATCHMAKING</WordmarkSub>
      </Wordmark>
    </BrandMarkWrapper>
  );
}

export { BrandMark };

