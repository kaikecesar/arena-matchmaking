// Core
import { createRef, JSX, RefObject } from 'react';

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
  InputField,
  InputFieldProps,
  InputFieldType,
} from '../../InputField';

/* *************** TEST SUPPORT VARS *************** */
const defaultProps: InputFieldProps = {
  label: 'E-mail',
  name: 'identifier',
  type: InputFieldType.text,
  value: 'fighter@example.com',
  onChange: vi.fn<InputFieldProps['onChange']>(),
  onBlur: vi.fn<NonNullable<InputFieldProps['onBlur']>>(),
  placeholder: 'Digite seu e-mail',
  autoComplete: 'username',
};

const TrailingIcon = (): JSX.Element => (
  <svg data-testid="trailing-icon" aria-hidden="true" />
);

const renderInputField = (
  overrides: Partial<InputFieldProps> = {},
): RenderResult => {
  const props: InputFieldProps = {
    ...defaultProps,
    ...overrides,
  };

  const element: JSX.Element = (
    <ThemeProvider theme={theme}>
      <InputField {...props} />
    </ThemeProvider>
  );

  return render(element);
};

/* *************** TEST EXECUTION *************** */
describe('InputField', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();
  });

  afterEach((): void => {
    vi.resetAllMocks();
  });

  it('renders the field label', (): void => {
    renderInputField();

    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
  });

  it('associates the label with the input id derived from name', (): void => {
    renderInputField();

    const input: HTMLInputElement = screen.getByLabelText<HTMLInputElement>(defaultProps.label);

    expect(input.id).toBe(defaultProps.name);
  });

  it('uses a custom id when one is provided', (): void => {
    renderInputField({ id: 'custom-identifier' });

    const input: HTMLInputElement = screen.getByLabelText<HTMLInputElement>(defaultProps.label);

    expect(input.id).toBe('custom-identifier');
  });

  it('defaults the input type to text', (): void => {
    renderInputField({ type: undefined });

    const input: HTMLInputElement = screen.getByLabelText<HTMLInputElement>(defaultProps.label);

    expect(input.type).toBe('text');
  });

  it('respects an explicit password type', (): void => {
    renderInputField({ type: InputFieldType.password });

    const input: HTMLInputElement = screen.getByLabelText<HTMLInputElement>(defaultProps.label);

    expect(input.type).toBe('password');
  });

  it('respects an explicit email type', (): void => {
    renderInputField({ type: InputFieldType.email });

    const input: HTMLInputElement = screen.getByLabelText<HTMLInputElement>(defaultProps.label);

    expect(input.type).toBe('email');
  });

  it('propagates the input name attribute', (): void => {
    renderInputField({ name: 'loginIdentifier' });

    const input: HTMLInputElement = screen.getByLabelText<HTMLInputElement>(defaultProps.label);

    expect(input.name).toBe('loginIdentifier');
  });

  it('renders the controlled value', (): void => {
    renderInputField({ value: 'coach@example.com' });

    const input: HTMLInputElement = screen.getByLabelText<HTMLInputElement>(defaultProps.label);

    expect(input.value).toBe('coach@example.com');
  });

  it('renders the provided placeholder', (): void => {
    renderInputField({ placeholder: 'Informe seu e-mail' });

    const input: HTMLInputElement = screen.getByPlaceholderText<HTMLInputElement>(
      'Informe seu e-mail'
    );

    expect(input).toBeInTheDocument();
  });

  it('renders the provided autocomplete attribute', (): void => {
    renderInputField({ autoComplete: 'current-password' });

    const input: HTMLInputElement = screen.getByLabelText<HTMLInputElement>(defaultProps.label);

    expect(input.autocomplete).toBe('current-password');
  });

  it('keeps the input enabled by default', (): void => {
    renderInputField();

    const input: HTMLInputElement = screen.getByLabelText<HTMLInputElement>(defaultProps.label);

    expect(input.disabled).toBe(false);
  });

  it('applies the disabled attribute when requested', (): void => {
    renderInputField({ disabled: true });

    const input: HTMLInputElement = screen.getByLabelText<HTMLInputElement>(defaultProps.label);

    expect(input.disabled).toBe(true);
  });

  it('sets aria-invalid to false when there is no error', (): void => {
    renderInputField();

    const input: HTMLInputElement = screen.getByLabelText<HTMLInputElement>(defaultProps.label);

    expect(input).toHaveAttribute('aria-invalid', 'false');
  });

  it('sets aria-invalid to true when there is an error', (): void => {
    renderInputField({ error: 'Campo obrigatorio' });

    const input: HTMLInputElement = screen.getByLabelText<HTMLInputElement>(defaultProps.label);

    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('omits aria-describedby when there is no error', (): void => {
    renderInputField();

    const input: HTMLInputElement = screen.getByLabelText<HTMLInputElement>(defaultProps.label);

    expect(input).not.toHaveAttribute('aria-describedby');
  });

  it('links aria-describedby to the default error id when an error exists', (): void => {
    renderInputField({ error: 'Campo obrigatorio' });

    const input: HTMLInputElement = screen.getByLabelText<HTMLInputElement>(defaultProps.label);

    expect(input).toHaveAttribute('aria-describedby', 'identifier-error');
  });

  it('links aria-describedby to the custom error id when a custom id exists', (): void => {
    renderInputField({
      id: 'email-field',
      error: 'Campo obrigatorio',
    });

    const input: HTMLInputElement = screen.getByLabelText<HTMLInputElement>(defaultProps.label);

    expect(input).toHaveAttribute('aria-describedby', 'email-field-error');
  });

  it('renders the error message as an alert', (): void => {
    renderInputField({ error: 'Campo obrigatorio' });

    expect(screen.getByRole('alert')).toHaveTextContent('Campo obrigatorio');
  });

  it('hides the hint when an error is present', (): void => {
    renderInputField({
      error: 'Campo obrigatorio',
      hint: 'Esse hint nao deve aparecer',
    });

    expect(screen.queryByText('Esse hint nao deve aparecer')).not.toBeInTheDocument();
  });

  it('renders the hint when there is no error', (): void => {
    renderInputField({ hint: 'Use o e-mail cadastrado no evento' });

    expect(screen.getByText('Use o e-mail cadastrado no evento')).toBeInTheDocument();
  });

  it('does not render hint text when hint is not provided', (): void => {
    renderInputField();

    expect(screen.queryByText('Use o e-mail cadastrado no evento')).not.toBeInTheDocument();
  });

  it('does not render a trailing icon button when trailingIcon is absent', (): void => {
    renderInputField();

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders a trailing icon button when trailingIcon is provided', (): void => {
    renderInputField({
      trailingIcon: <TrailingIcon />,
      trailingIconAriaLabel: 'Mostrar senha',
    });

    expect(screen.getByRole('button', { name: 'Mostrar senha' })).toBeInTheDocument();
  });

  it('applies the provided aria-label to the trailing icon button', (): void => {
    renderInputField({
      trailingIcon: <TrailingIcon />,
      trailingIconAriaLabel: 'Ocultar senha',
    });

    expect(screen.getByRole('button', { name: 'Ocultar senha' })).toBeInTheDocument();
  });

  it('calls onTrailingIconClick when the trailing icon button is clicked', (): void => {
    const onTrailingIconClick: Mock<NonNullable<InputFieldProps['onTrailingIconClick']>> =
      vi.fn();

    renderInputField({
      trailingIcon: <TrailingIcon />,
      trailingIconAriaLabel: 'Mostrar senha',
      onTrailingIconClick,
    });

    fireEvent.click(screen.getByRole('button', { name: 'Mostrar senha' }));

    expect(onTrailingIconClick).toHaveBeenCalledTimes(1);
  });

  it(
    'does not throw when the trailing icon button is clicked without a click handler',
    (): void => {
    renderInputField({
      trailingIcon: <TrailingIcon />,
      trailingIconAriaLabel: 'Mostrar senha',
    });

    expect((): void => {
      fireEvent.click(screen.getByRole('button', { name: 'Mostrar senha' }));
    }).not.toThrow();
    }
  );

  it('forwards the ref to the underlying input element', (): void => {
    const ref: RefObject<HTMLInputElement | null> = createRef<HTMLInputElement>();

    const element: JSX.Element = (
      <ThemeProvider theme={theme}>
        <InputField {...defaultProps} ref={ref} />
      </ThemeProvider>
    );

    render(element);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.name).toBe(defaultProps.name);
  });

  it('calls onChange when the input value changes', (): void => {
    const onChange: Mock<InputFieldProps['onChange']> = vi.fn();

    renderInputField({ onChange });

    fireEvent.change(screen.getByLabelText<HTMLInputElement>(defaultProps.label), {
      target: { value: 'updated@example.com' },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur when the input loses focus', (): void => {
    const onBlur: Mock<NonNullable<InputFieldProps['onBlur']>> = vi.fn();

    renderInputField({ onBlur });

    fireEvent.blur(screen.getByLabelText<HTMLInputElement>(defaultProps.label));

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('renders the trailing icon accessory as a button element', (): void => {
    renderInputField({
      trailingIcon: <TrailingIcon />,
      trailingIconAriaLabel: 'Mostrar senha',
    });

    expect(screen.getByRole('button', { name: 'Mostrar senha' })).toHaveAttribute(
      'type',
      'button'
    );
  });

  it('updates the rendered value when the controlled prop changes', (): void => {
    const { rerender }: RenderResult = renderInputField({ value: 'first@example.com' });

    const rerenderedElement: JSX.Element = (
      <ThemeProvider theme={theme}>
        <InputField {...defaultProps} value="second@example.com" />
      </ThemeProvider>
    );

    rerender(rerenderedElement);

    const input: HTMLInputElement = screen.getByLabelText<HTMLInputElement>(defaultProps.label);

    expect(input.value).toBe('second@example.com');
  });
});
