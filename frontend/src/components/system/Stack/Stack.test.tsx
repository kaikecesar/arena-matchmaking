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
  Stack,
  StackAlign,
  StackDirection,
  StackGap,
  StackJustify,
  StackProps,
} from '.';

/* *************** TEST SUPPORT VARS *************** */

const defaultProps = {
  testId: 'stack-test',
  children: <span data-testid="stack-child">Conteudo</span>,
} satisfies StackProps;

const StackElement = (props: StackProps): JSX.Element => (
  <ThemeProvider theme={theme}>
    <Stack {...props} />
  </ThemeProvider>
);

const renderStack = (
  overrides: Partial<StackProps> = {},
): RenderResult => {
  const props: StackProps = {
    ...defaultProps,
    ...overrides,
  };

  return render(<StackElement {...props} />);
};

/* *************** TEST EXECUTION *************** */

describe('Stack', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();
  });

  afterEach((): void => {
    vi.resetAllMocks();
  });

  // DEFAULT PROPS *******************************

  it('should match snapshot when [defaultProps] is passed', (): void => {
    render(<StackElement {...defaultProps} />);

    expect(screen.getByTestId(defaultProps.testId)).toMatchSnapshot();
  });

  // CHILDREN *******************************

  it('should render the children content', (): void => {
    renderStack();

    expect(screen.getByTestId('stack-child')).toBeInTheDocument();
  });

  it('should render multiple children in order', (): void => {
    renderStack({
      children: (
        <>
          <span data-testid="first-child">Primeiro</span>
          <span data-testid="second-child">Segundo</span>
        </>
      ),
    });

    expect(screen.getByTestId('first-child')).toBeInTheDocument();
    expect(screen.getByTestId('second-child')).toBeInTheDocument();
  });

  // PROPS *******************************

  it('should render with default props when none are provided', (): void => {
    renderStack();

    expect(screen.getByTestId('stack-child')).toBeInTheDocument();
  });

  it('should accept a custom direction without breaking rendering', (): void => {
    renderStack({ direction: StackDirection.row });

    expect(screen.getByTestId('stack-child')).toBeInTheDocument();
  });

  it('should accept a custom gap without breaking rendering', (): void => {
    renderStack({ gap: StackGap.lg });

    expect(screen.getByTestId('stack-child')).toBeInTheDocument();
  });

  it('should accept a custom align without breaking rendering', (): void => {
    renderStack({ align: StackAlign.center });

    expect(screen.getByTestId('stack-child')).toBeInTheDocument();
  });

  it('should accept a custom justify without breaking rendering', (): void => {
    renderStack({ justify: StackJustify.spaceBetween });

    expect(screen.getByTestId('stack-child')).toBeInTheDocument();
  });
});
