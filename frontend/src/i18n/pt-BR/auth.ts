/* *************************************************************************************************
****************************************** LOGIN STRINGS *******************************************
************************************************************************************************* */
export const authStrings = {
  systemTagline: 'MATCHMAKING · OPERAÇÃO DE EVENTOS',

  heroLine1: 'Controle o próximo',
  heroHighlight: 'card.',
  heroSubtitle:
    'Atletas, confrontos e publicação de cards em tempo real.',

  fieldEmailLabel: 'E-mail',
  fieldPasswordLabel: 'Senha',

  keepSession: 'Manter conectado',
  forgotPassword: 'Esqueci a senha',
  submitButton: 'Acessar painel',

  noAccount: 'Sem conta?',
  createAccount: 'Criar agora',
  hasAccount: 'Já tem conta?',
  signIn: 'Entrar',
  securityBadge: 'Conexão protegida · LGPD',

  errorEmptyIdentifier: 'Informe seu e-mail',
  errorInvalidIdentifier: 'Informe um e-mail valido',
  errorEmptyPassword: 'Informe sua senha',
  errorInvalidCredentials: 'E-mail ou senha incorretos. Tente novamente.',
  errorRateLimited: 'Acesso temporariamente bloqueado. Aguarde alguns minutos.',
  errorNetwork: 'Não foi possível conectar. Verifique sua rede e tente novamente.',
  errorSessionExpired: 'Sua sessão expirou. Faça login novamente.',
  errorGeneric: 'Não foi possível concluir a operação. Tente novamente.',

  validation: {
    fallbackField: 'Verifique este campo',
    fallbackEmail: 'Digite um e-mail válido',
  },

  bootstrapLoading: 'Carregando painel…',

  contextPanel: {
    eyebrow: 'INFRAESTRUTURA · MATCHMAKING',
    title: 'Operação em tempo real',
    subtitle:
      'Montagem de cards, confrontos e publicação para o evento ativo.',
    eventLabel: 'Evento em preparação',
    eventName: 'Arena Regional — Card Q2',
    modulesHeading: 'Indicadores operacionais',
    modules: [
      { label: 'Card ativo', value: '—', hint: 'Aguardando publicação' },
      { label: 'Inscrições', value: '24', hint: 'Pré-cadastro aberto' },
      { label: 'Confrontos', value: '8', hint: 'Em montagem' },
    ],
    telemetry: ['TLS 1.3', 'LAT 12ms', 'NODE-SP-02'],
    syncLabel: 'Última sincronização',
    syncValue: '2 min atrás',
    sessionLive: 'Operação ativa',
  },

  loginSuccess: 'Acesso confirmado. Redirecionando…',

  a11yShowPassword: 'Mostrar senha',
  a11yHidePassword: 'Ocultar senha',
  a11yLoading: 'Acessando painel…',
  a11yLoginForm: 'Formulário de acesso ao painel',
  a11yStepProgress: 'Etapas do cadastro',

  /* ***********************************************************************************************
  **************************************** REGISTER STRINGS ****************************************
  *********************************************************************************************** */
  register: {
    eyebrow: 'CADASTRO · OPERAÇÃO',
    heroLine1: 'Configure sua',
    heroHighlight: 'operação',
    heroSubtitle:
      'Perfil, dados e credencial de acesso ao painel de matchmaking.',
    stepRole: 'Perfil',
    stepProfile: 'Dados',
    stepSecurity: 'Segurança',
    stepReview: 'Revisão',
    roleTitle: 'Função na operação',
    roleSubtitle:
      'Define o painel, permissões e o fluxo de trabalho no evento.',
    roles: {
      organizer: {
        title: 'Organizador',
        description: 'Cria eventos, monta cards e publica confrontos.',
      },
      athlete: {
        title: 'Atleta',
        description: 'Acompanha convocações, pesagem e status no card.',
      },
      coach: {
        title: 'Treinador',
        description: 'Coordena atletas, elenco e disponibilidade para lutas.',
      },
    },
    fieldName: 'Nome completo',
    fieldEmail: 'E-mail',
    fieldDocument: 'CPF',
    fieldPassword: 'Senha de acesso',
    fieldConfirmPassword: 'Confirmar senha',
    continue: 'Continuar',
    back: 'Voltar',
    submit: 'Concluir cadastro',
    reviewTitle: 'Revisão do cadastro',
    reviewRole: 'Função',
    reviewName: 'Nome',
    reviewEmail: 'E-mail',
    reviewDocument: 'CPF',
    successTitle: 'Cadastro concluído',
    successSubtitle: 'Redirecionando para o painel da sua função…',
    errorName: 'Informe seu nome completo',
    errorEmail: 'Informe seu e-mail',
    errorEmailInvalid: 'Digite um e-mail válido',
    errorDocument: 'Informe um CPF válido',
    errorPassword: 'Use no mínimo 8 caracteres',
    errorPasswordWeak: 'Inclua maiúsculas, minúsculas e números',
    errorConfirmPassword: 'Confirme sua senha',
    errorPasswordMismatch: 'As senhas não coincidem',
    errorEmailInUse: 'Este e-mail já está cadastrado',
    errorSelectRole: 'Selecione uma função para continuar',
    strengthLabel: 'Força da senha',
    strength: {
      weak: 'Fraca',
      fair: 'Regular',
      good: 'Adequada',
      strong: 'Forte',
    },
  },

  /* ***********************************************************************************************
  ***************************************** FORGOT STRINGS *****************************************
  *********************************************************************************************** */
  forgot: {
    eyebrow: 'RECUPERAÇÃO DE ACESSO',
    heroLine1: 'Recuperar',
    heroHighlight: 'acesso',
    heroSubtitle:
      'Informe o e-mail ou CPF cadastrado. Enviaremos o link de redefinição.',
    fieldIdentifier: 'E-mail ou CPF',
    submit: 'Enviar instruções',
    backToLogin: 'Voltar ao login',
    successTitle: 'Instruções enviadas',
    successSubtitle:
      'Se o cadastro existir, você receberá um link para redefinir a senha em instantes.',
    errorEmptyIdentifier: 'Informe seu e-mail ou CPF',
    errorInvalidIdentifier: 'Informe um e-mail ou CPF válido',
  },

  /* ***********************************************************************************************
  ***************************************** RESET STRINGS ******************************************
  *********************************************************************************************** */
  reset: {
    eyebrow: 'NOVA SENHA',
    heroLine1: 'Redefinir',
    heroHighlight: 'senha',
    heroSubtitle:
      'Crie uma senha forte para proteger o acesso ao painel operacional.',
    fieldPassword: 'Nova senha',
    fieldConfirmPassword: 'Confirmar senha',
    submit: 'Salvar senha',
    successTitle: 'Senha atualizada',
    successSubtitle: 'Sua nova senha foi salva. Você já pode acessar o painel.',
    goToLogin: 'Acessar painel',
    errorPassword: 'Use no mínimo 8 caracteres',
    errorPasswordWeak: 'Inclua maiúsculas, minúsculas e números',
    errorConfirmPassword: 'Confirme sua senha',
    errorPasswordMismatch: 'As senhas não coincidem',
    errorInvalidToken: 'Link inválido ou expirado. Solicite uma nova recuperação',
    strengthLabel: 'Força da senha',
    strength: {
      weak: 'Fraca',
      fair: 'Regular',
      good: 'Adequada',
      strong: 'Forte',
    },
  },

  /* ***********************************************************************************************
  *************************************** DASHBOARD STRINGS ****************************************
  *********************************************************************************************** */
  dashboard: {
    eyebrow: 'PAINEL OPERACIONAL',
    logout: 'Encerrar sessão',
    sessionLive: 'Operação ativa',
    lastSync: 'Última sincronização',
    lastSyncValue: '2 min atrás',
    roleLabels: {
      organizer: 'Organizador',
      athlete: 'Atleta',
      coach: 'Treinador',
    },
    modulesHeading: 'Indicadores',
    organizer: {
      title: 'Central de eventos',
      subtitle:
        'Montagem de cards, confrontos e publicação para o evento ativo.',
      modules: [
        { label: 'Card ativo', value: '—', hint: 'Sem publicação' },
        { label: 'Inscrições', value: '0', hint: 'Abre com novo evento' },
        { label: 'Confrontos', value: '0', hint: 'Pendente de montagem' },
      ],
    },
    athlete: {
      title: 'Painel do atleta',
      subtitle:
        'Convocações, pesagem e status no card do evento.',
      modules: [
        { label: 'Próximo confronto', value: '—', hint: 'Sem card' },
        { label: 'Pesagem', value: '—', hint: 'Aguardando convocação' },
        { label: 'Histórico', value: '0', hint: 'Lutas registradas' },
      ],
    },
    coach: {
      title: 'Gestão de atletas',
      subtitle:
        'Elenco, disponibilidade e preparação para o card.',
      modules: [
        { label: 'Atletas', value: '0', hint: 'Cadastrar elenco' },
        { label: 'Disponíveis', value: '0', hint: 'No card atual' },
        { label: 'Convocações', value: '0', hint: 'Sem resposta' },
      ],
    },
  },
} as const

export type AuthStrings = typeof authStrings
