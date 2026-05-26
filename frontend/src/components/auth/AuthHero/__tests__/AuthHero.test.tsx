// Core
import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { JSX } from 'react';
import type { RenderResult } from '@testing-library/react';

// Libraries
import { ThemeProvider } from 'styled-components';

// Components
import { AuthHero } from '@/components/auth/AuthHero';

// Config
import { theme } from '@/styles';

// Types
import type { AuthHeroProps } from '@/components/auth/AuthHero/AuthHero.types';

/* *************** TEST SUPPORT VARS *************** */

const defaultProps: AuthHeroProps = {
  eyebrow: 'SYSTEM TAGLINE',
  line1: 'Controle o proximo',
  highlight: 'card.',
  subtitle: 'Fluxo autenticado do matchmaking.',
};

const renderAuthHero = (overrides: Partial<AuthHeroProps> = {}): RenderResult => {
  const props: AuthHeroProps = {
    ...defaultProps,
    ...overrides,
  };

  const element: JSX.Element = (
    <ThemeProvider theme={theme}>
      <AuthHero {...props} />
    </ThemeProvider>
  );

  return render(element);
};

/* *************** TEST EXECUTION *************** */

describe('AuthHero', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();
  });

  afterEach((): void => {
    vi.resetAllMocks();
  });

  // CONTENT *******************************

  it('should render the eyebrow text', (): void => {
    renderAuthHero({ eyebrow: 'PAINEL DO ORGANIZADOR' });

    expect(screen.getByText('PAINEL DO ORGANIZADOR')).toBeInTheDocument();
  });

  it('should render the first heading line', (): void => {
    renderAuthHero({ line1: 'Controle o proximo' });

    expect(screen.getByText(/Controle o proximo/)).toBeInTheDocument();
  });

  it('should render the highlighted heading fragment', (): void => {
    renderAuthHero({ highlight: 'card.' });

    expect(screen.getByText('card.')).toBeInTheDocument();
  });

  it('should render the subtitle text', (): void => {
    renderAuthHero({ subtitle: 'Fluxo autenticado do matchmaking.' });

    expect(screen.getByText('Fluxo autenticado do matchmaking.')).toBeInTheDocument();
  });

  // EYEBROW COLOR *******************************

  it('should render with the default eyebrow color when none is provided', (): void => {
    renderAuthHero();

    expect(screen.getByText(defaultProps.eyebrow)).toBeInTheDocument();
  });

  it('should accept the copper eyebrow color without breaking rendering', (): void => {
    renderAuthHero({ eyebrowColor: 'copper' });

    expect(screen.getByText(defaultProps.eyebrow)).toBeInTheDocument();
  });

  it('should accept the blood eyebrow color without breaking rendering', (): void => {
    renderAuthHero({ eyebrowColor: 'blood' });

    expect(screen.getByText(defaultProps.eyebrow)).toBeInTheDocument();
  });
});
