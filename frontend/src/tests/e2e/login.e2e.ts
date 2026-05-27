// Core
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

/* *************** TEST SUPPORT VARS *************** */

const APP_URL = 'http://localhost:5173';
const LOGIN_URL = `${APP_URL}/login`;
const USER_KEY = 'arena_auth_user';
const REMEMBER_ME_KEY = 'arena_remember_me';
const KNOWN_USERS_KEY = 'arena_known_users';

const EMAIL_LABEL = 'E-mail';
const PASSWORD_LABEL = 'Senha';
const KEEP_SESSION_LABEL = 'Manter conectado';
const SUBMIT_LABEL = 'Acessar painel';

type SeededUserRole = 'ORGANIZER' | 'ATHLETE' | 'COACH';

interface SeededUser {
  id: string;
  name: string;
  email: string;
  role: SeededUserRole;
}

interface MockLoginOptions {
  status?: number;
  body?: Record<string, unknown>;
}

interface StoredSessionSnapshot {
  localUser: string | null;
  sessionUser: string | null;
  rememberMe: string | null;
}

const goToLogin = async (page: Page): Promise<void> => {
  await page.goto(LOGIN_URL);
  await expect(page.getByLabel(EMAIL_LABEL)).toBeVisible();
  await expect(page.getByLabel(PASSWORD_LABEL)).toBeVisible();
};

const fillCredentials = async (
  page: Page,
  identifier: string,
  password: string
): Promise<void> => {
  await page.getByLabel(EMAIL_LABEL).fill(identifier);
  await page.getByLabel(PASSWORD_LABEL).fill(password);
};

const mockLoginRequest = async (
  page: Page,
  options: MockLoginOptions = {}
): Promise<void> => {
  const { status = 200, body = {} } = options;

  await page.route('**/api/v1/login', async (route): Promise<void> => {
    await route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify(body),
    });
  });
};

const seedKnownUsers = async (
  page: Page,
  users: Record<string, SeededUser>
): Promise<void> => {
  await page.evaluate(
    (payload: {
      storageKey: string;
      knownUsers: Record<string, SeededUser>;
    }): void => {
      window.localStorage.setItem(
        payload.storageKey,
        JSON.stringify(payload.knownUsers)
      );
    },
    {
      storageKey: KNOWN_USERS_KEY,
      knownUsers: users,
    }
  );
};

const getStoredSession = async (page: Page): Promise<StoredSessionSnapshot> =>
  page.evaluate(
    (payload: { userKey: string; rememberKey: string }): StoredSessionSnapshot => ({
      localUser: window.localStorage.getItem(payload.userKey),
      sessionUser: window.sessionStorage.getItem(payload.userKey),
      rememberMe: window.localStorage.getItem(payload.rememberKey),
    }),
    {
      userKey: USER_KEY,
      rememberKey: REMEMBER_ME_KEY,
    }
  );

/* *************** TEST EXECUTION *************** */

