# Arena Matchmaking — Frontend

Guia rápido para rodar a aplicação e os testes localmente.

## Pré-requisitos

- Node.js (versão compatível com Vite 8 / React 19)
- Dependências instaladas:

```bash
npm install
```

Para os testes e2e, instale o navegador do Playwright uma única vez:

```bash
npx playwright install chromium
```

## Rodar a aplicação

```bash
npm run dev
```

O Vite sobe o dev server em `http://localhost:5173`.

Outros comandos de build:

| Comando | O que faz |
|---|---|
| `npm run dev` | Inicia o dev server (`http://localhost:5173`) |
| `npm run build` | Type-check + build de produção |
| `npm run preview` | Servir o build de produção localmente |

## Testes unitários e de componente (Vitest)

```bash
# roda toda a suíte uma vez
npm run test

# modo watch (re-roda ao salvar — ideal para desenvolver)
npm run test:watch
```

### Rodar de forma individual

Para um arquivo, pasta ou nome específico, use o `vitest` diretamente:

```bash
# por arquivo
npx vitest run src/components/ui/Button/__tests__/Button.test.tsx

# por pasta (todos os testes abaixo dela)
npx vitest run src/components/system

# por nome do teste (-t casa com describe/it)
npx vitest run -t "should be disabled while loading"

# watch focado em um arquivo
npx vitest src/components/ui/Checkbox/__tests__/Checkbox.test.tsx

# com relatório de cobertura
npx vitest run --coverage
```

## Testes end-to-end (Playwright)

O e2e aponta para `http://localhost:5173`, então o dev server precisa estar rodando
em outro terminal (`npm run dev`) antes de executar.

```bash
# roda o fluxo de login e2e
npm run test:e2e
```

### Rodar de forma individual

```bash
# por arquivo
npx playwright test src/tests/e2e/login.e2e.ts

# por nome do teste
npx playwright test -g "should toggle password visibility"

# com navegador visível (debug)
npx playwright test src/tests/e2e/login.e2e.ts --headed
```

## Lint e type-check

```bash
# lint (zero warnings permitidos)
npm run lint

# corrige automaticamente o que for possível
npm run lint:fix

# type-check sem emitir build
npm run typecheck:noEmit

# pipeline completo: lint + typecheck + build
npm run validate
```

## Convenções de teste

Os testes de interface seguem um padrão consistente:

- Organização interna com os divisores `/* *************** TEST SUPPORT VARS *************** */`
  e `/* *************** TEST EXECUTION *************** */`, e agrupadores em caixa alta
  por tema (`// ELEMENTS *****`, `// VALIDATION *****`, etc.).
- Comentários de import por domínio (`// Core`, `// Libraries`, `// Components`,
  `// Config`, `// Types`, `// Mock Dependencies`).
- Nomes de teste no estilo `should ...`.
- Tipagens explícitas em variáveis locais e callbacks (`(): void`, `async (): Promise<void>`).
- Helper de render envolvendo o componente no `ThemeProvider`.
- Limite de 100 colunas por linha (`max-len`): assinaturas longas de `it()`/`test()`
  são quebradas com o título numa linha e o callback na seguinte.

Os arquivos de teste ficam em `__tests__/` ao lado do componente, exceto o e2e,
que fica em `src/tests/e2e/`.
