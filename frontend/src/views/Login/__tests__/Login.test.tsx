// Core
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { JSX, ReactNode } from 'react';
import type { RenderResult } from '@testing-library/react';

// Libraries
import { ThemeProvider } from 'styled-components';
import type { UseFormRegister, UseFormStateReturn } from 'react-hook-form';

// Views
import { Login } from '@/views/Login/Login';

// Routes
import { ROUTES } from '@/routes/routes';

// Config
import { theme } from '@/styles';

// Types
import type { LoginFormValues } from '@/plugins/schemas';
import type { UseLoginFormReturn } from '@/views/Login/Login.types';

// Mock Dependencies
const { mockNavigate, mockUseLoginForm, mockedAuthStrings } = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
  mockUseLoginForm: vi.fn(),
  mockedAuthStrings: {
    systemTagline: 'SYSTEM TAGLINE',
    heroLine1: 'Controle o proximo',
    heroHighlight: 'card.',
    heroSubtitle: 'Fluxo autenticado do matchmaking.',
    fieldEmailLabel: 'E-mail',
    fieldPasswordLabel: 'Senha',
    keepSession: 'Manter conectado',
    forgotPassword: 'Esqueci a senha',
    submitButton: 'Acessar painel',
    noAccount: 'Sem conta?',
    createAccount: 'Criar agora',
    securityBadge: 'Conexao protegida',
    errorEmptyIdentifier: 'Informe seu e-mail',
    errorEmptyPassword: 'Informe sua senha',
    a11yShowPassword: 'Mostrar senha',
    a11yHidePassword: 'Ocultar senha',
    a11yLoading: 'Acessando painel...',
    a11yLoginForm: 'Formulario de acesso ao painel',
  },
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');

  return {
    ...(actual as Record<string, unknown>),
    useNavigate: (): typeof mockNavigate => mockNavigate,
  };
});

vi.mock('@/i18n/pt-BR/auth', () => ({
  authStrings: mockedAuthStrings,
}));

vi.mock('@/views/Login/useLoginForm', () => ({
  useLoginForm: (): UseLoginFormReturn => mockUseLoginForm(),
}));

vi.mock('@/layout/AuthLayout/AuthLayout', () => ({
  AuthLayout: ({
    children,
    footer,
  }: {
    children: ReactNode;
    footer?: ReactNode | undefined;
  }): JSX.Element => (
    <section data-testid="auth-layout">
      <div>{children}</div>
      <footer>{footer}</footer>
    </section>
  ),
}));

vi.mock('@/components/auth/AuthHero/AuthHero', () => ({
  AuthHero: ({
    eyebrow,
    line1,
    highlight,
    subtitle,
  }: {
    eyebrow: string;
    line1: string;
    highlight: string;
    subtitle: string;
  }): JSX.Element => (
    <header data-testid="auth-hero">
      <span>{eyebrow}</span>
      <h1>
        {line1} {highlight}
      </h1>
      <p>{subtitle}</p>
    </header>
  ),
}));

/* *************** TEST SUPPORT VARS *************** */

type RegisterFieldReturn = ReturnType<UseFormRegister<LoginFormValues>>;

interface LoginHookFixture {
  hookReturn: UseLoginFormReturn;
  identifierOnBlur: ReturnType<typeof vi.fn>;
  passwordOnChange: ReturnType<typeof vi.fn>;
  passwordOnBlur: ReturnType<typeof vi.fn>;
}

const createFormState = (
  overrides: Partial<UseFormStateReturn<LoginFormValues>> = {}
): UseFormStateReturn<LoginFormValues> => ({
  errors: {},
  touchedFields: {},
  isSubmitted: false,
  ...overrides,
} as unknown as UseFormStateReturn<LoginFormValues>);

const createRegisterField = (
  name: keyof LoginFormValues,
  overrides: Partial<RegisterFieldReturn> = {}
): RegisterFieldReturn => ({
  name,
  onBlur: vi.fn(),
  onChange: vi.fn(),
  ref: vi.fn(),
  ...overrides,
} as unknown as RegisterFieldReturn);

