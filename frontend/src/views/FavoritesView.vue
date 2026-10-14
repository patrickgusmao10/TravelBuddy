
<script setup>
import { ref, onMounted } from 'vue'
import { getLikedDestinations } from '../services/likeService'
import DestinationCard from '../components/base/DestinationCard.vue'

const destinations = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

async function loadFavorites() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await getLikedDestinations()
    destinations.value = response.data
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message ||
      'Não foi possível carregar os destinos favoritos.'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadFavorites)
</script>

<template>
  <div class="p-4">
    <h1 class="mb-4">Favoritos</h1>

    <p v-if="isLoading" class="text-muted">
      Carregando destinos favoritos...
    </p>

    <div
      v-else-if="errorMessage"
      class="alert alert-danger"
      role="alert"
    >
      {{ errorMessage }}
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