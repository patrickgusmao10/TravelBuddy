import axios from 'axios'
import { TOKEN_KEY, USER_KEY, MESSAGES } from '../config/constants'
import { useToast } from '../composables/useToast'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

function notifyIfNeeded(config, status, message) {
  const isRead = (config?.method || 'get').toLowerCase() === 'get'

  if (isRead || config?.silent || status === 401) {
    return
  }

  useToast().error(message)
}

api.interceptors.response.use(
  (response) => response.data,

  (error) => {
    let normalized

    if (error.response) {
      const apiError = error.response.data

      if (error.response.status === 401) {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)

        if (window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
      }

      normalized = {
        message: apiError?.message || MESSAGES.GENERIC_ERROR,
        errors: apiError?.errors || [],
        status: error.response.status,
      }
    } else if (error.request) {
      normalized = {
        message: MESSAGES.NETWORK_ERROR,
        errors: [],
        status: null,
      }
    } else {
      normalized = {
        message: MESSAGES.REQUEST_SETUP_ERROR,
        errors: [],
        status: null,
      }
    }

    notifyIfNeeded(error.config, normalized.status, normalized.message)

    return Promise.reject(normalized)
  }
)

export default api