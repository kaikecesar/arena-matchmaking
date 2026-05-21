# ESPECIFICAÇÃO TÉCNICA — TELA DE LOGIN

## Arena Matchmaking · Sistema de Gerenciamento de Lutas

> **Versão:** 1.0  
> **Data:** 21 de maio de 2026  
> **Stack:** React + Styled Components  
> **Responsividade:** Mobile-first, totalmente responsivo  
> **Fonte:** Derivada do design `Arena_Matchmaking.html` + `REQUIREMENTS v0.8`

---

## 1. CONTEXTO E ESCOPO

### 1.1 Propósito da Tela

A tela de Login é o **ponto de entrada único** do sistema para todas as personas: Organizador, Atleta e Coach. Ela garante autenticação segura, estabelece a sessão e redireciona o usuário para o dashboard correto conforme seu papel.

### 1.2 Personas Atendidas

| Persona     | Destino pós-login            | Prioridade |
| ----------- | ---------------------------- | ---------- |
| Organizador | Dashboard de eventos         | Alta       |
| Atleta      | Perfil / inscrições          | Média      |
| Coach       | Visão dos atletas vinculados | Média      |

### 1.3 Requisitos Rastreados

- **RNF-001** — p95 < 1.5s para login (SLO interativo)
- **RNF-SEC-001** — Senhas com hash bcrypt/argon2
- **RNF-SEC-002** — HTTPS/TLS obrigatório
- **RNF-SEC-003** — Rate limiting / proteção brute force
- **RNF-SEC-004** — Controle de acesso por papel
- **RNF-LGPD-001** — Consentimento registrado (aceite de termos)
- **RNF-i18n** — Strings externalizadas desde o MVP (2.18)
- **RNF-UX** — Mobile-first; responsivo para desktop (10.9)

---

## 2. DESIGN SYSTEM — TOKENS OBRIGATÓRIOS

### 2.1 Paleta de Cores

```ts
// tokens/colors.ts
export const colors = {
  // Superfícies
  bgApp: '#101114', // fundo principal da tela
  surf1: '#16171b', // card
  surf2: '#1c1e23', // elevado
  surf3: '#232529', // input background

  // Bordas
  border1: '#25272d', // sutil
  border2: '#2e3037', // visível

  // Texto
  textHi: '#f3f3f5', // primário
  textMid: '#b9bbc1', // secundário
  textLow: '#6b6e76', // terciário
  textDim: '#45474d', // desabilitado

  // Blood (acento principal)
  blood: '#d22638',
  bloodSoft: '#b41f30',
  bloodDeep: '#7c1422',
  bloodGlow: 'rgba(210, 38, 56, 0.28)',
  bloodTint: 'rgba(210, 38, 56, 0.10)',

  // Copper (acento metálico)
  copper: '#d8a168',
  copperDeep: '#a47545',
  copperTint: 'rgba(216, 161, 104, 0.10)',

  // Semânticas
  success: '#4ade80',
  warning: '#f59e0b',
} as const
```

### 2.2 Tipografia

```ts
// tokens/typography.ts
export const fonts = {
  display: "'Barlow Semi Condensed', sans-serif", // títulos, botões
  ui: "'Manrope', system-ui, sans-serif", // corpo, labels, campos
  mono: "'JetBrains Mono', monospace", // dados, eyebrows, status
} as const

// Google Fonts import (em index.html ou GlobalStyles):
// Barlow Semi Condensed: 400, 500, 600, 700, 800, 900
// Manrope: 400, 500, 600, 700, 800
// JetBrains Mono: 400, 500, 600, 700
```

### 2.3 Escala de Border Radius

```ts
// tokens/radius.ts
export const radius = {
  sm: '6px',
  md: '10px',
  lg: '14px',
  xl: '20px',
} as const
```

### 2.4 Sombras e Elevação

```ts
// tokens/shadows.ts
export const shadows = {
  card: '0 1px 0 rgba(255,255,255,0.03) inset, 0 8px 24px rgba(0,0,0,0.35)',
  pop: '0 1px 0 rgba(255,255,255,0.05) inset, 0 12px 32px rgba(0,0,0,0.5)',
  ringBlood: '0 0 0 1px #d22638, 0 0 24px rgba(210,38,56,0.28)',
  buttonBlood: '0 1px 0 rgba(255,255,255,0.15) inset, 0 12px 28px rgba(210,38,56,0.28)',
} as const
```

