<script setup>
import { ref } from 'vue'
import { getMyCollections, deleteCollection } from '../../services/collectionService'
import { useAsyncData } from '../../composables/useAsyncData'
import { useToast } from '../../composables/useToast'
import BaseModal from '../../components/base/BaseModal.vue'
import CreateCollectionModal from '../../components/collection/CreateCollectionModal.vue'

const toast = useToast()

const { data: collections, isLoading, error } = useAsyncData(getMyCollections, {
  initialData: [],
})

const isCreating = ref(false)
const collectionToDelete = ref(null)
const isDeleting = ref(false)

function handleCreated(collection) {
  collections.value = [collection, ...collections.value]
  isCreating.value = false
  toast.success('Coleção criada.')
}

async function confirmDelete() {
  isDeleting.value = true

  try {
    await deleteCollection(collectionToDelete.value.id)

    collections.value = collections.value.filter(
      (collection) => collection.id !== collectionToDelete.value.id,
    )

    collectionToDelete.value = null
    toast.success('Coleção excluída.')
  } catch {
  } finally {
    isDeleting.value = false
  }
}
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="fw-bold mb-0">Minhas Coleções</h4>

      <button
        type="button"
        class="btn btn-primary rounded-pill px-4"
        @click="isCreating = true"
      >
        <i class="bi bi-plus-lg"></i> Nova coleção
      </button>
    </div>

    <p v-if="isLoading" class="text-center text-muted">Carregando...</p>
    <p v-else-if="error" class="text-danger text-center">{{ error }}</p>

    <template v-else>
      <div v-if="collections.length === 0" class="alert alert-info text-center">
        Você ainda não criou nenhuma coleção. Use o botão
        <strong>Nova coleção</strong> para começar.
      </div>

      <div v-else class="row g-4">
        <div
          v-for="collection in collections"
          :key="collection.id"
          class="col-12 col-md-6 col-lg-4"
        >
          <div class="card shadow-sm h-100">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title text-truncate">
                <router-link
                  :to="{ name: 'collection-detail', params: { id: collection.id } }"
                  class="text-decoration-none text-dark stretched-link"
                >
                  {{ collection.title }}
                </router-link>
              </h5>

              <p class="card-text text-muted small flex-grow-1">
                {{ collection.description || 'Sem descrição.' }}
              </p>

              <div class="d-flex justify-content-between align-items-center">
                <span class="small text-muted">
                  <i class="bi bi-collection"></i>
                  {{ collection.destinationsCount }}
                  {{ collection.destinationsCount === 1 ? 'destino' : 'destinos' }}
                </span>

                <span
                  class="badge"
                  :class="collection.isPublic ? 'text-bg-success' : 'text-bg-secondary'"
                >
                  {{ collection.isPublic ? 'Pública' : 'Privada' }}
                </span>
              </div>
            </div>

            <div class="card-footer bg-white border-0 pt-0">
              <button
                type="button"
                class="btn btn-sm btn-outline-danger w-100 position-relative"
                style="z-index: 2"
                @click="collectionToDelete = collection"
              >
                <i class="bi bi-trash"></i> Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <CreateCollectionModal
      v-if="isCreating"
      @close="isCreating = false"
      @created="handleCreated"
    />

    <BaseModal
      v-if="collectionToDelete"
      title="Excluir coleção"
      :busy="isDeleting"
      @close="collectionToDelete = null"
    >
      <p class="mb-0">
        Tem certeza que deseja excluir
        <strong>{{ collectionToDelete.title }}</strong>?
        Os destinos continuam existindo; só a coleção é apagada.
      </p>

      <template #footer>
        <button
          type="button"
          class="btn btn-secondary"
          :disabled="isDeleting"
          @click="collectionToDelete = null"
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