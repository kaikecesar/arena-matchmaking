# Qualidade de Código — Ferramentas e Processos

> Este documento explica as ferramentas que rodam automaticamente no fluxo de Pull Request e como interagir com elas. **Leitura recomendada antes da primeira PR.**

---

## Visão Geral

Antes de qualquer código entrar em `develop` ou `main`, ele passa por checks automáticos. As ferramentas se dividem em quatro categorias:

| Categoria | Ferramentas | O que protege |
|---|---|---|
| **Testes e lint** | Code Quality workflow | Quebras de comportamento, código fora do padrão |
| **Segurança** | CodeQL, Push protection, Private vulnerability reporting | Vulnerabilidades no código e secrets vazados |
| **Dependências** | Dependabot | CVEs em libs, deps desatualizadas |
| **Review** | CodeRabbit, PR template, Semantic PR title | Qualidade do código e legibilidade do histórico |

---

## Workflow Padrão de uma Pull Request

```
1. git checkout -b feat/nome-da-coisa     (a partir de develop)
2. (trabalha, commita, empurra)
3. Abre PR como Draft no GitHub, target = develop
4. PR template aparece — preenche Summary + Test plan
5. (itera: commits, push, CI roda automático)
6. Quando terminar: click "Ready for review"
7. CodeRabbit revisa em pt-BR, CI final roda
8. Aplica ajustes do review (se fizer sentido)
9. Resolve comentários abertos
10. Click "Squash and merge"
11. Apaga a branch
```

### Por que abrir como Draft?

Enquanto está draft, **CodeRabbit não revisa** — você evita ruído em código intermediário. Quando marca "Ready for review", todos os bots acordam de uma vez só.

### Status checks obrigatórios para mergear

- `backend-lint-test` — lint + unit + integration + e2e
- *(em breve, após o primeiro run: `Analyze (javascript-typescript)` e `Validate PR title`)*

---

## Estrutura de Branches

| Branch | Para que serve | Pode push direto? |
|---|---|---|
| `main` | Produção | Não (só PR) |
| `develop` | Integração | Não (só PR, sem aprovação obrigatória) |
| `feat/*` | Features individuais | Sim (você é dono) |
| `bugfix/*` | Bugfixes | Sim |
| `hotfix/*` | Fixes urgentes em produção | Não (só PR) |
| `shared/*`, `shared/feat/*` | Trabalho colaborativo | Não (só PR com aprovação) |

Regras configuradas via Terraform — ver [infra/branch_protection.tf](../infra/branch_protection.tf).

---

## Ferramentas — Detalhe

### 1. Code Quality Workflow

**Arquivo**: [.github/workflows/code-quality.yml](../.github/workflows/code-quality.yml)

**O que faz**: roda lint do ESLint + as três suites de teste (unit, integration, e2e).

**Quando dispara**: todo push e toda PR.

**Como interagir**: nada. Se falhar, abre **Actions** tab → run com erro → investiga.

**Para rodar localmente antes do push**:
```bash
cd backend
npm run lint
npm test                  # unit (rápido, sem DB)
npm run test:integration  # precisa Postgres rodando
npm run test:e2e          # precisa Postgres rodando
```

Estratégia de testes documentada em [ADR 0002](adr/0002-testing-strategy.md).

---

### 2. CodeQL — Análise de Segurança

**Arquivo**: [.github/workflows/codeql.yml](../.github/workflows/codeql.yml)

**O que faz**: análise estática que procura vulnerabilidades em JS/TS — SQL injection, XSS, prototype pollution, vazamento de dados, padrões inseguros. Usa o pacote `security-extended` (mais regras que o default).

**Quando dispara**:
- Push em `develop` ou `main`
- PR para `develop` ou `main`
- Schedule semanal (segunda 6h UTC) — pega regras novas mesmo sem código mudar

**Como aparece**:
- Status check `Analyze (javascript-typescript)` na PR
- Alerta na aba **Security**
- Comentário inline no diff

**Como interagir com um alerta**:

| Cenário | Ação |
|---|---|
| Alerta real, vai corrigir | Commita a correção; ele revalida no próximo run |
| Falso positivo | **Dismiss alert** → motivo "False positive" → explica por quê |
| Sabe do problema, vai conviver | Dismiss → "Won't fix" + justificativa |

**Falsos positivos conhecidos no projeto**:
- `Missing rate limiting` em `routes.ts` que usa `addHook(authenticate)` — rate limit vem do plugin global do Fastify + `config.rateLimit` per-route, CodeQL não reconhece esse padrão.

