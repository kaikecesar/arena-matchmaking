// Core
import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ChangeEvent, SubmitEvent } from 'react';

// Context
import { AuthStatus } from '@/context/AuthContext.types';
import type { AuthContextValue } from '@/context/AuthContext.types';

// Locale
import { authStrings } from '@/i18n/pt-BR/auth';

// Hooks
import { useLoginForm } from '@/views/Login/useLoginForm';

// Types
import type { LoginPayload } from '@/types/auth';

// Mock Dependencies
const { mockUseAuth } = vi.hoisted(() => ({
  mockUseAuth: vi.fn(),
}));

vi.mock('@/hooks/useAuth', () => ({
  useAuth: (): AuthContextValue => mockUseAuth(),
}));

/* *************** TEST SUPPORT VARS *************** */

const mockLogin = vi.fn<(payload: LoginPayload) => Promise<void>>();

const createAuthContextValue = (
  overrides: Partial<AuthContextValue> = {}
): AuthContextValue => ({
  status: AuthStatus.guest,
  user: null,
  isBootstrapping: false,
  isSubmitting: false,
  successMessage: null,
  login: mockLogin,
  logout: vi.fn(),
  clearSuccessMessage: vi.fn(),
  ...overrides,
});

const createInputChangeEvent = (value: string): ChangeEvent<HTMLInputElement> => ({
  target: { value },
} as ChangeEvent<HTMLInputElement>);

const createRegisteredChangeEvent = (
  name: 'password',
  value: string
): ChangeEvent<HTMLInputElement> => ({
  target: {
    name,
    value,
  },
} as ChangeEvent<HTMLInputElement>);

const createSubmitEvent = (): SubmitEvent<HTMLFormElement> => ({
  preventDefault: vi.fn(),
  stopPropagation: vi.fn(),
  currentTarget: document.createElement('form'),
  target: document.createElement('form'),
} as unknown as SubmitEvent<HTMLFormElement>);

const populateValidForm = async (
  result: { current: ReturnType<typeof useLoginForm> }
): Promise<void> => {
  act((): void => {
    result.current.onIdentifierChange(createInputChangeEvent('athlete@example.com'));
  });

  act((): void => {
    result.current.register('password').onChange(
      createRegisteredChangeEvent('password', 'Secret123')
    );
  });

  await waitFor((): void => {
    expect(result.current.passwordValue).toBe('Secret123');
  });
};

/* *************** TEST EXECUTION *************** */

