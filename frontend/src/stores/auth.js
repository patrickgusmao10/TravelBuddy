import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  login as loginRequest,
  logout as logoutRequest
} from '../services/authService'

const TOKEN_KEY = 'travelbuddy_token'
const USER_KEY = 'travelbuddy_user'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem(TOKEN_KEY) || null)
  const user = ref(
    JSON.parse(localStorage.getItem(USER_KEY) || 'null')
  )

  const isAuthenticated = computed(() => !!token.value)

  async function login(credentials) {
    const response = await loginRequest(credentials)

    token.value = response.data.token
    user.value = response.data.user

    localStorage.setItem(TOKEN_KEY, token.value)
    localStorage.setItem(
      USER_KEY,
      JSON.stringify(user.value)
    )

    return response
  }

  async function logout() {
    token.value = null
    user.value = null

    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)

    try {
      await logoutRequest()
    } catch (error) {
      console.error(
        'Erro ao notificar logout à API:',
        error.message
      )
    }
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout
  }
})