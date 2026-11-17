export const TOKEN_KEY = 'travelbuddy_token'
export const USER_KEY = 'travelbuddy_user'

export const LIMITS = {
  USERNAME_MIN: 3,
  USERNAME_MAX: 20,
  PASSWORD_MIN: 6,
  BIO_MAX: 255,
  DESTINATION_TITLE_MAX: 100,
  DESTINATION_DESCRIPTION_MAX: 500,
  COMMENT_MAX: 500,
  COLLECTION_TITLE_MIN: 3,
  COLLECTION_TITLE_MAX: 100,
  COLLECTION_DESCRIPTION_MAX: 500,
}

export const SEARCH = {
  MIN_LENGTH: 2,
  DEBOUNCE_MS: 400,
}

export const PAGE_SIZE = 12

export const TOAST_DURATION_MS = {
  success: 3000,
  info: 4000,
  error: 6000,
}

export const MESSAGES = {
  GENERIC_ERROR: 'Ocorreu um erro na requisição.',
  NETWORK_ERROR: 'Não foi possível se conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.',
  REQUEST_SETUP_ERROR: 'Erro inesperado ao preparar a requisição.',
}

export const NOTIFICATIONS = {
  POLL_MS: 30000,
}

export const NOTIFICATION_TEXT = {
  like: 'curtiu o seu destino',
  comment: 'comentou no seu destino',
  follow: 'começou a seguir você',
}

export const REPORT_REASONS = [
  { value: 'inappropriate_content', label: 'Conteúdo impróprio' },
  { value: 'harassment', label: 'Assédio ou discurso de ódio' },
  { value: 'spam', label: 'Spam ou golpes' },
  { value: 'copyright', label: 'Violação de direitos autorais' },
  { value: 'other', label: 'Outro' },
]