---

### 3. Push Protection para Secrets

**Onde**: configurado em Settings → Code security → Secret protection (UI).

**O que faz**: detecta secrets (API keys, tokens, certificados) no push **antes dele concluir**. Se detectar, **bloqueia o push** e te avisa.

**Como interagir**:
- Push bloqueado → GitHub mostra link da detecção
- **Opção A — Secret real vazou**: revogue o secret no provedor **imediatamente**, edite o commit (`git rebase -i`) para remover, e push de novo
- **Opção B — Falso positivo** (string parece secret mas não é): clica no link da mensagem, escolhe "Allow secret" com justificativa

**Importante**: `.env` e `*.tfvars` já estão no `.gitignore`. Push protection é a **última linha de defesa**.

---

### 4. Dependabot

**Arquivo**: [.github/dependabot.yml](../.github/dependabot.yml)

**O que faz**: bot do GitHub que vigia suas dependências. Quatro funcionalidades distintas:

| Funcionalidade | Quando dispara | O que produz |
|---|---|---|
| **Alerts** | CVE novo afeta uma dep sua | Aviso na aba Security |
| **Security updates** | Após um alert | PR **imediata** com versão patched |
| **Grouped security updates** | Múltiplos CVEs ao mesmo tempo | 1 PR por ecosystem em vez de N |
| **Version updates** | Schedule (weekly npm, monthly terraform) | PR rotineira com minor/patch agrupados |

**Como aparecem as PRs**:
- Autor: `dependabot[bot]`
- Título: `chore(deps): bump <package> from x.y.z to x.y.w`
- Minor/patch agrupados em 1 PR; majors separadas

**Como interagir** (comentários na própria PR):

| Comentário | Efeito |
|---|---|
| (nada — só merga) | Squash and merge normal |
| `@dependabot rebase` | Força rebase |
| `@dependabot recreate` | Recria a PR do zero |
| `@dependabot ignore this dependency` | Pula essa dep para sempre |
| `@dependabot ignore this major version` | Só ignora essa major (ex: pular 5.x mas aceitar 5.1.0 depois) |
| `@dependabot close` | Fecha sem mergear |

**Quando NÃO mergear cegamente**: major version updates (ex: `4.x → 5.x`) ou libs com breaking changes frequentes (Drizzle, Fastify, TypeScript). Lê o changelog antes.

---

### 5. CodeRabbit — AI Review

**Arquivo**: [.coderabbit.yaml](../.coderabbit.yaml)

**O que faz**: AI bot que lê o diff da PR e comenta — sugestões linha-a-linha, resumo de impacto, detecção de bugs lógicos e problemas de segurança.

**Idioma**: português (configurado).

**Quando atua**: **só revisa quando a PR está "Ready for review"**. Draft é ignorada.

**Workflow esperado**:
1. Abre PR como **Draft** → CodeRabbit fica quieto
2. Itera, empurra commits → nada de review
3. Click **"Ready for review"** → CodeRabbit faz review inicial completo
4. Você empurra mais commits depois → ele faz reviews **incrementais** (só do que mudou)

**Como interagir** (comentários na PR):

| Comentário | Efeito |
|---|---|
| `@coderabbitai review` | Força review completo agora |
| `@coderabbitai full review` | Reseta o estado e refaz do zero |
| `@coderabbitai resolve` | Marca todos os threads dele como resolved |
| `@coderabbitai pause` | Pausa reviews automáticos nesta PR |
| `@coderabbitai resume` | Retoma |
| `@coderabbitai summary` | Gera novo resumo |
| `@coderabbitai help` | Lista todos os comandos |

**Quando NÃO seguir o conselho**:
- Sugere lib que não está no projeto
- Pede comentário em código óbvio (vai contra o estilo)
- Sugere refatoração além do escopo da PR
- Não entende padrões do projeto (ex: tradução de erro PG em integration vs validação em Zod)

Você é o reviewer final — não tem obrigação de aplicar sugestão.

---

### 6. Semantic PR Title

**Arquivo**: [.github/workflows/semantic-pr.yml](../.github/workflows/semantic-pr.yml)

