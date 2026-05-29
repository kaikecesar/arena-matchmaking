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
  Button,
  ButtonProps,
  ButtonType,
  ButtonVariant,
} from '.';

/* *************** TEST SUPPORT VARS *************** */

const defaultProps = {
  testId: 'button-test',
  label: 'Acessar painel',
} satisfies ButtonProps;

const ButtonElement = (props: ButtonProps): JSX.Element => (
  <ThemeProvider theme={theme}>
    <Button {...props} />
  </ThemeProvider>
);

const renderButton = (
  overrides: Partial<ButtonProps> = {},
): RenderResult => {
  const props: ButtonProps = {
    ...defaultProps,
    ...overrides,
  };

  return render(<ButtonElement {...props} />);
};

/* *************** TEST EXECUTION *************** */

describe('Button', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();
  });

  afterEach((): void => {
    vi.resetAllMocks();
  });

  // DEFAULT PROPS *******************************

  it('should match snapshot when [defaultProps] is passed', (): void => {
    render(<ButtonElement {...defaultProps} />);

    expect(screen.getByTestId(defaultProps.testId)).toMatchSnapshot();
  });

  // LABEL *******************************

  it('should render the provided label', (): void => {
    renderButton({ label: 'Criar agora' });

    expect(screen.getByRole('button', { name: 'Criar agora' })).toBeInTheDocument();
  });

  // TYPE *******************************

  it('should default the button type to button', (): void => {
    renderButton();

    const button: HTMLButtonElement = screen.getByRole<HTMLButtonElement>('button');

    expect(button.type).toBe('button');
  });

  it('should respect an explicit submit type', (): void => {
    renderButton({ type: ButtonType.submit });

    const button: HTMLButtonElement = screen.getByRole<HTMLButtonElement>('button');

    expect(button.type).toBe('submit');
  });

  // CLICK *******************************

  it('should call onClick when clicked', (): void => {
    const onClick: Mock<NonNullable<ButtonProps['onClick']>> = vi.fn();

    renderButton({ onClick });

    fireEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  // DISABLED *******************************

  it('should be enabled by default', (): void => {
    renderButton();

    const button: HTMLButtonElement = screen.getByRole<HTMLButtonElement>('button');

    expect(button.disabled).toBe(false);
  });

  it('should be disabled when the disabled prop is true', (): void => {
    renderButton({ disabled: true });

    const button: HTMLButtonElement = screen.getByRole<HTMLButtonElement>('button');

    expect(button.disabled).toBe(true);
  });

  it('should not call onClick when disabled', (): void => {
    const onClick: Mock<NonNullable<ButtonProps['onClick']>> = vi.fn();

    renderButton({ disabled: true, onClick });

    fireEvent.click(screen.getByRole('button'));

    expect(onClick).not.toHaveBeenCalled();
  });

  // LOADING *******************************

  it('should be disabled while loading', (): void => {
    renderButton({ loading: true });

    const button: HTMLButtonElement = screen.getByRole<HTMLButtonElement>('button');

    expect(button.disabled).toBe(true);
  });

  it('should expose aria-busy while loading', (): void => {
    renderButton({ loading: true });

    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('should hide the label while loading', (): void => {
    renderButton({ label: 'Acessar painel', loading: true });

    expect(screen.queryByText('Acessar painel')).not.toBeInTheDocument();
  });

  it('should render the spinner while loading', (): void => {
    const { container }: RenderResult = renderButton({ loading: true });

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  // ARIA LABEL *******************************

  it('should apply the provided aria-label when not loading', (): void => {
    renderButton({ label: 'Acessar painel', 'aria-label': 'Entrar no sistema' });

    expect(
      screen.getByRole('button', { name: 'Entrar no sistema' })
    ).toBeInTheDocument();
  });

  // ICONS *******************************

  it('should render a leading icon when provided', (): void => {
    renderButton({
      leadingIcon: <span data-testid="leading-icon">L</span>,
    });

    expect(screen.getByTestId('leading-icon')).toBeInTheDocument();
  });

  it('should render a trailing icon when provided', (): void => {
    renderButton({
      trailingIcon: <span data-testid="trailing-icon">T</span>,
    });

    expect(screen.getByTestId('trailing-icon')).toBeInTheDocument();
  });

  it('should not render icons while loading', (): void => {
    renderButton({
      loading: true,
      leadingIcon: <span data-testid="leading-icon">L</span>,
      trailingIcon: <span data-testid="trailing-icon">T</span>,
    });

    expect(screen.queryByTestId('leading-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('trailing-icon')).not.toBeInTheDocument();
  });

  // VARIANT *******************************

  it('should accept the bone variant without breaking rendering', (): void => {
    renderButton({ variant: ButtonVariant.bone });

    expect(screen.getByRole('button', { name: defaultProps.label })).toBeInTheDocument();
  });

  it('should accept the ghost variant without breaking rendering', (): void => {
    renderButton({ variant: ButtonVariant.ghost });

    expect(screen.getByRole('button', { name: defaultProps.label })).toBeInTheDocument();
  });
});