describe('useLoginForm', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();
    mockLogin.mockResolvedValue(undefined);
    mockUseAuth.mockReturnValue(createAuthContextValue());
  });

  afterEach((): void => {
    vi.resetAllMocks();
  });

  // INITIAL STATE *******************************

  it('should expose the initial reducer state and default form values', (): void => {
    const { result } = renderHook((): ReturnType<typeof useLoginForm> => useLoginForm());

    expect(result.current.state.ui.identifierDisplayValue).toBe('');
    expect(result.current.state.ui.isPasswordVisible).toBe(false);
    expect(result.current.state.async.generalError).toBeNull();
    expect(result.current.keepSession).toBe(true);
    expect(result.current.passwordValue).toBe('');
    expect(result.current.isLoading).toBe(false);
  });

  it('should mirror useAuth isSubmitting through isLoading', (): void => {
    mockUseAuth.mockReturnValue(createAuthContextValue({ isSubmitting: true }));

    const { result } = renderHook((): ReturnType<typeof useLoginForm> => useLoginForm());

    expect(result.current.isLoading).toBe(true);
  });

  // CALLBACK: TOGGLE PASSWORD VISIBILITY *******************************

  it('should toggle password visibility through the reducer', (): void => {
    const { result } = renderHook((): ReturnType<typeof useLoginForm> => useLoginForm());

    act((): void => {
      result.current.togglePasswordVisibility();
    });

    expect(result.current.state.ui.isPasswordVisible).toBe(true);
  });

  // CALLBACK: KEEP SESSION *******************************

  it('should update keepSession when the checkbox handler runs', async (): Promise<void> => {
    const { result } = renderHook((): ReturnType<typeof useLoginForm> => useLoginForm());

    act((): void => {
      result.current.onKeepSessionChange(false);
    });

    await waitFor((): void => {
      expect(result.current.keepSession).toBe(false);
    });
  });

  // CALLBACK: IDENTIFIER CHANGE *******************************

  it('should update identifierDisplayValue through onIdentifierChange', (): void => {
    const { result } = renderHook((): ReturnType<typeof useLoginForm> => useLoginForm());

    act((): void => {
      result.current.onIdentifierChange(createInputChangeEvent('coach@example.com'));
    });

    expect(result.current.state.ui.identifierDisplayValue).toBe('coach@example.com');
  });

  // CALLBACK: PASSWORD CHANGE *******************************

  it(
    'should track the current password value from the registered field handler',
    async (): Promise<void> => {
    const { result } = renderHook((): ReturnType<typeof useLoginForm> => useLoginForm());

    act((): void => {
      result.current.register('password').onChange(
        createRegisteredChangeEvent('password', 'Secret123')
      );
    });

    await waitFor((): void => {
      expect(result.current.passwordValue).toBe('Secret123');
    });
  });

  // SUBMIT: SUCCESS & RETRY *******************************

  it(
    'should submit valid data, retry successfully and clear the previous general error',
    async (): Promise<void> => {
    mockLogin
      .mockRejectedValueOnce(new Error('Falha temporaria'))
      .mockResolvedValueOnce(undefined);

    const { result } = renderHook((): ReturnType<typeof useLoginForm> => useLoginForm());

    await populateValidForm(result);

    act((): void => {
      result.current.handleSubmit(createSubmitEvent());
    });

    await waitFor((): void => {
      expect(result.current.state.async.generalError).toBe('Falha temporaria');
    });

    act((): void => {
      result.current.handleSubmit(createSubmitEvent());
    });

    await waitFor((): void => {
      expect(mockLogin).toHaveBeenCalledTimes(2);
      expect(mockLogin).toHaveBeenLastCalledWith({
        identifier: 'athlete@example.com',
        password: 'Secret123',
        keepSession: true,
      });
      expect(result.current.state.async.generalError).toBeNull();
    });
  });

  // SUBMIT: VALIDATION *******************************

  it('should block invalid submissions and expose validation errors', async (): Promise<void> => {
    const { result } = renderHook((): ReturnType<typeof useLoginForm> => useLoginForm());

    act((): void => {
      result.current.handleSubmit(createSubmitEvent());
    });

    await waitFor((): void => {
      expect(mockLogin).not.toHaveBeenCalled();
      expect(result.current.errors.identifier?.message).toBe(
        authStrings.errorEmptyIdentifier
      );
      expect(result.current.errors.password?.message).toBe(
        authStrings.errorEmptyPassword
      );
    });
  });

  // SUBMIT: ERROR HANDLING *******************************

  it(
    'should store the thrown error message when login rejects with Error',
    async (): Promise<void> => {
    mockLogin.mockRejectedValueOnce(new Error('Credenciais invalidas'));

    const { result } = renderHook((): ReturnType<typeof useLoginForm> => useLoginForm());

    await populateValidForm(result);

    act((): void => {
      result.current.handleSubmit(createSubmitEvent());
    });

    await waitFor((): void => {
      expect(result.current.state.async.generalError).toBe('Credenciais invalidas');
    });
  });

  it(
    'should fall back to the generic message when login rejects with a non-Error value',
    async (): Promise<void> => {
    mockLogin.mockRejectedValueOnce('boom');

    const { result } = renderHook((): ReturnType<typeof useLoginForm> => useLoginForm());

    await populateValidForm(result);

    act((): void => {
      result.current.handleSubmit(createSubmitEvent());
    });

    await waitFor((): void => {
      expect(result.current.state.async.generalError).toBe(authStrings.errorGeneric);
    });
  });
});
