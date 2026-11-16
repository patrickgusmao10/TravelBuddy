<script setup>
import { useRoute } from 'vue-router'
import { getCollectionById, removeDestinationFromCollection } from '../../services/collectionService'
import { useAsyncData } from '../../composables/useAsyncData'
import { useToast } from '../../composables/useToast'
import { getProfilePictureUrl } from '../../utils/media'
import DestinationCard from '../../components/base/DestinationCard.vue'

const route = useRoute()
const toast = useToast()

const { data: collection, isLoading, error } = useAsyncData(
  () => getCollectionById(route.params.id),
  { watch: () => route.params.id },
)

async function removeDestination(destination) {
  try {
    const response = await removeDestinationFromCollection(
      collection.value.id,
      destination.id,
    )

    collection.value.Destinations = collection.value.Destinations.filter(
      (item) => item.id !== destination.id,
    )

    collection.value.destinationsCount = response.data.destinationsCount
    toast.success('Destino removido da coleção.')
  } catch {
  }
}
</script>

<template>
  <div>
    <p v-if="isLoading" class="text-center text-muted">Carregando...</p>

    <div v-else-if="error" class="text-center">
      <p class="text-danger">{{ error }}</p>

      <router-link
        :to="{ name: 'general-feed' }"
        class="btn btn-outline-primary rounded-pill"
      >
        Voltar ao Feed
      </router-link>
    </div>

    <template v-else-if="collection">
      <div class="mb-4">
        <div class="d-flex align-items-center gap-2 mb-1">
          <h4 class="fw-bold mb-0">{{ collection.title }}</h4>

          <span
            class="badge"
            :class="collection.isPublic ? 'text-bg-success' : 'text-bg-secondary'"
          >
            {{ collection.isPublic ? 'Pública' : 'Privada' }}
          </span>
        </div>

        <p v-if="collection.description" class="text-muted mb-2">
          {{ collection.description }}
        </p>

        <div class="d-flex align-items-center gap-3 small text-muted">
          <router-link
            :to="{
              name: 'public-profile',
              params: { username: collection.User.username },
            }"
            class="d-flex align-items-center text-decoration-none text-muted"
          >
            <img
              :src="getProfilePictureUrl(collection.User.profilePicture)"
              :alt="collection.User.username"
              class="rounded-circle me-2"
              width="24"
              height="24"
              style="object-fit: cover"
            />

            @{{ collection.User.username }}
          </router-link>

          <span>
            {{ collection.destinationsCount }}
            {{ collection.destinationsCount === 1 ? 'destino' : 'destinos' }}
          </span>
        </div>
      </div>

      <div
        v-if="collection.Destinations.length === 0"
        class="alert alert-info text-center"
      >
        Esta coleção ainda não tem destinos.

        <template v-if="collection.isOwner">
          Abra um destino e use <strong>Salvar</strong> para adicioná-lo.
        </template>
      </div>

      <div v-else class="row g-4">
        <div
          v-for="destination in collection.Destinations"
          :key="destination.id"
          class="col-12 col-md-6 col-lg-4"
        >
          <DestinationCard :destination="destination">
            <template v-if="collection.isOwner" #actions>
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary w-100 mt-3"
                @click="removeDestination(destination)"
              >
                <i class="bi bi-x-lg"></i> Remover da coleção
              </button>
            </template>
          </DestinationCard>
        </div>
      </div>
    </template>
  </div>
</template>