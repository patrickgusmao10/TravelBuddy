<script setup>
import { ref, reactive } from 'vue'
import { getAdminUsers, setUserBlocked } from '../../services/adminService'
import { usePaginatedList } from '../../composables/usePaginatedList'
import { useDebouncedValue } from '../../composables/useDebouncedValue'
import { useAuth } from '../../composables/useAuth'
import { useToast } from '../../composables/useToast'
import { getProfilePictureUrl } from '../../utils/media'
import { SEARCH } from '../../config/constants'
import BaseButton from '../../components/base/BaseButton.vue'
import ConfirmModal from '../../components/base/ConfirmModal.vue'

const toast = useToast()
const { currentUser } = useAuth()

const typedText = ref('')
const term = useDebouncedValue(typedText, SEARCH.DEBOUNCE_MS)

const {
  items: users,
  hasMore,
  isLoading,
  isLoadingMore,
  error,
  loadMore
} = usePaginatedList(
  (page, limit) => getAdminUsers(term.value.trim(), page, limit),
  undefined,
  { watch: term }
)

const busyIds = reactive(new Set())
const userToBlock = ref(null)

async function changeBlocked(user, isBlocked) {
  if (busyIds.has(user.id)) {
    return
  }

  busyIds.add(user.id)

  try {
    const response = await setUserBlocked(user.id, isBlocked)

    user.isBlocked = response.data.isBlocked
    toast.success(response.message)
    userToBlock.value = null
  } catch {
  } finally {
    busyIds.delete(user.id)
  }
}
</script>

<template>
  <div>
    <div class="input-group mb-4">
      <span class="input-group-text bg-white">
        <i class="bi bi-search"></i>
      </span>

      <input
        v-model="typedText"
        type="search"
        class="form-control"
        placeholder="Buscar por usuário, nome ou e-mail"
        aria-label="Buscar usuários"
      />
    </div>

    <p v-if="isLoading" class="text-center text-muted">Carregando...</p>

    <p v-else-if="error" class="text-danger text-center">{{ error }}</p>

    <template v-else>
      <div v-if="users.length === 0" class="alert alert-info text-center">
        Nenhum usuário encontrado.
      </div>

      <ul v-else class="list-group">
        <li
          v-for="user in users"
          :key="user.id"
          class="list-group-item d-flex align-items-center gap-3"
          data-testid="user-row"
        >
          <img
            :src="getProfilePictureUrl(user.profilePicture)"
            :alt="user.username"
            class="rounded-circle"
            width="40"
            height="40"
            style="object-fit: cover;"
          />

          <div class="flex-grow-1">
            <router-link
              :to="{ name: 'public-profile', params: { username: user.username } }"
              class="fw-semibold text-decoration-none"
            >
              @{{ user.username }}
            </router-link>

            <span v-if="user.isAdmin" class="badge text-bg-primary ms-2">
              Admin
            </span>

            <span v-if="user.isBlocked" class="badge text-bg-danger ms-2">
              Bloqueado
            </span>

            <div class="small text-muted">
              {{ user.email }} · {{ user.destinationsCount }} destinos ·
              {{ user.followersCount }} seguidores
            </div>
          </div>

          <span v-if="user.id === currentUser?.id" class="small text-muted">
            Você
          </span>

          <span v-else-if="user.isAdmin" class="small text-muted">
            Administrador
          </span>

          <button
            v-else-if="user.isBlocked"
            type="button"
            class="btn btn-sm btn-outline-success"
            :disabled="busyIds.has(user.id)"
            @click="changeBlocked(user, false)"
          >
            Desbloquear
          </button>

          <button
            v-else
            type="button"
            class="btn btn-sm btn-outline-danger"
            @click="userToBlock = user"
          >
            Bloquear
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
          Carregar mais usuários
        </BaseButton>
      </div>
    </template>

    <ConfirmModal
      v-if="userToBlock"
      title="Bloquear usuário"
      :message="`Bloquear @${userToBlock.username}? A pessoa será desconectada na hora e não conseguirá entrar até ser desbloqueada.`"
      confirm-label="Bloquear"
      :busy="busyIds.has(userToBlock.id)"
      @confirm="changeBlocked(userToBlock, true)"
      @close="userToBlock = null"
    />
  </div>
</template>