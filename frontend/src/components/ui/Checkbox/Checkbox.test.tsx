// Core
import { JSX } from 'react';

// Config
import { theme } from '@/styles';

// Libraries
import {
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  Mock,
  vi,
} from 'vitest';

// Component
import {
  Checkbox,
  CheckboxProps,
} from '.';

/* *************** TEST SUPPORT VARS *************** */

const defaultProps = {
  testId: 'checkbox-test',
  checked: false,
  onChange: vi.fn<CheckboxProps['onChange']>(),
  label: 'Manter conectado',
  name: 'keepSession',
} satisfies CheckboxProps;

const CheckboxElement = (props: CheckboxProps): JSX.Element => (
  <ThemeProvider theme={theme}>
    <Checkbox {...props} />
  </ThemeProvider>
);

const renderCheckbox = (
  overrides: Partial<CheckboxProps> = {},
): RenderResult => {
  const props: CheckboxProps = {
    ...defaultProps,
    ...overrides,
  };

  return render(<CheckboxElement {...props} />);
};

/* *************** TEST EXECUTION *************** */

describe('Checkbox', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();
  });

  afterEach((): void => {
    vi.resetAllMocks();
  });

  // DEFAULT PROPS *******************************

  it('should match snapshot when [defaultProps] is passed', (): void => {
    render(<CheckboxElement {...defaultProps} />);

    expect(screen.getByTestId(defaultProps.testId)).toMatchSnapshot();
  });

  // LABEL *******************************

  it('should render the provided label', (): void => {
    renderCheckbox({ label: 'Aceito os termos' });

    expect(screen.getByText('Aceito os termos')).toBeInTheDocument();
  });

  // NAME & ID *******************************

  it('should derive the input id from the name when no id is provided', (): void => {
    renderCheckbox({ name: 'keepSession' });

    const input: HTMLInputElement = screen.getByLabelText<HTMLInputElement>(defaultProps.label);

    expect(input.id).toBe('keepSession');
  });

  it('should use a custom id when one is provided', (): void => {
    renderCheckbox({ id: 'custom-keep-session' });

    const input: HTMLInputElement = screen.getByLabelText<HTMLInputElement>(defaultProps.label);

    expect(input.id).toBe('custom-keep-session');
  });

  it('should propagate the name attribute to the input', (): void => {
    renderCheckbox({ name: 'rememberMe' });

    const input: HTMLInputElement = screen.getByLabelText<HTMLInputElement>(defaultProps.label);

    expect(input.name).toBe('rememberMe');
  });

  // CHECKED STATE *******************************

  it('should render unchecked when checked is false', (): void => {
    renderCheckbox({ checked: false });

    const input: HTMLInputElement = screen.getByLabelText<HTMLInputElement>(defaultProps.label);

    expect(input.checked).toBe(false);
  });

  it('should render checked when checked is true', (): void => {
    renderCheckbox({ checked: true });

    const input: HTMLInputElement = screen.getByLabelText<HTMLInputElement>(defaultProps.label);

    expect(input.checked).toBe(true);
  });

  // ON CHANGE *******************************

  it('should call onChange with true when toggled on', (): void => {
    const onChange: Mock<CheckboxProps['onChange']> = vi.fn();

    renderCheckbox({ checked: false, onChange });

    fireEvent.click(screen.getByLabelText<HTMLInputElement>(defaultProps.label));

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('should call onChange with false when toggled off', (): void => {
    const onChange: Mock<CheckboxProps['onChange']> = vi.fn();

    renderCheckbox({ checked: true, onChange });

    fireEvent.click(screen.getByLabelText<HTMLInputElement>(defaultProps.label));

    expect(onChange).toHaveBeenCalledWith(false);
  });
});
