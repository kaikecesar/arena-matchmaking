// Libraries
import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
    overflow-x: hidden;
  }

  body {
    background-color: ${({ theme }) => theme.colors.bgApp};
    color: ${({ theme }) => theme.colors.textHi};
    font-family: ${({ theme }) => theme.fonts.ui};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    line-height: ${({ theme }) => theme.lineHeights.body};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100dvh;
    min-height: 100svh;
    overflow-x: hidden;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: ${({ theme }) => theme.zIndex.base};
    opacity: ${({ theme }) => theme.opacity.grid};
    background-image:
      ${({ theme }) => theme.gradients.gridLineH},
      ${({ theme }) => theme.gradients.gridLineV};
    background-size: ${({ theme }) => theme.effects.gridSize}
      ${({ theme }) => theme.effects.gridSize};
    mask-image: ${({ theme }) => theme.gradients.gridMask};
  }

  #root {
    position: relative;
    z-index: ${({ theme }) => theme.zIndex.base};
    min-height: 100dvh;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.bloodSelection};
    color: ${({ theme }) => theme.colors.textHi};
  }

  :focus-visible {
    outline: ${({ theme }) => theme.shadows.focusOutlineSoft};
    outline-offset: ${({ theme }) => theme.spacing.xs};
  }

  :focus:not(:focus-visible) {
    outline: none;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  input,
  textarea {
    font-family: inherit;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      transition-duration: ${({ theme }) => theme.motion.durations.reduced} !important;
      animation-duration: ${({ theme }) => theme.motion.durations.reduced} !important;
      animation-iteration-count: 1 !important;
    }
  }
`
