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
  forgotPassword: 'Esqueceu a senha?',
  submitButton: 'Acessar painel',

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
    eyebrow: 'MATCHMAKING · OPERAÇÃO DE EVENTOS',
    title: 'Controle total do próximo card.',
    subtitle:
      'Gerencie atletas, confrontos e publicação em tempo real.',
    sessionLive: 'Conexão segura',
  },

  loginSuccess: 'Acesso confirmado. Redirecionando…',

  a11yShowPassword: 'Mostrar senha',
  a11yHidePassword: 'Ocultar senha',
  a11yLoading: 'Acessando painel…',
  a11yLoginForm: 'Formulário de acesso ao painel',

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
