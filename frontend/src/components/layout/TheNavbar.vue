<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'
import { useClickOutside } from '../../composables/useClickOutside'
import { useNotificationStore } from '../../stores/notifications'
import { getProfilePictureUrl } from '../../utils/media'

const router = useRouter()
const { isAuthenticated, currentUser, logout } = useAuth()

const notificationStore = useNotificationStore()
const unreadCount = computed(() => notificationStore.unreadCount)
const unreadLabel = computed(() => (unreadCount.value > 99 ? '99+' : String(unreadCount.value)))

watch(isAuthenticated, (loggedIn) => {
  if (loggedIn) {
    notificationStore.startPolling()
  } else {
    notificationStore.stopPolling()
  }
}, { immediate: true })

onUnmounted(() => notificationStore.stopPolling())

const isMenuOpen = ref(false)
const menuRef = ref(null)
const searchText = ref('')

function submitSearch() {
  const q = searchText.value.trim()

  if (!q) return

  router.push({ name: 'search', query: { q } })
  searchText.value = ''
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

useClickOutside(menuRef, closeMenu)
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
    <div class="container-fluid px-lg-5">
      <router-link class="navbar-brand" to="/">
        <i class="bi bi-play-fill"></i> TRAVELBUDDY
      </router-link>

      <form
        role="search"
        class="d-flex align-items-center mx-3 flex-grow-1"
        style="max-width: 400px;"
        @submit.prevent="submitSearch"
      >
        <div class="input-group">
          <input
            v-model="searchText"
            type="search"
            class="form-control"
            placeholder="Buscar destinos e pessoas"
            aria-label="Buscar destinos e pessoas"
          />

          <button
            type="submit"
            class="btn btn-outline-secondary"
            aria-label="Buscar"
          >
            <i class="bi bi-search"></i>
          </button>
        </div>
      </form>

      <div class="d-flex align-items-center gap-2">
        <template v-if="!isAuthenticated">
          <router-link to="/login" class="btn btn-outline-primary px-4">
            Entrar
          </router-link>

          <router-link to="/register" class="btn btn-primary text-white px-4">
            Criar Conta
          </router-link>
        </template>

        <template v-else>
          <router-link to="/feed/geral" class="nav-link">
            Feed
          </router-link>

          <router-link
            :to="{ name: 'destination-upload' }"
            class="nav-link"
          >
            Enviar Destino
          </router-link>

          <router-link
            :to="{ name: 'notifications' }"
            class="btn btn-outline-dark border-0 position-relative"
            :aria-label="unreadCount > 0 ? `Notificações (${unreadCount} não lidas)` : 'Notificações'"
          >
            <i class="bi bi-bell"></i>
            <span
              v-if="unreadCount > 0"
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            >
              {{ unreadLabel }}
            </span>
          </router-link>

          <div
            ref="menuRef"
            class="dropdown"
            @keydown.esc="closeMenu"
          >
            <button
              type="button"
              class="nav-link dropdown-toggle d-flex align-items-center gap-2"
              aria-haspopup="true"
              :aria-expanded="isMenuOpen"
              @click="toggleMenu"
            >
              <img
                :src="getProfilePictureUrl(currentUser?.profilePicture)"
                alt=""
                width="32"
                height="32"
                class="rounded-circle"
                style="object-fit: cover;"
              />

              {{ currentUser?.username }}
            </button>

            <ul
              v-if="isMenuOpen"
              class="dropdown-menu dropdown-menu-end show shadow border-0"
              data-bs-popper="static"
              @click="closeMenu"
            >
              <li>
                <router-link
                  :to="{ name: 'my-profile' }"
                  class="dropdown-item py-2"
                >
                  <i class="bi bi-gear me-2"></i> Editar Perfil
                </router-link>
              </li>

              <li>
                <router-link
                  :to="{ name: 'public-profile', params: { username: currentUser?.username } }"
                  class="dropdown-item py-2"
                >
                  <i class="bi bi-person me-2"></i> Ver Perfil
                </router-link>
              </li>

              <li>
                <router-link
                  :to="{ name: 'my-destinations' }"
                  class="dropdown-item py-2"
                >
                  <i class="bi bi-images me-2"></i> Meus Destinos
                </router-link>
              </li>

              <li>
                <router-link
                  :to="{ name: 'my-collections' }"
                  class="dropdown-item py-2"
                >
                  <i class="bi bi-collection me-2"></i> Minhas Coleções
                </router-link>
              </li>

              <li>
                <hr class="dropdown-divider" />
              </li>

              <li>
                <button
                  type="button"
                  class="dropdown-item py-2 text-danger"
                  @click="logout"
                >
                  <i class="bi bi-box-arrow-right me-2"></i> Sair
                </button>
              </li>
            </ul>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>