---

## 3. ESTRUTURA DE COMPONENTES

### 3.1 Árvore de Componentes

```
<LoginPage>                         ← rota pública /login
  ├── <BackgroundAtmosphere />      ← glows decorativos, apenas visual
  ├── <LoginHeader />               ← BrandMark sem step/close
  ├── <HeroBlock />                 ← título + subtítulo
  ├── <LoginForm />                 ← formulário controlado
  │     ├── <InputField name="identifier" />   ← e-mail ou CPF
  │     ├── <InputField name="password" />     ← senha com toggle
  │     ├── <FormFooterRow />       ← checkbox "manter sessão" + link "Esqueci"
  │     └── <SubmitButton />        ← CTA principal
  └── <LoginPageFooter />           ← "Não tem conta?" + badge TLS·LGPD
```

### 3.2 Componentes Primitivos Reutilizáveis

Os primitivos abaixo são **compartilhados** com as telas de cadastro. Devem residir em `src/components/ui/`.

| Componente      | Arquivo             | Descrição                          |
| --------------- | ------------------- | ---------------------------------- |
| `BrandMark`     | `BrandMark.tsx`     | Logo ARENA + wordmark              |
| `Eyebrow`       | `Eyebrow.tsx`       | Label mono caps (rótulos de campo) |
| `InputField`    | `InputField.tsx`    | Campo de texto unificado           |
| `PrimaryButton` | `PrimaryButton.tsx` | Botão CTA blood/bone               |

---

## 4. ESPECIFICAÇÃO VISUAL DETALHADA

### 4.1 Layout Geral

```
┌─────────────────────────────────────┐
│  [Header: BrandMark]                │  ← sticky, z-index 40
├─────────────────────────────────────┤
│                                     │
│  ░ SISTEMA DE ORQUESTRAÇÃO DE LUTAS │  ← Eyebrow copper
│                                     │
│  Bem-vindo de                       │
│  volta ao ringue.                   │  ← H1 display 56px/0.92lh
│                                     │
│  Acesse sua conta para gerenciar... │  ← body 13px, max-w 300px
│                                     │
├─────────────────────────────────────┤
│  [Campo: EMAIL OU CPF]              │
│  [Campo: SENHA]          [👁]       │
│  [✓ Manter sessão]  [Esqueci senha] │
├─────────────────────────────────────┤
│  [ENTRAR        →]                  │  ← botão full-width h=56
│  ─────────────────────────────────  │
│  Não tem conta? Criar agora  TLS·LGPD│
└─────────────────────────────────────┘
```

### 4.2 Fundo Atmosférico (BackgroundAtmosphere)

Dois glows decorativos `pointer-events: none`, absolutamente posicionados, sem impacto no layout:

```ts
// Glow 1 — canto superior direito (blood)
{
  position: 'absolute',
  top: -100, right: -120,
  width: 460, height: 460,
  background: 'radial-gradient(circle, rgba(210,38,56,0.28) 0%, transparent 65%)',
}

// Glow 2 — canto inferior esquerdo (copper)
{
  position: 'absolute',
  bottom: -120, left: -80,
  width: 320, height: 320,
  background: 'radial-gradient(circle, rgba(216,161,104,0.08) 0%, transparent 65%)',
}
```

### 4.3 Header (LoginHeader)

```ts
// Posicionamento
position: sticky | top: 0 | z-index: 40
height: 56px
padding: 12px 18px 0
display: flex | alignItems: center | justifyContent: space-between

// Conteúdo
- BrandMark (tamanho 28px)
- SEM step counter (tela de login não é etapa de cadastro)
- SEM botão de fechar
```

**BrandMark — sub-componente:**

```ts
// Ícone (quadrado arredondado)
width: 28, height: 28
borderRadius: 8
background: linear-gradient(135deg, #d22638 0%, #7c1422 100%)
boxShadow: '0 0 0 1px rgba(255,255,255,0.06) inset, 0 4px 12px rgba(210,38,56,0.28)'

// SVG interno — path estilizado "A" / seta (16×16)
stroke: white | strokeWidth: 1.8 | strokeLinecap/join: round

// Wordmark
"ARENA"       → font-display, 800, 16px, #f3f3f5
"MATCHMAKING" → font-mono, 8.5px, ls 0.2em, #6b6e76, uppercase
```

