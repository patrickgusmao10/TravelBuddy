import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

export function useAuth() {
  const authStore = useAuthStore()
  const router = useRouter()

  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const currentUser = computed(() => authStore.user)

  async function logout() {
    await authStore.logout()
    router.push({ name: 'login' })
  }

  function updateUser(newUserData) {
    authStore.updateUser(newUserData)
  }

  return { isAuthenticated, currentUser, logout, updateUser }
}