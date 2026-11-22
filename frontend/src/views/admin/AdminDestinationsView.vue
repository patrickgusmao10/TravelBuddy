<script setup>
import { ref } from 'vue'
import { getAdminDestinations, deleteAdminDestination } from '../../services/adminService'
import { usePaginatedList } from '../../composables/usePaginatedList'
import { useDebouncedValue } from '../../composables/useDebouncedValue'
import { useToast } from '../../composables/useToast'
import { getDestinationImageUrl } from '../../utils/media'
import { SEARCH } from '../../config/constants'
import BaseButton from '../../components/base/BaseButton.vue'
import ConfirmModal from '../../components/base/ConfirmModal.vue'

const toast = useToast()

const typedText = ref('')
const term = useDebouncedValue(typedText, SEARCH.DEBOUNCE_MS)

const {
  items: destinations,
  hasMore,
  isLoading,
  isLoadingMore,
  error,
  loadMore
} = usePaginatedList(
  (page, limit) => getAdminDestinations(term.value.trim(), page, limit),
  undefined,
  { watch: term }
)

const destinationToDelete = ref(null)
const isDeleting = ref(false)

async function confirmDelete() {
  if (isDeleting.value) {
    return
  }

  const destination = destinationToDelete.value
  isDeleting.value = true

  try {
    const response = await deleteAdminDestination(destination.id)

    destinations.value = destinations.value.filter(
      (item) => item.id !== destination.id
    )

    toast.success(response.message)
    destinationToDelete.value = null
  } catch {
  } finally {
    isDeleting.value = false
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
        placeholder="Buscar destino pelo título"
        aria-label="Buscar destinos"
      />
    </div>

    <p v-if="isLoading" class="text-center text-muted">Carregando...</p>

    <p v-else-if="error" class="text-danger text-center">{{ error }}</p>

    <template v-else>
      <div v-if="destinations.length === 0" class="alert alert-info text-center">
        Nenhum destino encontrado.
      </div>

      <ul v-else class="list-group">
        <li
          v-for="destination in destinations"
          :key="destination.id"
          class="list-group-item d-flex align-items-center gap-3"
          data-testid="destination-row"
        >
          <router-link
            :to="{ name: 'destination-detail', params: { id: destination.id } }"
          >
            <img
              :src="getDestinationImageUrl(destination.imagePath)"
              :alt="destination.title"
              width="96"
              height="54"
              style="object-fit: cover;"
            />
          </router-link>

          <div class="flex-grow-1">
            <router-link
              :to="{ name: 'destination-detail', params: { id: destination.id } }"
              class="fw-semibold text-decoration-none"
            >
              {{ destination.title }}
            </router-link>

            <span
              v-if="destination.pendingReportsCount > 0"
              class="badge text-bg-danger ms-2"
            >
              {{ destination.pendingReportsCount }}
              {{ destination.pendingReportsCount === 1 ? 'denúncia pendente' : 'denúncias pendentes' }}
            </span>

            <div class="small text-muted">
              de @{{ destination.User.username }} ·
              {{ destination.views }} visualizações ·
              {{ destination.likesCount }} curtidas
            </div>
          </div>

          <button
            type="button"
            class="btn btn-sm btn-outline-danger"
            @click="destinationToDelete = destination"
          >
            Excluir
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
          Carregar mais destinos
        </BaseButton>
      </div>
    </template>

    <ConfirmModal
      v-if="destinationToDelete"
      title="Excluir destino"
      :message="`Excluir “${destinationToDelete.title}”? Isso apaga também as curtidas, os comentários, as denúncias e os arquivos do destino. Não dá para desfazer.`"
      confirm-label="Excluir"
      :busy="isDeleting"
      @confirm="confirmDelete"
      @close="destinationToDelete = null"
    />
  </div>
</template>