### 4.4 Bloco Hero (HeroBlock)

```ts
// Eyebrow
fontFamily: font-mono
fontSize: 10px | letterSpacing: 0.22em
color: copper (#d8a168)
textTransform: uppercase
content: "SISTEMA DE ORQUESTRAÇÃO DE LUTAS"

// H1 principal
fontFamily: font-display | fontWeight: 800
fontSize: clamp(40px, 8vw, 56px)   ← responsivo
lineHeight: 0.92
letterSpacing: -0.02em
color: textHi (#f3f3f5)

// Palavra "ringue" em destaque
color: blood (#d22638)

// Subtítulo
fontFamily: font-ui | fontSize: 13px
lineHeight: 1.5 | color: textMid
maxWidth: 300px
content: "Acesse sua conta para gerenciar eventos, cartéis e o card da próxima noite."
```

### 4.5 Componente InputField

O campo é o mesmo primitivo usado em todas as telas do sistema. Três estados visuais:

#### Estado: Default

```ts
background: surf3 (#232529)
border: 1px solid border1 (#25272d)
borderRadius: r-md (10px)
padding: 14px 16px
color: textHi
fontSize: 15px | fontWeight: 500 | fontFamily: font-ui
```

#### Estado: Focused / Active

```ts
border: 1px solid blood (#d22638)
boxShadow: 0 0 0 3px rgba(210,38,56,0.10)
// Transição: border-color 0.15s ease, box-shadow 0.15s ease
```

#### Estado: Error

```ts
border: 1px solid #d22638
boxShadow: 0 0 0 3px rgba(210,38,56,0.15)
// Mensagem de erro abaixo do campo
// font-ui, 12px, #d22638
```

#### Label (Eyebrow acima do campo)

```ts
fontFamily: font-mono
fontSize: 10px | letterSpacing: 0.22em
color: textLow | textTransform: uppercase
marginBottom: 7px
```

#### Campo SENHA — trailing icon

```ts
// Ícone de olho (toggle visibilidade)
// SVG 18×18 | stroke: textLow | strokeWidth: 1.6
// onClick: alterna type="password" ↔ type="text"
// aria-label: "Mostrar senha" / "Ocultar senha"
```

### 4.6 Linha de Rodapé do Formulário (FormFooterRow)

```ts
display: flex
justifyContent: space-between
alignItems: center
marginTop: 4px

// Checkbox "Manter sessão ativa"
{
  checkbox: {
    width: 18, height: 18,
    borderRadius: 5,
    // checked: background blood gradient + checkmark SVG branco
    // unchecked: background surf3, border border2
  }
  label: { fontFamily: font-ui, fontSize: 12px, fontWeight: 500, color: textMid }
}

// Link "Esqueci a senha"
{
  fontFamily: font-ui, fontSize: 12px, fontWeight: 500,
  color: copper (#d8a168),
  cursor: pointer,
  // Sem sublinhado por padrão; underline no hover
}
```

### 4.7 Botão de Submit (PrimaryButton — variante blood)

```ts
width: 100%
height: 56px
background: linear-gradient(180deg, #d22638 0%, #b41f30 100%)
color: textHi (#f3f3f5)
border: none
borderRadius: r-md (10px)
fontFamily: font-display | fontWeight: 700
fontSize: 17px | letterSpacing: 0.04em
textTransform: uppercase
display: flex | alignItems: center | justifyContent: center | gap: 12px
cursor: pointer
boxShadow: '0 1px 0 rgba(255,255,255,0.15) inset, 0 12px 28px rgba(210,38,56,0.28)'

// Ícone de seta direita (SVG 18×18)
// stroke: white | strokeWidth: 1.8

// Estado: hover
filter: brightness(1.08)
transition: filter 0.15s ease

// Estado: active/pressed
transform: scale(0.98)
boxShadow: (reduzido)

// Estado: loading
- Substituir texto por spinner circular (16px, stroke branco, animação rotate 360° 0.8s linear infinite)
- Botão disabled durante loading

// Estado: disabled
opacity: 0.5 | cursor: not-allowed
```

