// Core
import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { JSX } from 'react';
import type { RenderResult } from '@testing-library/react';

// Libraries
import { ThemeProvider } from 'styled-components';

// Components
import { Eyebrow } from '@/components/ui/Eyebrow';

// Config
import { theme } from '@/styles';

// Types
import type { EyebrowProps } from '@/components/ui/Eyebrow/Eyebrow.types';

/* *************** TEST SUPPORT VARS *************** */

const defaultProps: EyebrowProps = {
  children: 'SYSTEM TAGLINE',
};

const renderEyebrow = (overrides: Partial<EyebrowProps> = {}): RenderResult => {
  const props: EyebrowProps = {
    ...defaultProps,
    ...overrides,
  };

  const element: JSX.Element = (
    <ThemeProvider theme={theme}>
      <Eyebrow {...props} />
    </ThemeProvider>
  );

  return render(element);
};

/* *************** TEST EXECUTION *************** */

describe('Eyebrow', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();
  });

  afterEach((): void => {
    vi.resetAllMocks();
  });

  // CHILDREN *******************************

  it('should render the text content', (): void => {
    renderEyebrow({ children: 'PAINEL DO ORGANIZADOR' });

    expect(screen.getByText('PAINEL DO ORGANIZADOR')).toBeInTheDocument();
  });

  it('should render nested element children', (): void => {
    renderEyebrow({
      children: <span data-testid="nested-child">Destaque</span>,
    });

    expect(screen.getByTestId('nested-child')).toBeInTheDocument();
  });

  // COLOR *******************************

  it('should render without a color override by default', (): void => {
    renderEyebrow();

    expect(screen.getByText(defaultProps.children as string)).toBeInTheDocument();
  });

  it('should accept the copper color without breaking rendering', (): void => {
    renderEyebrow({ $color: 'copper' });

    expect(screen.getByText(defaultProps.children as string)).toBeInTheDocument();
  });

  it('should accept the blood color without breaking rendering', (): void => {
    renderEyebrow({ $color: 'blood' });

    expect(screen.getByText(defaultProps.children as string)).toBeInTheDocument();
  });
});