test.describe('login flow e2e', (): void => {
  // ELEMENTS *******************************

  test(
    'should render the main login controls',
    async ({ page }): Promise<void> => {
    await goToLogin(page);

    await expect(page.getByRole('button', { name: SUBMIT_LABEL })).toBeVisible();
    await expect(page.getByText(KEEP_SESSION_LABEL)).toBeVisible();
    await expect(page.locator('input[name="keepSession"]')).toBeChecked();
  });

  // VALIDATION *******************************

  test(
    'should show required field messages when the form is submitted empty',
    async ({ page }): Promise<void> => {
    await goToLogin(page);

    await page.getByRole('button', { name: SUBMIT_LABEL }).click();

    await expect(page.getByText('Informe seu e-mail')).toBeVisible();
    await expect(page.getByText('Informe sua senha')).toBeVisible();
  });

  test(
    'should show the invalid email message for malformed identifiers',
    async ({ page }): Promise<void> => {
    await goToLogin(page);
    await fillCredentials(page, 'arena-matchmaking', 'Secret123');

    await page.getByRole('button', { name: SUBMIT_LABEL }).click();

    await expect(page.getByText('Informe um e-mail valido')).toBeVisible();
  });

  // FIELD: PASSWORD VISIBILITY *******************************

  test(
    'should toggle password visibility from hidden to visible and back again',
    async ({ page }): Promise<void> => {
    await goToLogin(page);
    await page.getByLabel(PASSWORD_LABEL).fill('Secret123');

    await expect(page.getByLabel(PASSWORD_LABEL)).toHaveAttribute(
      'type',
      'password'
    );

    await page.getByRole('button', { name: 'Mostrar senha' }).click();
    await expect(page.getByLabel(PASSWORD_LABEL)).toHaveAttribute('type', 'text');

    await page.getByRole('button', { name: 'Ocultar senha' }).click();
    await expect(page.getByLabel(PASSWORD_LABEL)).toHaveAttribute(
      'type',
      'password'
    );
  });

  // SESSION: REMEMBER ME *******************************

  test(
    'should log an organizer in with remember-me enabled and store the session in localStorage',
    async ({ page }): Promise<void> => {
    await mockLoginRequest(page);
    await goToLogin(page);
    await seedKnownUsers(page, {
      'organizer@example.com': {
        id: 'organizer-1',
        name: 'Organizer',
        email: 'organizer@example.com',
        role: 'ORGANIZER',
      },
    });
    await fillCredentials(page, 'organizer@example.com', 'Secret123');

    await page.getByRole('button', { name: SUBMIT_LABEL }).click();

    await page.waitForURL(`${APP_URL}/dashboard/events`);

    const storedSession: StoredSessionSnapshot = await getStoredSession(page);

    expect(storedSession.localUser).not.toBeNull();
    expect(storedSession.sessionUser).toBeNull();
    expect(storedSession.rememberMe).toBe('true');
  });

  test(
    'should log an athlete in without remember-me and store the session only in sessionStorage',
    async ({ page }): Promise<void> => {
    await mockLoginRequest(page);
    await goToLogin(page);
    await seedKnownUsers(page, {
      'athlete@example.com': {
        id: 'athlete-1',
        name: 'Athlete',
        email: 'athlete@example.com',
        role: 'ATHLETE',
      },
    });
    await page.locator('input[name="keepSession"]').uncheck({ force: true });
    await fillCredentials(page, 'athlete@example.com', 'Secret123');

    await page.getByRole('button', { name: SUBMIT_LABEL }).click();

    await page.waitForURL(`${APP_URL}/profile`);

    const storedSession: StoredSessionSnapshot = await getStoredSession(page);

    expect(storedSession.localUser).toBeNull();
    expect(storedSession.sessionUser).not.toBeNull();
    expect(storedSession.rememberMe).toBe('false');
  });

  // ERROR HANDLING *******************************

  test(
    'should show the translated invalid credentials message for 401 responses',
    async ({ page }): Promise<void> => {
    await mockLoginRequest(page, {
      status: 401,
      body: {
        message: 'Invalid credentials',
      },
    });
    await goToLogin(page);
    await fillCredentials(page, 'organizer@example.com', 'Secret123');

    await page.getByRole('button', { name: SUBMIT_LABEL }).click();

    await expect(page.getByRole('alert')).toContainText(
      'E-mail ou senha incorretos. Tente novamente.'
    );
  });

  test(
    'should show the translated rate-limit message for 429 responses',
    async ({ page }): Promise<void> => {
    await mockLoginRequest(page, {
      status: 429,
      body: {
        message: 'Too many attempts',
      },
    });
    await goToLogin(page);
    await fillCredentials(page, 'organizer@example.com', 'Secret123');

    await page.getByRole('button', { name: SUBMIT_LABEL }).click();

    await expect(page.getByRole('alert')).toContainText(
      'Acesso temporariamente bloqueado. Aguarde alguns minutos.'
    );
  });
});
