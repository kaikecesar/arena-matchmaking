// Core
import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { JSX } from 'react';
import type { RenderResult } from '@testing-library/react';

// Libraries
import { ThemeProvider } from 'styled-components';

// Components
import { AuthAlert } from '@/components/auth/AuthAlert';

// Config
import { theme } from '@/styles';

// Types
import type { AuthAlertProps } from '@/components/auth/AuthAlert/AuthAlert.types';

/* *************** TEST SUPPORT VARS *************** */

const defaultProps: AuthAlertProps = {
  message: 'Credenciais invalidas',
};

const CustomIcon = (): JSX.Element => (
  <svg data-testid="custom-icon" aria-hidden="true" />
);

const renderAuthAlert = (overrides: Partial<AuthAlertProps> = {}): RenderResult => {
  const props: AuthAlertProps = {
    ...defaultProps,
    ...overrides,
  };

  const element: JSX.Element = (
    <ThemeProvider theme={theme}>
      <AuthAlert {...props} />
    </ThemeProvider>
  );

  return render(element);
};

/* *************** TEST EXECUTION *************** */

describe('AuthAlert', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();
  });

  afterEach((): void => {
    vi.resetAllMocks();
  });

  // MESSAGE *******************************

  it('should render the provided message', (): void => {
    renderAuthAlert({ message: 'E-mail ou senha incorretos' });

    expect(screen.getByText('E-mail ou senha incorretos')).toBeInTheDocument();
  });

  // ACCESSIBILITY *******************************

  it('should expose an alert role', (): void => {
    renderAuthAlert();

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should set a polite aria-live region', (): void => {
    renderAuthAlert();

    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'polite');
  });

  it('should contain the message inside the alert region', (): void => {
    renderAuthAlert({ message: 'Acesso temporariamente bloqueado' });

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Acesso temporariamente bloqueado'
    );
  });

  // ICON *******************************

  it('should render the default warning icon when no icon is provided', (): void => {
    const { container }: RenderResult = renderAuthAlert();

    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should render a custom icon when one is provided', (): void => {
    renderAuthAlert({ icon: <CustomIcon /> });

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});
