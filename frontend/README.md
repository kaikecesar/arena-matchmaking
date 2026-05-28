# Arena Matchmaking — Frontend

Quick guide to run the application and tests locally.

## Prerequisites

- Node.js (version compatible with Vite 8 / React 19)
- Dependencies installed:

```bash
npm install
```

For e2e tests, install the Playwright browser once:

```bash
npx playwright install chromium
```

## Run the application

```bash
npm run dev
```

Vite starts the dev server at `http://localhost:5173`.

Other build commands:

| Command | What it does |
|---|---|
| `npm run dev` | Starts the dev server (`http://localhost:5173`) |
| `npm run build` | Type-check + production build |
| `npm run preview` | Serve the production build locally |

## Unit and component tests (Vitest)

```bash
# run the full suite once
npm run test

# watch mode (re-runs on save — ideal for development)
npm run test:watch
```

### Run individually

For a specific file, folder, or test name, use `vitest` directly:

```bash
# by file
npx vitest run src/components/ui/Button/Button.test.tsx

# by folder (all tests under it)
npx vitest run src/components/system

# by test name (-t matches describe/it)
npx vitest run -t "should be disabled while loading"

# watch focused on one file
npx vitest src/components/ui/Checkbox/Checkbox.test.tsx

# with coverage report
npx vitest run --coverage
```

## End-to-end tests (Playwright)

E2e targets `http://localhost:5173`, so the dev server must be running
in another terminal (`npm run dev`) before you execute tests.

```bash
# run the login e2e flow
npm run test:e2e
```

### Run individually

```bash
# by file
npx playwright test src/tests/e2e/login.e2e.ts

# by test name
npx playwright test -g "should toggle password visibility"

# with visible browser (debug)
npx playwright test src/tests/e2e/login.e2e.ts --headed
```

## Lint and type-check

```bash
# lint (zero warnings allowed)
npm run lint

# auto-fix what is possible
npm run lint:fix

# type-check without emitting build
npm run typecheck:noEmit

# full pipeline: lint + typecheck + build
npm run validate
```

## Test conventions

UI tests follow a consistent pattern:

- Internal organization with dividers `/* *************** TEST SUPPORT VARS *************** */`
  and `/* *************** TEST EXECUTION *************** */`, and uppercase theme groupers
  (`// ELEMENTS *****`, `// VALIDATION *****`, etc.).
- Import comments by domain (`// Core`, `// Libraries`, `// Components`,
  `// Config`, `// Types`, `// Mock Dependencies`).
- Test names in `should ...` style.
- Explicit typings on local variables and callbacks (`(): void`, `async (): Promise<void>`).
- Render helper wrapping the component in `ThemeProvider`.
- Snapshots with Vitest (`toMatchSnapshot`); DOM matchers in `src/testing/domMatchers.ts`.
- First test in each component: snapshot with `defaultProps.testId`.
- 100-column line limit (`max-len`): long `it()`/`test()` signatures
  break the title onto one line and the callback onto the next.

Test files live next to the component (`Component.test.tsx`), with snapshots
in `__snapshots__/`. E2e lives in `src/tests/e2e/`.

Example:

```
Button/
  Button.tsx
  Button.test.tsx
  __snapshots__/
    Button.test.tsx.snap
```