### 4.8 Rodapé da Página (LoginPageFooter)

```ts
marginTop: 18px
paddingTop: 16px
borderTop: 1px solid border1 (#25272d)
display: flex | justifyContent: space-between | alignItems: center

// Esquerda — link de cadastro
{
  fontFamily: font-ui, fontSize: 13px, fontWeight: 500,
  color: textMid
  "Não tem conta? " → normal
  "Criar agora"     → color textHi, fontWeight: 600, cursor: pointer
}

// Direita — badge de segurança
{
  fontFamily: font-mono, fontSize: 10px,
  letterSpacing: 0.22em, color: textLow,
  textTransform: uppercase,
  content: "TLS · LGPD"
}
```

---

## 5. RESPONSIVIDADE

### 5.1 Estratégia

Mobile-first. A tela foi desenhada para **390×844** (iPhone 14 base). O layout deve se adaptar fluidamente para tablets e desktop.

### 5.2 Breakpoints

```ts
// tokens/breakpoints.ts
export const breakpoints = {
  sm: '480px', // smartphone largo
  md: '768px', // tablet portrait
  lg: '1024px', // tablet landscape / desktop pequeno
  xl: '1280px', // desktop
} as const
```

### 5.3 Comportamento por Breakpoint

#### Mobile (< 480px) — base

```
Layout: coluna única, scroll vertical
Padding horizontal: 18–22px
Hero: H1 clamp(36px, 9vw, 56px)
Form: ocupa 100% da largura
Botão: full-width
```

#### Tablet (480px – 1023px)

```
Layout: coluna centralizada, max-width: 480px, margin: 0 auto
Padding horizontal: 32px
Hero: H1 ~48px
Form: max-width: 420px, centralizado
```

#### Desktop (≥ 1024px)

```
Layout: split-screen 50/50 (ou centered card)

OPÇÃO A — Split Screen (recomendada para organizadores):
├── Coluna esquerda (50%): hero, branding, glow atmosférico
└── Coluna direita (50%): form card centralizado verticamente

OPÇÃO B — Centered Card:
Card centralizado: width: 460px, padding: 48px
background: surf1 | border: 1px solid border1 | borderRadius: r-xl | shadow: pop
Fundo: bg-app com glows atmosféricos em tela cheia
```

> **Decisão de implementação:** Opção B é mais simples e coerente com o visual dark enterprise. Recomendada para MVP.

#### Desktop — Card Centralizado

```ts
// Container externo
minHeight: 100vh
display: flex | alignItems: center | justifyContent: center
background: bgApp (#101114)
position: relative | overflow: hidden   // para os glows

// Card
width: 460px
padding: 48px
background: surf1 (#16171b)
border: 1px solid border1 (#25272d)
borderRadius: r-xl (20px)
boxShadow: pop
position: relative | zIndex: 1

// Hero dentro do card — desktop
H1: 44px (não precisa ser tão grande com o card contido)
marginBottom: 32px
```

---

## 6. ESTADOS DA TELA

### 6.1 Estado: Idle (default)

Campo de email/CPF vazio ou com placeholder.  
Botão habilitado mas sem ação (validar antes de submit).

### 6.2 Estado: Digitando

Campo ativo com borda blood e ring de 3px.  
Feedback visual imediato.

### 6.3 Estado: Loading (após submit)

```ts
// Botão entra em loading
- Texto "Entrar" substituído por spinner
- pointer-events: none | opacity: 0.85

// Campos
- readOnly: true durante loading
- opacity: 0.7
```

### 6.4 Estado: Erro de Credenciais

```ts
// Mensagem de erro inline (abaixo dos campos)
{
  background: rgba(210, 38, 56, 0.08),
  border: '1px solid rgba(210, 38, 56, 0.3)',
  borderRadius: r-md,
  padding: '12px 14px',
  display: flex, gap: 10,

  // Ícone de aviso: SVG triângulo/exclamação, 16×16, stroke blood

  // Texto
  fontFamily: font-ui, fontSize: 13px, color: #f3a0a7
  content: "E-mail, CPF ou senha incorretos. Tente novamente."
}

// Campos entram em estado error (borda vermelha)
// NÃO especificar qual campo está errado (segurança)
```