**O que faz**: valida que o título da PR segue [Conventional Commits](https://www.conventionalcommits.org/).

**Formato**: `<tipo>: <descrição>` ou `<tipo>(<scope>): <descrição>`

**Tipos permitidos**:

| Tipo | Quando usar |
|---|---|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `refactor` | Refatoração interna, sem mudança de comportamento |
| `perf` | Melhoria de performance |
| `docs` | Apenas documentação |
| `test` | Apenas testes |
| `chore` | Manutenção, deps, tooling |
| `ci` | Pipeline / CI |
| `revert` | Reversão de commit anterior |

**Exemplos**:

| ✓ Válido | ✗ Rejeitado |
|---|---|
| `feat: add athlete identity registration` | `Add new feature` (sem tipo) |
| `fix(auth): handle expired JWT in cookie` | `Feat: add thing` (tipo capitalizado) |
| `chore(deps): bump drizzle-orm from 0.45 to 0.46` | `feat: Add thing.` (descrição com ponto, começa maiúscula) |

**Como interagir**: edita o título da PR; o check revalida automaticamente.

---

### 7. PR Template

**Arquivo**: [.github/pull_request_template.md](../.github/pull_request_template.md)

**O que é**: conteúdo padrão que aparece ao abrir uma PR. Cinco seções:

| Seção | O que escrever |
|---|---|
| **Summary** | 1-3 bullets do **porquê** (não o "o que" — o diff mostra isso) |
| **Type of change** | Marca checkboxes — alinha com o tipo do título semantic |
| **Test plan** | Como você verificou que funciona |
| **Risk** | O que pode quebrar; áreas para o reviewer olhar com atenção extra |
| **Related** | Links para issues, requirements, ADRs |

Não é obrigatório preencher tudo, mas seções vazias custam tempo do reviewer depois.

---

### 8. Private Vulnerability Reporting

**Onde**: Settings → Security → Private vulnerability reporting (habilitado).

**O que faz**: permite que qualquer pessoa reporte vulnerabilidades **privadamente** via GitHub Security Advisories, em vez de abrir issue pública (que vazaria o problema).

**Como interagir**: se receber um report, aparece na aba **Security** → **Advisories**. Você confirma, prepara fix em branch privada, cria CVE quando publicar.

Não exige ação diária — só vale saber que existe quando aparecer.

---

## Troubleshooting — Quando algo bloqueia o merge

| Sintoma | Causa | Ação |
|---|---|---|
| "Merging is blocked — All comments must be resolved" | Algum bot deixou comentário sem resolve | Vai em cada thread aberto e clica "Resolve" (ou aborda o feedback) |
| "Required status check 'X' is failing" | CI quebrou | Actions tab → run com erro → investiga |
| "This branch is out-of-date with the base branch" | develop avançou | Click **Update branch** no painel da PR |
| "Required status check 'X' is expected" | CI ainda não rodou no commit atual | Espera 1-2 min ou empurra commit dummy |
| CodeQL falha com `Missing rate limiting` em `routes.ts` | Falso positivo conhecido | Dismiss alert → "False positive" |
| CodeRabbit não revisou | PR ainda está como Draft | Click **Ready for review** |
| Dependabot abriu PR com breaking change | Major version update | Lê changelog, decide se aplica agora ou fecha |
| Push bloqueado por secret detection | Secret detectado no commit | Revoga o secret no provedor, edita commit pra remover, push de novo |

---

## Resumo Visual

```
┌─────────────────────────────────────────────────────────┐
│                       VOCÊ                              │
│              abre PR como Draft                         │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│  CI roda a cada push: lint, unit, integration, e2e      │
│  CodeQL roda em paralelo                                │
│  Semantic PR title valida o título                      │
│                                                         │
│  (CodeRabbit fica quieto enquanto é Draft)              │
└────────────────────────┬────────────────────────────────┘
                         │
                  ┌──────┴──────┐
                  │ Tudo verde? │
                  └──────┬──────┘
                         │ sim
                         ▼
┌─────────────────────────────────────────────────────────┐
│             VOCÊ click "Ready for review"               │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│  CodeRabbit revisa em pt-BR                             │
│  Comenta linha-a-linha + summary                        │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│  VOCÊ ajusta o que faz sentido, resolve comentários     │
│  Reviews incrementais a cada push novo                  │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│  VOCÊ "Squash and merge" → develop                      │
└─────────────────────────────────────────────────────────┘
```

---

## Documentos relacionados

- [ADR 0001 — Multi-tenancy](adr/0001-multi-tenancy.md)
- [ADR 0002 — Testing Strategy](adr/0002-testing-strategy.md)
- [infra/README.md](../infra/README.md) — como aplicar mudanças nas regras de branch protection via Terraform
- [REQUIREMENTS.md](project_definitions/requirements/REQUIREMENTS.md) — requisitos do produto
