import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUnreadCount } from '../services/notificationService'
import { NOTIFICATIONS } from '../config/constants'

export const useNotificationStore = defineStore('notifications', () => {
  const unreadCount = ref(0)

  let timerId = null
  let lastRefreshId = 0

  async function refresh() {
    const refreshId = ++lastRefreshId

    try {
      const response = await getUnreadCount()

      if (refreshId === lastRefreshId) {
        unreadCount.value = response.data.unreadCount
      }
    } catch {
    }
  }

  function setUnreadCount(value) {
    lastRefreshId++
    unreadCount.value = value
  }

  function refreshIfVisible() {
    if (document.visibilityState === 'visible') {
      refresh()
    }
  }

  function startPolling() {
    if (timerId !== null) {
      return
    }

    refresh()
    timerId = setInterval(refreshIfVisible, NOTIFICATIONS.POLL_MS)
    document.addEventListener('visibilitychange', refreshIfVisible)
  }

  function stopPolling() {
    clearInterval(timerId)
    timerId = null
    document.removeEventListener('visibilitychange', refreshIfVisible)

    lastRefreshId++
    unreadCount.value = 0
  }

  return { unreadCount, refresh, setUnreadCount, startPolling, stopPolling }
})