### 6.5 Estado: Sucesso

Não há feedback visual explícito de sucesso — o sistema simplesmente redireciona.  
A transição deve ser rápida (< 300ms) para sensação de responsividade.

### 6.6 Estado: Conta Bloqueada (rate limit)

```ts
// Após N tentativas falhas (definido pelo backend)
{
  // Mensagem de bloqueio temporário
  content: 'Acesso temporariamente bloqueado. Aguarde alguns minutos.'
  // Botão desabilitado com countdown opcional
}
```

---

## 7. COMPORTAMENTO E VALIDAÇÃO

### 7.1 Campo "EMAIL OU CPF"

```ts
type: "text"  // não "email" — aceita CPF também
inputMode: "email"  // teclado mobile preferido

// Detecção de tipo
- Se contém '@' → tratar como email
- Se contém apenas dígitos (com ou sem pontos/traço) → tratar como CPF

// Formatação automática de CPF (opcional, UX)
// Input: 12345678901 → Display: 123.456.789-01
// Enviar ao backend sempre sem formatação (só dígitos)

// Validação client-side (apenas formato, antes do submit)
- Email: regex básico /^[^\s@]+@[^\s@]+\.[^\s@]+$/
- CPF: 11 dígitos + algoritmo de validação de dígitos verificadores
- Campo vazio: "Informe seu e-mail ou CPF"
```

### 7.2 Campo "SENHA"

```ts
type: "password" (default) | "text" (toggle visibilidade)
autoComplete: "current-password"
minLength: 8 (validação básica client-side apenas)

// Validação
- Campo vazio: "Informe sua senha"
- Menos de 8 chars: NÃO mostrar (a criação de conta valida isso; aqui só verifica se está vazio)
```

### 7.3 Checkbox "Manter sessão ativa"

```ts
// Comportamento
- Checked (default): token de sessão com expiração longa (ex: 30 dias)
- Unchecked: sessão expira ao fechar o navegador (sessionStorage ou token de curta duração)

// Estado inicial: checked = true
```

### 7.4 Link "Esqueci a senha"

```ts
// Ação: navegar para /forgot-password (rota pública)
// Não abre modal na tela de login (manter fluxo simples)
```

### 7.5 Link "Criar agora"

```ts
// Ação: navegar para /register (fluxo de cadastro — 4 etapas)
```

### 7.6 Submit — Regras

```ts
// Habilitar submit quando:
- Identifier não está vazio
- Password não está vazio

// Não bloquear botão por validação de formato (feedback apenas após submit)
// Prevenir double-submit: desabilitar durante loading
```

---

## 8. ESTRUTURA DE ARQUIVOS

```
src/
├── pages/
│   └── Login/
│       ├── index.tsx                    ← LoginPage (rota /login)
│       ├── LoginPage.styled.ts          ← styled-components
│       └── LoginPage.test.tsx           ← testes unitários
│
├── components/
│   └── ui/
│       ├── BrandMark/
│       │   ├── index.tsx
│       │   └── BrandMark.styled.ts
│       ├── InputField/
│       │   ├── index.tsx
│       │   └── InputField.styled.ts
│       ├── PrimaryButton/
│       │   ├── index.tsx
│       │   └── PrimaryButton.styled.ts
│       └── Eyebrow/
│           ├── index.tsx
│           └── Eyebrow.styled.ts
│
├── tokens/
│   ├── colors.ts
│   ├── typography.ts
│   ├── radius.ts
│   ├── shadows.ts
│   └── breakpoints.ts
│
├── styles/
│   └── GlobalStyles.ts                  ← reset, body, font imports
│
├── hooks/
│   └── useAuth.ts                       ← contexto de autenticação
│
└── i18n/
    └── pt-BR/
        └── auth.ts                      ← strings da tela de login
```

---

## 9. INTERFACES TYPESCRIPT

