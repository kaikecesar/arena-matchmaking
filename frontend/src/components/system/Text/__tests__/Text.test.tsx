// Core
import { Text } from '@/components/system/Text';
import { TextVariant } from '@/components/system/Text/Text.types';
import type { TextProps } from '@/components/system/Text/Text.types';
import { theme } from '@/styles';
import { render, screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import type { JSX } from 'react';
import { ThemeProvider } from 'styled-components';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
/* *************** TEST SUPPORT VARS *************** */

const renderText = (
  overrides: Partial<TextProps> = {},
): RenderResult => {
  const props: TextProps = {
    children: 'Texto de exemplo',
    ...overrides,
  };

  const element: JSX.Element = (
    <ThemeProvider theme={theme}>
      <Text {...props} />
    </ThemeProvider>
  );

  return render(element);
};

/* *************** TEST EXECUTION *************** */

describe('Text', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();
  });

  afterEach((): void => {
    vi.resetAllMocks();
  });

  // CHILDREN *******************************

  it('should render the text content', (): void => {
    renderText({ children: 'Conexao protegida' });

    expect(screen.getByText('Conexao protegida')).toBeInTheDocument();
  });

  it('should render nested element children', (): void => {
    renderText({
      children: <strong data-testid="nested-child">Destaque</strong>,
    });

    expect(screen.getByTestId('nested-child')).toBeInTheDocument();
  });

  // VARIANTS *******************************

  it('should render with the default variant when none is provided', (): void => {
    renderText({ children: 'Texto padrao' });

    expect(screen.getByText('Texto padrao')).toBeInTheDocument();
  });

  it('should accept the label variant without breaking rendering', (): void => {
    renderText({ variant: TextVariant.label, children: 'Rotulo' });

    expect(screen.getByText('Rotulo')).toBeInTheDocument();
  });

  it('should accept the eyebrow variant without breaking rendering', (): void => {
    renderText({ variant: TextVariant.eyebrow, children: 'Sobrancelha' });

    expect(screen.getByText('Sobrancelha')).toBeInTheDocument();
  });

  it('should accept the heading variant without breaking rendering', (): void => {
    renderText({ variant: TextVariant.heading, children: 'Titulo' });

    expect(screen.getByText('Titulo')).toBeInTheDocument();
  });

  it('should accept the subheading variant without breaking rendering', (): void => {
    renderText({ variant: TextVariant.subheading, children: 'Subtitulo' });

    expect(screen.getByText('Subtitulo')).toBeInTheDocument();
  });
});
