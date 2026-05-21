Você é um engenheiro frontend sênior especialista em React + TypeScript + Styled Components.

Sua tarefa é gerar a ESPECIFICAÇÃO TÉCNICA COMPLETA da tela de Login do projeto
"Arena Matchmaking", já estruturada na arquitetura de produção correta.

---

## CONTEXTO DO PROJETO

**Stack obrigatória:** React 18 + TypeScript + Styled Components v6 + React Router v6
**Design system:** Enterprise dark — tema único, sem modo light
**Responsividade:** Mobile-first. Breakpoints: sm(480px), md(768px), lg(1024px), xl(1280px)

---

## REGRA ARQUITETURAL PRINCIPAL

Todo valor de design (cor, fonte, espaçamento, radius, sombra, breakpoint) deve vir
EXCLUSIVAMENTE do theme. Nenhum valor hardcoded em nenhum componente.

O theme é injetado via ThemeProvider do styled-components e acessado assim:

  // em qualquer styled component:
  background: ${({ theme }) => theme.colors.surf3};
  font-family: ${({ theme }) => theme.fonts.display};
  border-radius: ${({ theme }) => theme.radius.md};

---

## ESTRUTURA DE ARQUIVOS ESPERADA

Especifique cada arquivo abaixo com seu conteúdo completo ou contrato detalhado:

src/
├── styles/
│   ├── theme.ts             ← OBJETO theme completo (cores, fontes, radius, sombras, breakpoints)
│   ├── GlobalStyles.ts      ← reset CSS + import de fontes Google + body base
│   └── styled.d.ts          ← declaração TypeScript do DefaultTheme (tipagem do theme)
│
├── components/
│   └── ui/                  ← primitivos reutilizáveis em TODAS as telas do app
│       ├── BrandMark/
│       │   ├── index.tsx
│       │   └── BrandMark.styles.ts
│       ├── InputField/
│       │   ├── index.tsx          ← componente controlado com estados: default, focused, error, disabled
│       │   ├── InputField.styles.ts
│       │   └── InputField.types.ts
│       ├── Button/
│       │   ├── index.tsx          ← variantes: 'blood' | 'bone' | 'ghost' + sizes
│       │   ├── Button.styles.ts
│       │   └── Button.types.ts
│       ├── Eyebrow/
│       │   ├── index.tsx
│       │   └── Eyebrow.styles.ts
│       └── Checkbox/
│           ├── index.tsx
│           └── Checkbox.styles.ts
│
├── features/
│   └── auth/
│       └── Login/
│           ├── index.tsx               ← LoginPage (composição das partes)
│           ├── Login.styles.ts         ← styled components da página
│           ├── Login.types.ts          ← interfaces LoginFormValues, LoginFormErrors
│           ├── useLoginForm.ts         ← hook: estado do form, validação, submit, loading
│           └── Login.test.tsx          ← critérios de aceite como testes
│
└── i18n/
    └── pt-BR/
        └── auth.ts             ← TODAS as strings da tela (zero string hardcoded nos componentes)


---

## ESPECIFICAÇÃO DO THEME (theme.ts)

O theme deve conter EXATAMENTE estes tokens, extraídos do design original:

### colors
// Superfícies (fundo → mais elevado)
bgApp, surf1, surf2, surf3
border1, border2

// Texto (mais alto → mais baixo)
textHi, textMid, textLow, textDim

// Acento principal — blood (vermelho)
blood, bloodSoft, bloodDeep, bloodGlow, bloodTint

// Acento metálico — copper
copper, copperDeep, copperTint

// Semânticas
success, warning, error

### fonts
display: 'Barlow Semi Condensed'   → títulos, botões CTA
ui: 'Manrope'                      → corpo, labels, campos
mono: 'JetBrains Mono'             → eyebrows, dados numéricos, status

### fontWeights
regular: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800, black: 900

### radius
sm: '6px', md: '10px', lg: '14px', xl: '20px'

### shadows
card, pop, ringBlood, buttonBlood

### breakpoints
sm: '480px', md: '768px', lg: '1024px', xl: '1280px'

### spacing
escala de 4px: xs(4px), sm(8px), md(12px), lg(16px), xl(20px), xxl(24px), xxxl(32px)

---

## ESPECIFICAÇÃO DO styled.d.ts

Declare a interface DefaultTheme com TODOS os campos acima para que o TypeScript infira
os acessos ao theme sem `any`. Exemplo de estrutura esperada:

  import 'styled-components';
  declare module 'styled-components' {
    export interface DefaultTheme {
      colors: { bgApp: string; surf1: string; ... };
      fonts: { display: string; ui: string; mono: string };
      // ... etc
    }
  }

---

## ESPECIFICAÇÃO DO i18n (pt-BR/auth.ts)

Estratégia: objeto estático simples, sem biblioteca de i18n.
Nenhum provider, nenhum hook, nenhuma chave dinâmica.
A estrutura de pasta existe para facilitar expansão futura, mas por ora
é apenas um import direto do objeto.

