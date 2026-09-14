/*
 * Interceptores da API:
 *
 * 1. Antes de cada requisição, verificamos se existe um token salvo
 *    e, se existir, enviamos no cabeçalho Authorization.
 *
 * 2. Quando a requisição funciona, retornamos diretamente os dados da resposta.
 *
 * 3. Se a API responder 401, limpamos a sessão e redirecionamos para o login.
 *
 * 4. Para os demais erros da API, usamos a mensagem enviada pelo backend.
 *
 * 5. Se nenhuma resposta chegar, mostramos uma mensagem de falha de conexão.
 */

import axios from 'axios'

const TOKEN_KEY = 'travelbuddy_token'
const USER_KEY = 'travelbuddy_user'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response.data,

  (error) => {
    if (error.response) {
      const apiError = error.response.data

      if (error.response.status === 401) {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)

        if (window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
      }

      return Promise.reject({
        message: apiError.message || 'Ocorreu um erro na requisição.',
        errors: apiError.errors || [],
        status: error.response.status,
      })
    } else if (error.request) {
      return Promise.reject({
        message:
          'Não foi possível se conectar ao servidor. Verifique sua conexão ou tente novamente.',
        errors: [],
        status: null,
      })
    } else {
      return Promise.reject({
        message: 'Erro inesperado ao preparar a requisição.',
        errors: [],
        status: null,
      })
    }
  }
)

export default api