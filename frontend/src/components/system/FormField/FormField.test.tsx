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
  FormField,
  FormFieldProps,
} from '.';

/* *************** TEST SUPPORT VARS *************** */

const defaultProps = {
  testId: 'form-field-test',
  label: 'E-mail',
  htmlFor: 'identifier',
  children: <input id="identifier" />,
} satisfies FormFieldProps;

const FormFieldElement = (props: FormFieldProps): JSX.Element => (
  <ThemeProvider theme={theme}>
    <FormField {...props} />
  </ThemeProvider>
);

const renderFormField = (
  overrides: Partial<FormFieldProps> = {},
): RenderResult => {
  const props: FormFieldProps = {
    ...defaultProps,
    ...overrides,
  };

  return render(<FormFieldElement {...props} />);
};

/* *************** TEST EXECUTION *************** */

describe('FormField', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();
  });

  afterEach((): void => {
    vi.resetAllMocks();
  });

  // DEFAULT PROPS *******************************

  it('should match snapshot when [defaultProps] is passed', (): void => {
    render(<FormFieldElement {...defaultProps} />);

    expect(screen.getByTestId(defaultProps.testId)).toMatchSnapshot();
  });

  // LABEL *******************************

  it('should render the provided label', (): void => {
    renderFormField({ label: 'Senha' });

    expect(screen.getByText('Senha')).toBeInTheDocument();
  });

  it('should associate the label with the field through htmlFor', (): void => {
    renderFormField({ label: 'E-mail', htmlFor: 'identifier' });

    const input: HTMLInputElement = screen.getByLabelText<HTMLInputElement>('E-mail');

    expect(input.id).toBe('identifier');
  });

  // CHILDREN *******************************

  it('should render the children control', (): void => {
    renderFormField({
      children: <input id="identifier" data-testid="form-control" />,
    });

    expect(screen.getByTestId('form-control')).toBeInTheDocument();
  });

  // HELP TEXT: HINT *******************************

  it('should render the hint when no error is present', (): void => {
    renderFormField({ hint: 'Use o e-mail cadastrado no evento' });

    expect(screen.getByText('Use o e-mail cadastrado no evento')).toBeInTheDocument();
  });

  it('should not render any help text when neither error nor hint is provided', (): void => {
    renderFormField();

    expect(screen.queryByText('Use o e-mail cadastrado no evento')).not.toBeInTheDocument();
  });

  // HELP TEXT: ERROR *******************************

  it('should render the error message when an error is present', (): void => {
    renderFormField({ error: 'Campo obrigatório' });

    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
  });

  it('should prioritize the error over the hint when both are present', (): void => {
    renderFormField({
      error: 'Campo obrigatório',
      hint: 'Esse hint não deve aparecer',
    });

    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
    expect(screen.queryByText('Esse hint não deve aparecer')).not.toBeInTheDocument();
  });
});
