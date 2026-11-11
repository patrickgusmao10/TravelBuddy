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