```ts
// types/auth.ts

export interface LoginFormValues {
  identifier: string // email ou CPF
  password: string
  keepSession: boolean
}

export interface LoginFormErrors {
  identifier?: string
  password?: string
  general?: string // erro não vinculado a campo específico
}

export interface LoginResponse {
  accessToken: string
  refreshToken?: string
  user: {
    id: string
    role: 'ORGANIZER' | 'ATHLETE' | 'COACH'
    name: string
  }
}

// props dos componentes UI
export interface InputFieldProps {
  label: string
  name: string
  type?: 'text' | 'password' | 'email'
  value: string
  onChange: (value: string) => void
  error?: string
  hint?: string
  trailingIcon?: React.ReactNode
  onTrailingClick?: () => void
  active?: boolean
  mono?: boolean
  placeholder?: string
  autoComplete?: string
  disabled?: boolean
}

export interface PrimaryButtonProps {
  label: string
  onClick?: () => void
  type?: 'button' | 'submit'
  loading?: boolean
  disabled?: boolean
  variant?: 'blood' | 'bone'
  fullWidth?: boolean
  trailingIcon?: React.ReactNode
}
```

---

## 10. CONTRATOS COM O BACKEND

### 10.1 Endpoint de Login

```
POST /api/v1/auth/login
Content-Type: application/json

Request body:
{
  "identifier": "kaike@arena.fight",  // email ou CPF (sem formatação)
  "password": "...",
  "keepSession": true
}

Response 200 OK:
{
  "accessToken": "eyJ...",
  "refreshToken": "eyJ...",   // opcional, se keepSession = true
  "user": {
    "id": "uuid",
    "role": "ORGANIZER" | "ATHLETE" | "COACH",
    "name": "Kaike Cesar Oliveira"
  }
}

Response 401 Unauthorized:
{
  "error": "INVALID_CREDENTIALS",
  "message": "E-mail, CPF ou senha incorretos."
}

Response 429 Too Many Requests:
{
  "error": "RATE_LIMITED",
  "message": "Muitas tentativas. Aguarde N minutos.",
  "retryAfter": 300   // segundos
}
```

### 10.2 Redirecionamento Pós-Login

```ts
// Lógica de redirecionamento por role
switch (user.role) {
  case 'ORGANIZER':
    navigate('/dashboard/events')
    break
  case 'ATHLETE':
    navigate('/profile')
    break
  case 'COACH':
    navigate('/dashboard/athletes')
    break
  default:
    navigate('/')
}

// Se havia redirect pendente (ex: acesso direto a rota protegida)
// Redirecionar para a rota original após login
const from = location.state?.from || defaultByRole
navigate(from)
```

### 10.3 Armazenamento de Sessão

```ts
// keepSession = true  → accessToken em httpOnly cookie (preferível) ou localStorage
// keepSession = false → accessToken em sessionStorage ou cookie de sessão

// ATENÇÃO LGPD: não armazenar dados pessoais no storage — apenas o token
```

### 10.4 Logging de Autenticação (RNF-OBS)

O backend deve registrar no audit log:

- Tentativa de login (sucesso/falha) com timestamp
- User-agent e IP (anonimizados conforme LGPD)
- Sem registrar senha em nenhum log

---

## 11. INTERNACIONALIZAÇÃO

```ts
// i18n/pt-BR/auth.ts
export const authStrings = {
  // Eyebrow
  systemTagline: 'SISTEMA DE ORQUESTRAÇÃO DE LUTAS',

  // Hero
  heroLine1: 'Bem-vindo de',
  heroLine2: 'volta ao',
  heroHighlight: 'ringue',
  heroSubtitle: 'Acesse sua conta para gerenciar eventos, cartéis e o card da próxima noite.',

  // Campos
  fieldEmailLabel: 'EMAIL OU CPF',
  fieldPasswordLabel: 'SENHA',
  fieldEmailPlaceholder: '',
  fieldPasswordPlaceholder: '',

  // Ações
  keepSession: 'Manter sessão ativa',
  forgotPassword: 'Esqueci a senha',
  submitButton: 'Entrar',

  // Rodapé
  noAccount: 'Não tem conta?',
  createAccount: 'Criar agora',
  securityBadge: 'TLS · LGPD',

  // Erros
  errorInvalidCredentials: 'E-mail, CPF ou senha incorretos. Tente novamente.',
  errorRateLimited: 'Acesso temporariamente bloqueado. Aguarde alguns minutos.',
  errorGeneric: 'Ocorreu um erro. Tente novamente.',
  errorEmptyIdentifier: 'Informe seu e-mail ou CPF.',
  errorEmptyPassword: 'Informe sua senha.',

  // Acessibilidade
  a11yToggleShowPassword: 'Mostrar senha',
  a11yToggleHidePassword: 'Ocultar senha',
  a11yLoadingButton: 'Entrando...',
} as const
```

