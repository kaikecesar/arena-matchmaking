// Core
import { JSX } from 'react';

// Config
import { theme } from '@/styles';

// Libraries
import { render, RenderResult, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

// Component
import {
  Eyebrow,
  EyebrowProps,
} from '.';

/* *************** TEST SUPPORT VARS *************** */

const defaultProps = {
  testId: 'eyebrow-test',
  children: 'SYSTEM TAGLINE',
} satisfies EyebrowProps;

const EyebrowElement = (props: EyebrowProps): JSX.Element => (
  <ThemeProvider theme={theme}>
    <Eyebrow {...props} />
  </ThemeProvider>
);

const renderEyebrow = (
  overrides: Partial<EyebrowProps> = {},
): RenderResult => {
  const props: EyebrowProps = {
    ...defaultProps,
    ...overrides,
  };

  return render(<EyebrowElement {...props} />);
};

/* *************** TEST EXECUTION *************** */

describe('Eyebrow', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();
  });

  afterEach((): void => {
    vi.resetAllMocks();
  });

  // DEFAULT PROPS *******************************

  it('should match snapshot when [defaultProps] is passed', (): void => {
    render(<EyebrowElement {...defaultProps} />);

    expect(screen.getByTestId(defaultProps.testId)).toMatchSnapshot();
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
