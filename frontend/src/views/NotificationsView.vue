<script setup>
import { reactive } from 'vue'
import { getNotifications, markNotificationAsRead } from '../services/notificationService'
import { usePaginatedList } from '../composables/usePaginatedList'
import { useNotificationStore } from '../stores/notifications'
import { runOptimistic } from '../utils/optimistic'
import { formatDateTime } from '../utils/format'
import { getProfilePictureUrl } from '../utils/media'
import { NOTIFICATION_TEXT } from '../config/constants'
import BaseButton from '../components/base/BaseButton.vue'

const notificationStore = useNotificationStore()

const {
  items: notifications,
  hasMore,
  isLoading,
  isLoadingMore,
  error,
  loadMore,
  reload
} = usePaginatedList(getNotifications)

const busyIds = reactive(new Set())

function markAsRead(notification) {
  if (notification.isRead || busyIds.has(notification.id)) {
    return Promise.resolve()
  }

  busyIds.add(notification.id)

  return runOptimistic({
    apply() {
      notification.isRead = true
      notificationStore.setUnreadCount(
        Math.max(0, notificationStore.unreadCount - 1)
      )

      return () => {
        notification.isRead = false
        notificationStore.setUnreadCount(notificationStore.unreadCount + 1)
      }
    },

    request: () => markNotificationAsRead(notification.id),

    confirm(data) {
      notification.isRead = true
      notificationStore.setUnreadCount(data.unreadCount)
    }
  }).finally(() => {
    busyIds.delete(notification.id)
  })
}

function destinationOf(notification) {
  if (notification.type === 'follow') {
    return {
      name: 'public-profile',
      params: { username: notification.Actor.username }
    }
  }

  return {
    name: 'destination-detail',
    params: { id: notification.destinationId }
  }
}
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="fw-bold mb-0">Notificações</h4>

      <button
        type="button"
        class="btn btn-outline-secondary btn-sm rounded-pill"
        :disabled="isLoading"
        @click="reload"
      >
        <i class="bi bi-arrow-clockwise"></i> Atualizar
      </button>
    </div>

    <p v-if="isLoading" class="text-center text-muted">
      Carregando...
    </p>

    <p v-else-if="error" class="text-danger text-center">
      {{ error }}
    </p>

    <template v-else>
      <div
        v-if="notifications.length === 0"
        class="alert alert-info text-center"
      >
        Nenhuma notificação por aqui ainda. Quando alguém curtir ou
        comentar um destino seu, ou começar a seguir você, o aviso
        aparece aqui.
      </div>

      <ul v-else class="list-group">
        <li
          v-for="notification in notifications"
          :key="notification.id"
          class="list-group-item d-flex align-items-center gap-3"
          :class="{ 'bg-light': !notification.isRead }"
        >
          <img
            :src="getProfilePictureUrl(notification.Actor.profilePicture)"
            :alt="notification.Actor.username"
            class="rounded-circle"
            width="40"
            height="40"
            style="object-fit: cover;"
          />

          <div class="flex-grow-1">
            <router-link
              :to="destinationOf(notification)"
              class="text-decoration-none text-dark"
              @click="markAsRead(notification)"
            >
              <span :class="{ 'fw-semibold': !notification.isRead }">
                @{{ notification.Actor.username }}
                {{ NOTIFICATION_TEXT[notification.type] }}
                <template v-if="notification.Destination">
                  : {{ notification.Destination.title }}
                </template>
              </span>
            </router-link>

            <div class="small text-muted">
              {{ formatDateTime(notification.createdAt) }}
            </div>
          </div>

          <button
            v-if="!notification.isRead"
            type="button"
            class="btn btn-sm btn-outline-secondary"
            :disabled="busyIds.has(notification.id)"
            @click="markAsRead(notification)"
          >
            Marcar como lida
          </button>
        </li>
      </ul>

      <div v-if="hasMore" class="text-center mt-4">
        <BaseButton
          variant="outline-primary"
          :loading="isLoadingMore"
          loading-text="Carregando..."
          @click="loadMore"
        >
          Carregar mais notificações
        </BaseButton>
      </div>
    </template>
  </div>
</template>