// i18n/pt-BR/auth.ts
export const authStrings = {
  systemTagline:            'SISTEMA DE ORQUESTRAÇÃO DE LUTAS',
  heroLine1:                'Bem-vindo de volta ao',
  heroHighlight:            'ringue',
  heroSubtitle:             'Acesse sua conta para gerenciar eventos, cartéis e o card da próxima noite.',
  fieldEmailLabel:          'EMAIL OU CPF',
  fieldPasswordLabel:       'SENHA',
  keepSession:              'Manter sessão ativa',
  forgotPassword:           'Esqueci a senha',
  submitButton:             'Entrar',
  noAccount:                'Não tem conta?',
  createAccount:            'Criar agora',
  securityBadge:            'TLS · LGPD',
  errorEmptyIdentifier:     'Informe seu e-mail ou CPF.',
  errorEmptyPassword:       'Informe sua senha.',
  errorInvalidCredentials:  'E-mail, CPF ou senha incorretos. Tente novamente.',
  errorRateLimited:         'Acesso temporariamente bloqueado. Aguarde alguns minutos.',
  errorGeneric:             'Ocorreu um erro. Tente novamente.',
  a11yShowPassword:         'Mostrar senha',
  a11yHidePassword:         'Ocultar senha',
  a11yLoading:              'Entrando...',
} as const;

// Uso nos componentes — import direto, sem hook:
import { authStrings } from '@/i18n/pt-BR/auth';
// <Button label={authStrings.submitButton} />

// RESTRIÇÃO: nenhuma string hardcoded nos componentes.
// Se no futuro houver necessidade de troca de idioma, a única mudança
// necessária é trocar o import — a estrutura já comporta isso.

---

## ESPECIFICAÇÃO DOS COMPONENTES UI

Para cada componente abaixo, especifique:
1. Interface de props (TypeScript)
2. Styled components internos (com acesso ao theme)
3. Variantes e estados visuais
4. Como é usado na LoginPage

### InputField
- Props: label, name, type, value, onChange, error?, hint?, trailingIcon?, active?, mono?, disabled?
- Styled: Wrapper, Label (Eyebrow), InputWrapper (área clicável), StyledInput, TrailingSlot, ErrorMessage
- Estados: default → focused (border blood + ring 3px) → error (border red + mensagem) → disabled (opacity 0.5)
- Label usa font-mono, 10px, letterSpacing 0.22em, uppercase
- Input usa: background surf3, border border1, borderRadius r-md, padding 14px 16px
- Transição em border-color e box-shadow: 0.15s ease

### Button (variante 'blood')
- Props: label, onClick?, type?, loading?, disabled?, variant?, fullWidth?, trailingIcon?
- Styled: StyledButton com variante via props
- blood: gradiente blood→bloodSoft, sombra glowing bloodGlow
- bone: gradiente #f7f6f3→#e5e2db, cor de texto bgApp
- ghost: background transparente, border border1
- Estado loading: substituir conteúdo por Spinner (SVG animado, rotate 360° 0.8s linear)
- Estado disabled: opacity 0.5, cursor not-allowed
- Hover: brightness(1.08) / Active: scale(0.98)

### Eyebrow
- Props: children, color?, as?
- Styled: font-mono, 10px, letterSpacing 0.22em, uppercase, color textLow (default)

### Checkbox
- Props: checked, onChange, label, name
- Visual checked: fundo blood gradient + checkmark SVG branco
- Visual unchecked: fundo surf3, borda border2
- Transição suave no checked state

### BrandMark
- Props: size? (default 28)
- Ícone: quadrado arredondado (r=8px) com gradiente blood diagonal + SVG interno
- Wordmark: "ARENA" (font-display 800 16px) + "MATCHMAKING" (font-mono 8.5px copper uppercase)

---

## ESPECIFICAÇÃO DA LoginPage

### Layout — Mobile (base 390px)
Tela cheia (min-height: 100dvh), background bgApp, overflow hidden para os glows.

Seções em ordem vertical:
1. BackgroundAtmosphere — dois glows decorativos, position absolute, pointer-events none
2. LoginHeader — BrandMark centralizado à esquerda, sem step counter, sem botão fechar
3. HeroBlock — eyebrow copper + H1 display + subtítulo
4. LoginForm — campos + checkbox + link
5. LoginPageFooter — CTA + link cadastro + badge segurança

### Layout — Desktop (≥ 1024px)
Card centralizado: width 460px, padding 48px, background surf1, border border1,
borderRadius r-xl, boxShadow pop. Fundo: bgApp com glows em tela cheia.

### HeroBlock
- Eyebrow: "SISTEMA DE ORQUESTRAÇÃO DE LUTAS" — font-mono, copper
- H1: "Bem-vindo de volta ao [ringue]." — font-display 800, fontSize clamp(40px, 8vw, 56px),
  lineHeight 0.92, letterSpacing -0.02em. A palavra "ringue" recebe color: blood
