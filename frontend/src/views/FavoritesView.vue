<script setup>
import { getLikedDestinations } from '../services/likeService'
import { useAsyncData } from '../composables/useAsyncData'
import DestinationCard from '../components/base/DestinationCard.vue'

const {
  data: destinations,
  isLoading,
  error,
} = useAsyncData(getLikedDestinations, { initialData: [] })
</script>

<template>
  <div class="p-4">
    <h1 class="mb-4">Favoritos</h1>

    <p v-if="isLoading" class="text-muted">
      Carregando destinos favoritos...
    </p>

    <div
      v-else-if="error"
      class="alert alert-danger"
      role="alert"
    >
      {{ error }}
    </div>

    <p v-else-if="destinations.length === 0" class="text-muted">
      Você ainda não curtiu nenhum destino.
    </p>

    <div v-else class="row g-4">
      <div
        v-for="destination in destinations"
        :key="destination.id"
        class="col-12 col-md-6 col-lg-4"
      >
        <DestinationCard :destination="destination" />
      </div>
    </div>
  </div>
</template>