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
  FieldError,
  FieldErrorProps,
} from '.';

/* *************** TEST SUPPORT VARS *************** */

const defaultProps = {
  testId: 'field-error-test',
  message: 'Campo obrigatorio',
} satisfies FieldErrorProps;

const FieldErrorElement = (props: FieldErrorProps): JSX.Element => (
  <ThemeProvider theme={theme}>
    <FieldError {...props} />
  </ThemeProvider>
);

const renderFieldError = (
  overrides: Partial<FieldErrorProps> = {},
): RenderResult => {
  const props: FieldErrorProps = {
    ...defaultProps,
    ...overrides,
  };

  return render(<FieldErrorElement {...props} />);
};

/* *************** TEST EXECUTION *************** */

describe('FieldError', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();
  });

  afterEach((): void => {
    vi.resetAllMocks();
  });

  // DEFAULT PROPS *******************************

  it('should match snapshot when [defaultProps] is passed', (): void => {
    render(<FieldErrorElement {...defaultProps} />);

    expect(screen.getByTestId(defaultProps.testId)).toMatchSnapshot();
  });

  // RENDERING *******************************

  it('should render the error message when a message is provided', (): void => {
    renderFieldError({ message: 'Credenciais invalidas' });

    expect(screen.getByText('Credenciais invalidas')).toBeInTheDocument();
  });

  it('should render the message inside an alert role', (): void => {
    renderFieldError({ message: 'Campo obrigatorio' });

    expect(screen.getByRole('alert')).toHaveTextContent('Campo obrigatorio');
  });

  // EMPTY STATES *******************************

  it('should render nothing when the message is null', (): void => {
    const { container }: RenderResult = renderFieldError({ message: null });

    expect(container).toBeEmptyDOMElement();
  });

  it('should render nothing when the message is an empty string', (): void => {
    const { container }: RenderResult = renderFieldError({ message: '' });

    expect(container).toBeEmptyDOMElement();
  });

  it('should render nothing when the message prop is omitted', (): void => {
    const { container }: RenderResult = render(
      <FieldErrorElement testId={defaultProps.testId} />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('should not expose an alert role when there is no message', (): void => {
    renderFieldError({ message: null });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
