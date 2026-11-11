import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from './useAuth'

export function useAuthenticatedAction(action) {
  const route = useRoute()
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  const isBusy = ref(false)

  async function run() {
    if (!isAuthenticated.value) {
      router.push({ name: 'login', query: { redirect: route.fullPath } })
      return
    }

    if (isBusy.value) {
      return
    }

    isBusy.value = true

    try {
      await action()
    } finally {
      isBusy.value = false
    }
  }

  return { run, isBusy }
}