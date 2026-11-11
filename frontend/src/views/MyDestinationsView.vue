<script setup>
import { ref } from 'vue'
import { getMyDestinations, deleteDestination } from '../services/destinationService'
import { useAuth } from '../composables/useAuth'
import { useAsyncData } from '../composables/useAsyncData'
import { useToast } from '../composables/useToast'
import DestinationCard from '../components/base/DestinationCard.vue'
import BaseModal from '../components/base/BaseModal.vue'

const { currentUser } = useAuth()
const toast = useToast()

const {
  data: destinations,
  isLoading,
  error,
} = useAsyncData(getMyDestinations, { initialData: [] })

const destinationToDelete = ref(null)
const isDeleting = ref(false)

function askDelete(destination) {
  destinationToDelete.value = destination
}

function cancelDelete() {
  destinationToDelete.value = null
}

async function confirmDelete() {
  isDeleting.value = true

  try {
    await deleteDestination(destinationToDelete.value.id)

    destinations.value = destinations.value.filter(
      (destination) => destination.id !== destinationToDelete.value.id
    )

    destinationToDelete.value = null
    toast.success('Destino excluído.')
  } catch {
  } finally {
    isDeleting.value = false
  }
}
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="fw-bold mb-0">Meus Destinos</h4>

      <router-link
        :to="{ name: 'destination-upload' }"
        class="btn btn-primary rounded-pill px-4"
      >
        <i class="bi bi-plus-lg"></i> Novo destino
      </router-link>
    </div>

    <p v-if="isLoading" class="text-center text-muted">
      Carregando...
    </p>

    <p v-else-if="error" class="text-danger text-center">
      {{ error }}
    </p>

    <template v-else>
      <div
        v-if="destinations.length === 0"
        class="alert alert-info text-center"
      >
        Você ainda não enviou nenhum destino.
        <router-link :to="{ name: 'destination-upload' }">
          Envie o primeiro agora
        </router-link>.
      </div>

      <div v-else class="row g-4">
        <div
          v-for="destination in destinations"
          :key="destination.id"
          class="col-6 col-md-4 col-lg-3"
        >
          <DestinationCard
            :destination="destination"
            :author="currentUser"
          >
            <template #actions>
              <div class="d-flex gap-2 mt-3">
                <router-link
                  :to="{ name: 'destination-edit', params: { id: destination.id } }"
                  class="btn btn-sm btn-outline-secondary flex-fill"
                >
                  <i class="bi bi-pencil"></i> Editar
                </router-link>

                <button
                  type="button"
                  class="btn btn-sm btn-outline-danger flex-fill"
                  @click="askDelete(destination)"
                >
                  <i class="bi bi-trash"></i> Excluir
                </button>
              </div>
            </template>
          </DestinationCard>
        </div>
      </div>
    </template>

    <BaseModal
      v-if="destinationToDelete"
      title="Excluir destino"
      :busy="isDeleting"
      @close="cancelDelete"
    >
      <p class="mb-0">
        Tem certeza que deseja excluir
        <strong>{{ destinationToDelete.title }}</strong>?
        Essa ação não pode ser desfeita.
      </p>

      <template #footer>
        <button
          type="button"
          class="btn btn-secondary"
          :disabled="isDeleting"
          @click="cancelDelete"
        >
          Cancelar
        </button>

        <button
          type="button"
          class="btn btn-danger"
          :disabled="isDeleting"
          @click="confirmDelete"
        >
          {{ isDeleting ? 'Excluindo...' : 'Excluir' }}
        </button>
      </template>
    </BaseModal>
  </div>
</template>