---

## 12. ACESSIBILIDADE (A11Y)

> Conforme decisão do documento de requisitos (seção 10.9), acessibilidade formal não é requisito do MVP. Porém, as boas práticas abaixo têm custo zero e devem ser implementadas:

```html
<!-- Campos de formulário -->
<label htmlFor="identifier">Email ou CPF</label>
<input id="identifier" aria-label="Email ou CPF" aria-describedby="identifier-error" />
<span id="identifier-error" role="alert">{errorMessage}</span>

<!-- Botão de toggle de senha -->
<button type="button" aria-label="Mostrar senha" aria-pressed="{isVisible}" />

<!-- Botão de submit durante loading -->
<button aria-busy="{isLoading}" aria-label="Entrando..." disabled />

<!-- Erro geral -->
<div role="alert" aria-live="polite">{generalError}</div>
```

---

## 13. ANIMAÇÕES E TRANSIÇÕES

```ts
// Todas as transições devem respeitar prefers-reduced-motion
// @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }

// Transições de campo
border-color: 0.15s ease
box-shadow: 0.15s ease

// Transição do botão
filter (hover): 0.15s ease
transform (press): 0.1s ease

// Aparecimento da mensagem de erro
opacity: 0 → 1: 0.2s ease
transform: translateY(-4px) → translateY(0): 0.2s ease

// Spinner de loading
animation: rotate 0.8s linear infinite
```

---

## 14. CRITÉRIOS DE ACEITE

### 14.1 Funcionais

- [ ] Login bem-sucedido com e-mail válido + senha correta
- [ ] Login bem-sucedido com CPF (com ou sem formatação) + senha correta
- [ ] Exibição de erro genérico em credenciais inválidas (sem especificar qual campo)
- [ ] Checkbox "manter sessão" persiste preferência e afeta duração do token
- [ ] Link "Esqueci a senha" navega para `/forgot-password`
- [ ] Link "Criar agora" navega para `/register`
- [ ] Redirecionamento pós-login correto por role (Organizador → /dashboard/events, etc.)
- [ ] Toggle de visibilidade da senha funciona
- [ ] Double-submit prevenido

### 14.2 Visuais

- [ ] Tokens de cor aplicados corretamente (sem hard-coded colors fora do sistema)
- [ ] Tipografia: Barlow Semi Condensed (hero + botão), Manrope (body + campos), JetBrains Mono (eyebrows + senha)
- [ ] Glows atmosféricos presentes e sem impacto no layout
- [ ] Campo ativo exibe borda blood + ring 3px
- [ ] Botão Entrar com gradiente blood + sombra glowing

### 14.3 Responsividade

- [ ] Layout funcional e legível em 320px (mínimo)
- [ ] Layout funcional e legível em 390px (design base)
- [ ] Layout funcional em 768px (tablet)
- [ ] Layout funcional em 1280px (desktop — card centralizado)
- [ ] Nenhum scroll horizontal em nenhum breakpoint

### 14.4 Segurança e Performance

- [ ] Nenhuma senha logada no console ou network
- [ ] Formulário não submetido com campos vazios
- [ ] Loading state ativo durante a requisição
- [ ] Resposta em < 1.5s p95 (SLO definido em RNF-001)
- [ ] Rate limit handling (estado 429 tratado na UI)

---

## 15. DEPENDÊNCIAS

```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "styled-components": "^6.x",
  "react-router-dom": "^6.x",
  "@types/styled-components": "^5.x"
}
```

---

_Especificação gerada com base em `Arena_Matchmaking.html`, `unified.jsx`, `styles.css` e `REQUIREMENTS v0.8`._  
_Próxima etapa: implementação + testes unitários dos componentes primitivos._
