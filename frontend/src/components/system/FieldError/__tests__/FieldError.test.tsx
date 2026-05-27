// Core
import { render, screen } from '@testing-library/react';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import type { JSX } from 'react';
import type { RenderResult } from '@testing-library/react';

// Libraries
import { ThemeProvider } from 'styled-components';

// Components
import { FieldError } from '@/components/system/FieldError';

// Config
import { theme } from '@/styles';

// Types
import type { FieldErrorProps } from '@/components/system/FieldError/FieldError.types';

/* *************** TEST SUPPORT VARS *************** */

const renderFieldError = (
  overrides: Partial<FieldErrorProps> = {},
): RenderResult => {
  const props: FieldErrorProps = {
    message: 'Campo obrigatorio',
    ...overrides,
  };

  const element: JSX.Element = (
    <ThemeProvider theme={theme}>
      <FieldError {...props} />
    </ThemeProvider>
  );

  return render(element);
};

/* *************** TEST EXECUTION *************** */

describe('FieldError', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();
  });

  afterEach((): void => {
    vi.resetAllMocks();
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
    const element: JSX.Element = (
      <ThemeProvider theme={theme}>
        <FieldError />
      </ThemeProvider>
    );

    const { container }: RenderResult = render(element);

    expect(container).toBeEmptyDOMElement();
  });

  it('should not expose an alert role when there is no message', (): void => {
    renderFieldError({ message: null });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
