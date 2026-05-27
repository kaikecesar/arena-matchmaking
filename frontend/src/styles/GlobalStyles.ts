// Config
import { defaultFonts } from '@/config/theme';

// Libraries
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
    overflow: hidden;
    height: 100%;
  }

  body {
    background-color: ${({ theme }) => theme.color.surface.app};
    color: ${({ theme }) => theme.color.text.high};
    font-family: ${defaultFonts.family.ui};
    font-size: 0.9375rem;
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    overflow: hidden;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    opacity: 0.35;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.014) 0.0625rem, transparent 0.0625rem),
      linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.014) 0.0625rem,
        transparent 0.0625rem
      );
    background-size: 2.5rem 2.5rem;
    mask-image: radial-gradient(ellipse 75% 65% at 42% 0%, black 18%, transparent 70%);
  }

  #root {
    position: relative;
    z-index: 0;
    height: 100%;
    overflow: hidden;
  }

  ::selection {
    background: rgba(210, 38, 56, 0.28);
    color: ${({ theme }) => theme.color.text.high};
  }

  :focus-visible {
    outline: 0.125rem solid rgba(210, 38, 56, 0.45);
    outline-offset: 0.25rem;
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
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
    }
  }
`;
