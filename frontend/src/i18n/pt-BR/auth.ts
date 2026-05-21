export const authStrings = {
  // Eyebrow hero
  systemTagline: 'SISTEMA DE ORQUESTRAÇÃO DE LUTAS',

  // Hero block
  heroLine1: 'Bem-vindo de volta ao',
  heroHighlight: 'ringue',
  heroSubtitle: 'Acesse sua conta para gerenciar eventos, cartéis e o card da próxima noite.',

  // Field labels
  fieldEmailLabel: 'EMAIL OU CPF',
  fieldPasswordLabel: 'SENHA',

  // Form actions
  keepSession: 'Manter sessão ativa',
  forgotPassword: 'Esqueci a senha',
  submitButton: 'Entrar',

  // Footer
  noAccount: 'Não tem conta?',
  createAccount: 'Criar agora',
  securityBadge: 'TLS · LGPD',

  // Validation errors
  errorEmptyIdentifier: 'Informe seu e-mail ou CPF.',
  errorEmptyPassword: 'Informe sua senha.',
  errorInvalidCredentials: 'E-mail, CPF ou senha incorretos. Tente novamente.',
  errorRateLimited: 'Acesso temporariamente bloqueado. Aguarde alguns minutos.',
  errorGeneric: 'Ocorreu um erro. Tente novamente.',

  // Accessibility
  a11yShowPassword: 'Mostrar senha',
  a11yHidePassword: 'Ocultar senha',
  a11yLoading: 'Entrando...',
} as const

export type AuthStrings = typeof authStrings