- Subtítulo: font-ui 13px, textMid, maxWidth 300px

### LoginForm (hook: useLoginForm)
Estado gerenciado pelo hook, NÃO com useState solto na página.

Campos:
- identifier: label "EMAIL OU CPF", type "text", autoComplete "username"
  Detectar CPF se string contém apenas dígitos; formatar visualmente (###.###.###-##)
  Enviar ao backend sempre sem formatação
- password: label "SENHA", type "password", autoComplete "current-password"
  trailingIcon: botão toggle visibilidade (ícone olho), aria-label dinâmico

Abaixo dos campos:
- Checkbox "Manter sessão ativa" (checked por padrão)
- Link "Esqueci a senha" → navigate('/forgot-password')

Mensagem de erro geral (quando generalError existe):
- Box com background bloodTint, border bloodSoft, borderRadius r-md, padding 12px 14px
- Ícone de aviso + texto — role="alert" para acessibilidade

CTA: Button variante blood, fullWidth, label "Entrar", type submit, loading={isLoading}

### useLoginForm (hook)
Retorna: { values, errors, isLoading, handleChange, handleSubmit, togglePasswordVisibility,
           isPasswordVisible, keepSession, toggleKeepSession, generalError }

Validações client-side (só no submit):
- identifier vazio → errors.identifier = i18n.errorEmptyIdentifier
- password vazio → errors.password = i18n.errorEmptyPassword
- CPF: validar 11 dígitos + algoritmo de dígitos verificadores

Submit:
- chamar POST /api/v1/auth/login com { identifier (sem formatação), password, keepSession }
- 200: armazenar token + redirecionar por role (ORGANIZER→/dashboard/events, ATHLETE→/profile, COACH→/dashboard/athletes)
- 401: generalError = i18n.errorInvalidCredentials
- 429: generalError = i18n.errorRateLimited
- outros: generalError = i18n.errorGeneric
- prevenir double-submit com isLoading

### LoginPageFooter
- Esquerda: "Não tem conta? [Criar agora]" — "Criar agora" navega para /register
- Direita: badge "TLS · LGPD" — font-mono, 10px, textLow
- Separados por borderTop border1

---

## ESPECIFICAÇÃO DO i18n (pt-BR/auth.ts)

Exporte um objeto const com TODAS as strings usadas na tela:
systemTagline, heroLine1, heroLine2, heroHighlight, heroSubtitle,
fieldEmailLabel, fieldPasswordLabel, keepSession, forgotPassword, submitButton,
noAccount, createAccount, securityBadge,
errorEmptyIdentifier, errorEmptyPassword, errorInvalidCredentials,
errorRateLimited, errorGeneric,
a11yShowPassword, a11yHidePassword, a11yLoading

Nenhuma string pode estar hardcoded nos componentes. Todos os textos vêm deste objeto.

---

## ANIMAÇÕES

Respeitar prefers-reduced-motion em todos os casos.

Transitions obrigatórias:
- campos: border-color 0.15s ease, box-shadow 0.15s ease
- botão hover: filter brightness 0.15s ease
- botão press: transform scale(0.98) 0.1s ease
- erro aparecendo: opacity 0→1 + translateY(-4px→0) 0.2s ease

Spinner de loading:
  @keyframes spin { to { transform: rotate(360deg); } }
  animation: spin 0.8s linear infinite

---

## CRITÉRIOS DE ACEITE (Login.test.tsx)

Gere os testes como comentários descritivos (ou Jest/RTL real), cobrindo:
1. Renderiza todos os elementos (logo, campos, botão, links)
2. Erro exibido ao submeter com campos vazios
3. Toggle de visibilidade de senha funciona
4. Estado loading ativo durante submit
5. Double-submit prevenido
6. Erro 401 exibe mensagem correta sem especificar campo
7. Erro 429 exibe mensagem de bloqueio
8. Checkbox keepSession checked por padrão
9. Link "Esqueci a senha" e "Criar agora" navegam corretamente
10. Redirecionamento correto por role após login bem-sucedido

---

## RESTRIÇÕES ABSOLUTAS

1. ZERO valor hardcoded nos componentes — toda cor, fonte, radius vem do theme
2. ZERO string hardcoded nos componentes — toda string vem do i18n
3. ZERO useState solto na página — lógica de form encapsulada no useLoginForm
4. Todos os styled components acessam o theme via ${({ theme }) => theme.*}
5. O styled.d.ts deve tipar o DefaultTheme completamente (sem `any`)
6. Componentes da pasta ui/ devem ser reutilizáveis em QUALQUER outra tela do app
7. Nenhum componente ui/ deve importar nada de features/ (dependência unidirecional)

---

## FORMATO DE ENTREGA

Para cada arquivo, entregue:
- Caminho completo
- Código completo (ou, para arquivos longos, contrato + seções críticas com código real)
- Anotações inline explicando decisões não óbvias

Comece pelo theme.ts e styled.d.ts, que são a fundação de tudo.