// Core
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Reducer
import { loginReducer } from '@/views/Login/login.reducer';
import type { LoginAction } from '@/views/Login/login.reducer';

// State
import { loginInitialState } from '@/views/Login/login.state';
import type { LoginState } from '@/views/Login/login.state';

/* *************** TEST SUPPORT VARS *************** */

const createState = (overrides: Partial<LoginState> = {}): LoginState => ({
  ui: {
    ...loginInitialState.ui,
    ...overrides.ui,
  },
  async: {
    ...loginInitialState.async,
    ...overrides.async,
  },
});

/* *************** TEST EXECUTION *************** */

describe('loginReducer', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();
  });

  afterEach((): void => {
    vi.resetAllMocks();
  });

  // ACTION: SET IDENTIFIER DISPLAY *******************************

  it('should update identifierDisplayValue when receiving SET_IDENTIFIER_DISPLAY', (): void => {
    const state: LoginState = createState();

    const nextState: LoginState = loginReducer(state, {
      type: 'SET_IDENTIFIER_DISPLAY',
      payload: 'coach@example.com',
    });

    expect(nextState.ui.identifierDisplayValue).toBe('coach@example.com');
  });

  it('should preserve password visibility when updating the identifier display', (): void => {
    const state: LoginState = createState({
      ui: {
        identifierDisplayValue: '',
        isPasswordVisible: true,
      },
    });

    const nextState: LoginState = loginReducer(state, {
      type: 'SET_IDENTIFIER_DISPLAY',
      payload: 'fighter@example.com',
    });

    expect(nextState.ui.isPasswordVisible).toBe(true);
  });

  it('should preserve async errors when updating the identifier display', (): void => {
    const state: LoginState = createState({
      async: {
        generalError: 'Falha de autenticacao',
      },
    });

    const nextState: LoginState = loginReducer(state, {
      type: 'SET_IDENTIFIER_DISPLAY',
      payload: 'coach@example.com',
    });

    expect(nextState.async.generalError).toBe('Falha de autenticacao');
  });

  // ACTION: TOGGLE PASSWORD VISIBILITY *******************************

  it('should toggle password visibility from false to true', (): void => {
    const state: LoginState = createState();

    const nextState: LoginState = loginReducer(state, {
      type: 'TOGGLE_PASSWORD_VISIBILITY',
    });

    expect(nextState.ui.isPasswordVisible).toBe(true);
  });

  it('should toggle password visibility from true to false', (): void => {
    const state: LoginState = createState({
      ui: {
        identifierDisplayValue: '',
        isPasswordVisible: true,
      },
    });

    const nextState: LoginState = loginReducer(state, {
      type: 'TOGGLE_PASSWORD_VISIBILITY',
    });

    expect(nextState.ui.isPasswordVisible).toBe(false);
  });

  it('should preserve identifierDisplayValue when toggling password visibility', (): void => {
    const state: LoginState = createState({
      ui: {
        identifierDisplayValue: 'coach@example.com',
        isPasswordVisible: false,
      },
    });

    const nextState: LoginState = loginReducer(state, {
      type: 'TOGGLE_PASSWORD_VISIBILITY',
    });

    expect(nextState.ui.identifierDisplayValue).toBe('coach@example.com');
  });

  // ACTION: SET GENERAL ERROR *******************************

  it('should store a general error message with SET_GENERAL_ERROR', (): void => {
    const state: LoginState = createState();

    const nextState: LoginState = loginReducer(state, {
      type: 'SET_GENERAL_ERROR',
      payload: 'Credenciais invalidas',
    });

    expect(nextState.async.generalError).toBe('Credenciais invalidas');
  });

  it('should allow SET_GENERAL_ERROR to explicitly reset the message to null', (): void => {
    const state: LoginState = createState({
      async: {
        generalError: 'Erro antigo',
      },
    });

    const nextState: LoginState = loginReducer(state, {
      type: 'SET_GENERAL_ERROR',
      payload: null,
    });

    expect(nextState.async.generalError).toBeNull();
  });

  // ACTION: CLEAR ERRORS *******************************

  it('should clear async errors with CLEAR_ERRORS', (): void => {
    const state: LoginState = createState({
      async: {
        generalError: 'Erro antigo',
      },
    });

    const nextState: LoginState = loginReducer(state, {
      type: 'CLEAR_ERRORS',
    });

    expect(nextState.async.generalError).toBeNull();
  });

  // ACTION: RESET STATE *******************************

  it('should restore the initial state with RESET_STATE', (): void => {
    const state: LoginState = createState({
      ui: {
        identifierDisplayValue: 'coach@example.com',
        isPasswordVisible: true,
      },
      async: {
        generalError: 'Falha temporaria',
      },
    });

    const nextState: LoginState = loginReducer(state, {
      type: 'RESET_STATE',
    });

    expect(nextState).toEqual(loginInitialState);
  });

  // ACTION: UNKNOWN *******************************

  it('should return the same state reference for unknown actions', (): void => {
    const state: LoginState = createState();
    const unknownAction = {
      type: 'UNKNOWN_ACTION',
    } as unknown as LoginAction;

    const nextState: LoginState = loginReducer(state, unknownAction);

    expect(nextState).toBe(state);
  });
});
