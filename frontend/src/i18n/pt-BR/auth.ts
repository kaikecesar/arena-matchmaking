/* *************************************************************************************************
****************************************** LOGIN STRINGS *******************************************
************************************************************************************************* */
export const authStrings = {
  systemTagline: 'OPERAÇÃO · EVENTOS · CARDS',

  heroLine1: 'Controle o próximo',
  heroHighlight: 'card.',
  heroSubtitle:
    'Organize atletas, monte confrontos e publique cards com controle operacional em tempo real.',

  fieldEmailLabel: 'E-mail ou CPF',
  fieldPasswordLabel: 'Senha',

  keepSession: 'Manter conectado',
  forgotPassword: 'Esqueci a senha',
  submitButton: 'Acessar painel',

  noAccount: 'Sem conta?',
  createAccount: 'Criar acesso',
  hasAccount: 'Já tem conta?',
  signIn: 'Entrar',
  securityBadge: 'Conexão protegida · LGPD',

  errorEmptyIdentifier: 'Informe seu e-mail ou CPF.',
  errorInvalidIdentifier: 'Informe um e-mail ou CPF válido.',
  errorEmptyPassword: 'Informe sua senha.',
  errorInvalidCredentials: 'E-mail, CPF ou senha incorretos. Tente novamente.',
  errorRateLimited: 'Acesso temporariamente bloqueado. Aguarde alguns minutos.',
  errorNetwork: 'Não foi possível conectar. Verifique sua rede e tente novamente.',
  errorSessionExpired: 'Sua sessão expirou. Faça login novamente.',
  errorGeneric: 'Ocorreu um erro. Tente novamente.',

  loginSuccess: 'Acesso confirmado. Redirecionando…',

  a11yShowPassword: 'Mostrar senha',
  a11yHidePassword: 'Ocultar senha',
  a11yLoading: 'Entrando…',

  /* ***********************************************************************************************
  **************************************** REGISTER STRINGS ****************************************
  *********************************************************************************************** */
  register: {
    eyebrow: 'NOVO ACESSO',
    heroLine1: 'Configure sua',
    heroHighlight: 'operação.',
    heroSubtitle: 'Escolha seu perfil e conclua o cadastro em poucos passos.',
    stepRole: 'Perfil',
    stepProfile: 'Dados',
    stepSecurity: 'Segurança',
    stepReview: 'Revisão',
    roleTitle: 'Qual é o seu papel na operação?',
    roleSubtitle: 'O painel será adaptado ao seu fluxo de trabalho.',
    roles: {
      organizer: {
        title: 'Organizador',
        description: 'Crie eventos, monte cards e publique confrontos.',
      },
      athlete: {
        title: 'Atleta',
        description: 'Acompanhe convocações, status e histórico de lutas.',
      },
      coach: {
        title: 'Treinador',
        description: 'Gerencie atletas, equipes e preparação para eventos.',
      },
    },
    fieldName: 'Nome completo',
    fieldEmail: 'E-mail',
    fieldDocument: 'CPF',
    fieldPassword: 'Senha',
    fieldConfirmPassword: 'Confirmar senha',
    continue: 'Continuar',
    back: 'Voltar',
    submit: 'Criar conta',
    reviewTitle: 'Revise seus dados',
    reviewRole: 'Perfil',
    reviewName: 'Nome',
    reviewEmail: 'E-mail',
    reviewDocument: 'CPF',
    successTitle: 'Conta criada',
    successSubtitle: 'Seu acesso foi configurado. Entrando no painel…',
    errorName: 'Informe seu nome completo.',
    errorEmail: 'Informe um e-mail válido.',
    errorDocument: 'Informe um CPF válido.',
    errorPassword: 'A senha deve ter no mínimo 8 caracteres.',
    errorPasswordWeak: 'Use maiúsculas, minúsculas e números na senha.',
    errorConfirmPassword: 'Confirme sua senha.',
    errorPasswordMismatch: 'As senhas não coincidem.',
    errorEmailInUse: 'Este e-mail já está em uso.',
    errorSelectRole: 'Selecione um perfil para continuar.',
    strength: {
      weak: 'Fraca',
      fair: 'Razoável',
      good: 'Boa',
      strong: 'Forte',
    },
  },

  /* ***********************************************************************************************
  ***************************************** FORGOT STRINGS *****************************************
  *********************************************************************************************** */
  forgot: {
    eyebrow: 'RECUPERAÇÃO',
    heroLine1: 'Redefina seu',
    heroHighlight: 'acesso.',
    heroSubtitle: 'Informe o e-mail ou CPF cadastrado. Enviaremos as instruções de recuperação.',
    fieldIdentifier: 'E-mail ou CPF',
    submit: 'Enviar instruções',
    backToLogin: 'Voltar ao login',
    successTitle: 'Instruções enviadas',
    successSubtitle:
      'Se o cadastro existir, você receberá um link para redefinir a senha em instantes.',
    errorEmptyIdentifier: 'Informe seu e-mail ou CPF.',
    errorInvalidIdentifier: 'Informe um e-mail ou CPF válido.',
  },

  /* ***********************************************************************************************
  ***************************************** RESET STRINGS ******************************************
  *********************************************************************************************** */
  reset: {
    eyebrow: 'NOVA SENHA',
    heroLine1: 'Defina uma nova',
    heroHighlight: 'senha.',
    heroSubtitle: 'Crie uma senha forte para proteger sua conta operacional.',
    fieldPassword: 'Nova senha',
    fieldConfirmPassword: 'Confirmar senha',
    submit: 'Salvar senha',
    successTitle: 'Senha atualizada',
    successSubtitle: 'Sua nova senha foi salva. Você já pode acessar o painel.',
    goToLogin: 'Ir para login',
    errorPassword: 'A senha deve ter no mínimo 8 caracteres.',
    errorPasswordWeak: 'Use maiúsculas, minúsculas e números na senha.',
    errorConfirmPassword: 'Confirme sua senha.',
    errorPasswordMismatch: 'As senhas não coincidem.',
    errorInvalidToken: 'Link inválido ou expirado. Solicite uma nova recuperação.',
    strength: {
      weak: 'Fraca',
      fair: 'Razoável',
      good: 'Boa',
      strong: 'Forte',
    },
  },

  /* ***********************************************************************************************
  *************************************** DASHBOARD STRINGS ****************************************
  *********************************************************************************************** */
  dashboard: {
    eyebrow: 'PAINEL OPERACIONAL',
    logout: 'Sair',
    organizer: {
      title: 'Central de eventos',
      subtitle: 'Gerencie cards, confrontos e publicação do próximo evento.',
    },
    athlete: {
      title: 'Meu perfil de atleta',
      subtitle: 'Acompanhe convocações, status de luta e histórico competitivo.',
    },
    coach: {
      title: 'Gestão de atletas',
      subtitle: 'Organize elenco, preparação e disponibilidade para cards.',
    },
  },
} as const

export type AuthStrings = typeof authStrings