const createLoginHookFixture = (
  overrides: Partial<UseLoginFormReturn> = {}
): LoginHookFixture => {
  const identifierOnBlur = vi.fn();
  const passwordOnChange = vi.fn();
  const passwordOnBlur = vi.fn();

  const identifierField: RegisterFieldReturn = createRegisterField('identifier', {
    onBlur: identifierOnBlur,
  });
  const passwordField: RegisterFieldReturn = createRegisterField('password', {
    onChange: passwordOnChange,
    onBlur: passwordOnBlur,
  });

  const register: UseFormRegister<LoginFormValues> = ((
    name: keyof LoginFormValues
  ): RegisterFieldReturn => {
    if (name === 'identifier') {
      return identifierField;
    }

    if (name === 'password') {
      return passwordField;
    }

    return createRegisterField('keepSession');
  }) as UseFormRegister<LoginFormValues>;

  return {
    hookReturn: {
      state: {
        ui: {
          identifierDisplayValue: 'fighter@example.com',
          isPasswordVisible: false,
        },
        async: {
          generalError: null,
        },
      },
      register,
      formState: createFormState(),
      errors: {},
      handleSubmit: vi.fn(),
      isLoading: false,
      togglePasswordVisibility: vi.fn(),
      keepSession: true,
      onKeepSessionChange: vi.fn(),
      onIdentifierChange: vi.fn(),
      passwordValue: 'Secret123',
      ...overrides,
    },
    identifierOnBlur,
    passwordOnChange,
    passwordOnBlur,
  };
};

function renderLogin(): RenderResult {
  return render(
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  );
}

/* *************** TEST EXECUTION *************** */

