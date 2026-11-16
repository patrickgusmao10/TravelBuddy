<script setup>
import { reactive } from 'vue'
import {
  getCollectionsStatus,
  addDestinationToCollection,
  removeDestinationFromCollection,
} from '../../services/collectionService'
import { useAsyncData } from '../../composables/useAsyncData'
import { runOptimistic } from '../../utils/optimistic'
import BaseModal from '../base/BaseModal.vue'

const props = defineProps({
  destinationId: { type: Number, required: true },
})

const emit = defineEmits(['close'])

const { data: collections, isLoading, error } = useAsyncData(
  () => getCollectionsStatus(props.destinationId),
  { initialData: [] },
)

const busyIds = reactive(new Set())

function toggle(collection) {
  if (busyIds.has(collection.id)) {
    return Promise.resolve()
  }

  busyIds.add(collection.id)

  const wasInCollection = collection.hasDestination

  return runOptimistic({
    apply() {
      const previousCount = collection.destinationsCount

      collection.hasDestination = !wasInCollection
      collection.destinationsCount = previousCount + (wasInCollection ? -1 : 1)

      return () => {
        collection.hasDestination = wasInCollection
        collection.destinationsCount = previousCount
      }
    },
    request: () => wasInCollection
      ? removeDestinationFromCollection(collection.id, props.destinationId)
      : addDestinationToCollection(collection.id, props.destinationId),
    confirm(data) {
      collection.destinationsCount = data.destinationsCount
    },
  }).finally(() => {
    busyIds.delete(collection.id)
  })
}
</script>

<template>
  <BaseModal title="Salvar em coleção" @close="emit('close')">
    <p v-if="isLoading" class="text-center text-muted mb-0">
      Carregando...
    </p>

    <p v-else-if="error" class="text-danger text-center mb-0">
      {{ error }}
    </p>

    <template v-else>
      <p v-if="collections.length === 0" class="mb-0">
        Você ainda não tem coleções.
        <router-link :to="{ name: 'my-collections' }" @click="emit('close')">
          Crie a primeira
        </router-link>.
      </p>

      <ul v-else class="list-group">
        <li
          v-for="collection in collections"
          :key="collection.id"
          class="list-group-item"
        >
          <div class="form-check mb-0">
            <input
              :id="`collection-check-${collection.id}`"
              class="form-check-input"
              type="checkbox"
              :checked="collection.hasDestination"
              :disabled="busyIds.has(collection.id)"
              @change="toggle(collection)"
            />

            <label
              class="form-check-label d-flex justify-content-between"
              :for="`collection-check-${collection.id}`"
            >
              <span>
                {{ collection.title }}
                <i
                  v-if="!collection.isPublic"
                  class="bi bi-lock-fill text-muted ms-1"
                  title="Coleção privada"
                ></i>
              </span>

              <span class="text-muted small ms-2">
                {{ collection.destinationsCount }}
                {{ collection.destinationsCount === 1 ? 'destino' : 'destinos' }}
              </span>
            </label>
          </div>
        </li>
      </ul>
    </template>
  </BaseModal>
</template>