describe('Login View', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();
    mockUseLoginForm.mockReturnValue(createLoginHookFixture().hookReturn);
  });

  afterEach((): void => {
    vi.resetAllMocks();
  });

  // ELEMENTS *******************************

  it('should render the auth hero, footer content and named login form', (): void => {
    renderLogin();

    expect(screen.getByTestId('auth-hero')).toBeInTheDocument();
    expect(screen.getByText(mockedAuthStrings.systemTagline)).toBeInTheDocument();
    expect(screen.getByText(mockedAuthStrings.noAccount)).toBeInTheDocument();
    expect(
      screen.getByRole('form', { name: mockedAuthStrings.a11yLoginForm })
    ).toBeInTheDocument();
  });

  it('should render the identifier field with the current value and login attributes', (): void => {
    renderLogin();

    const identifierInput = screen.getByLabelText(
      mockedAuthStrings.fieldEmailLabel
    ) as HTMLInputElement;

    expect(identifierInput.value).toBe('fighter@example.com');
    expect(identifierInput.name).toBe('identifier');
    expect(identifierInput.autocomplete).toBe('username');
    expect(identifierInput.type).toBe('text');
  });

  // FIELD: PASSWORD VISIBILITY *******************************

  it('should render the password field as password input when visibility is off', (): void => {
    renderLogin();

    const passwordInput = screen.getByLabelText(
      mockedAuthStrings.fieldPasswordLabel
    ) as HTMLInputElement;

    expect(passwordInput.type).toBe('password');
    expect(passwordInput.value).toBe('Secret123');
    expect(
      screen.getByRole('button', { name: mockedAuthStrings.a11yShowPassword })
    ).toBeInTheDocument();
  });

  it('should render the password field as text input when visibility is on', (): void => {
    const fixture: LoginHookFixture = createLoginHookFixture({
      state: {
        ui: {
          identifierDisplayValue: 'fighter@example.com',
          isPasswordVisible: true,
        },
        async: {
          generalError: null,
        },
      },
    });

    mockUseLoginForm.mockReturnValue(fixture.hookReturn);

    renderLogin();

    const passwordInput = screen.getByLabelText(
      mockedAuthStrings.fieldPasswordLabel
    ) as HTMLInputElement;

    expect(passwordInput.type).toBe('text');
    expect(
      screen.getByRole('button', { name: mockedAuthStrings.a11yHidePassword })
    ).toBeInTheDocument();
  });

  // FIELD: IDENTIFIER DELEGATION *******************************

  it('should delegate identifier changes to the hook callback', (): void => {
    const fixture: LoginHookFixture = createLoginHookFixture();

    mockUseLoginForm.mockReturnValue(fixture.hookReturn);

    renderLogin();

    fireEvent.change(screen.getByLabelText(mockedAuthStrings.fieldEmailLabel), {
      target: { value: 'updated@example.com' },
    });

    expect(fixture.hookReturn.onIdentifierChange).toHaveBeenCalledTimes(1);
  });

  it('should delegate identifier blur to the registered field handler', (): void => {
    const fixture: LoginHookFixture = createLoginHookFixture();

    mockUseLoginForm.mockReturnValue(fixture.hookReturn);

    renderLogin();

    fireEvent.blur(screen.getByLabelText(mockedAuthStrings.fieldEmailLabel));

    expect(fixture.identifierOnBlur).toHaveBeenCalledTimes(1);
  });

  // FIELD: PASSWORD DELEGATION *******************************

  it('should delegate password changes to react-hook-form register onChange', (): void => {
    const fixture: LoginHookFixture = createLoginHookFixture();

    mockUseLoginForm.mockReturnValue(fixture.hookReturn);

    renderLogin();

    fireEvent.change(screen.getByLabelText(mockedAuthStrings.fieldPasswordLabel), {
      target: { value: 'NewSecret123' },
    });

    expect(fixture.passwordOnChange).toHaveBeenCalledTimes(1);
  });

  it('should delegate password blur to react-hook-form register onBlur', (): void => {
    const fixture: LoginHookFixture = createLoginHookFixture();

    mockUseLoginForm.mockReturnValue(fixture.hookReturn);

    renderLogin();

    fireEvent.blur(screen.getByLabelText(mockedAuthStrings.fieldPasswordLabel));

    expect(fixture.passwordOnBlur).toHaveBeenCalledTimes(1);
  });

  it('should call togglePasswordVisibility when the trailing icon is clicked', (): void => {
    const fixture: LoginHookFixture = createLoginHookFixture();

    mockUseLoginForm.mockReturnValue(fixture.hookReturn);

    renderLogin();

    fireEvent.click(
      screen.getByRole('button', { name: mockedAuthStrings.a11yShowPassword })
    );

    expect(fixture.hookReturn.togglePasswordVisibility).toHaveBeenCalledTimes(1);
  });

  // FIELD: KEEP SESSION *******************************

  it('should reflect keepSession and delegate checkbox changes', (): void => {
    const fixture: LoginHookFixture = createLoginHookFixture();

    mockUseLoginForm.mockReturnValue(fixture.hookReturn);

    renderLogin();

    const checkbox = screen.getByLabelText(
      mockedAuthStrings.keepSession
    ) as HTMLInputElement;

    expect(checkbox.checked).toBe(true);

    fireEvent.click(checkbox);

    expect(fixture.hookReturn.onKeepSessionChange).toHaveBeenCalledWith(false);
  });

  // NAVIGATION *******************************

  it('should navigate to forgot password when the link button is clicked', (): void => {
    renderLogin();

    fireEvent.click(
      screen.getByRole('button', { name: mockedAuthStrings.forgotPassword })
    );

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.forgotPassword);
  });

  it('should navigate to create account when the footer button is clicked', (): void => {
    renderLogin();

    fireEvent.click(
      screen.getByRole('button', { name: mockedAuthStrings.createAccount })
    );

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.register);
  });

  // ASYNC ERROR *******************************

  it('should render the async general error alert when the hook exposes one', (): void => {
    const fixture: LoginHookFixture = createLoginHookFixture({
      state: {
        ui: {
          identifierDisplayValue: 'fighter@example.com',
          isPasswordVisible: false,
        },
        async: {
          generalError: 'Credenciais invalidas',
        },
      },
    });

    mockUseLoginForm.mockReturnValue(fixture.hookReturn);

    renderLogin();

    expect(screen.getByRole('alert')).toHaveTextContent('Credenciais invalidas');
  });

  // SUBMIT *******************************

  it(
    'should submit the form through handleSubmit and disable the submit button while loading',
    (): void => {
    const fixture: LoginHookFixture = createLoginHookFixture();

    mockUseLoginForm.mockReturnValue(fixture.hookReturn);

    renderLogin();

    const form = screen.getByRole('form', {
      name: mockedAuthStrings.a11yLoginForm,
    });

    fireEvent.submit(form);

    expect(fixture.hookReturn.handleSubmit).toHaveBeenCalledTimes(1);

    mockUseLoginForm.mockReturnValue(
      createLoginHookFixture({
        isLoading: true,
      }).hookReturn
    );

    renderLogin();

    const loadingForm = screen.getAllByRole('form', {
      name: mockedAuthStrings.a11yLoginForm,
    })[1];
    if (loadingForm === undefined) {
      throw new Error('Loading form not found');
    }

    const submitButton = loadingForm.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;

    expect(submitButton.disabled).toBe(true);
    expect(submitButton).toHaveAttribute('aria-busy', 'true');
  });
});
