
<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getDestinationById } from '../services/userService'
import { getDestinationImageUrl } from '../utils/media'

const route = useRoute()

const destination = ref(null)
const isOwner = ref(false)
const errorMessage = ref('')
const isLoading = ref(true)

async function loadDestination(id) {
  isLoading.value = true
  destination.value = null
  isOwner.value = false
  errorMessage.value = ''

  try {
    const response = await getDestinationById(id)

    // Ignora respostas de uma navegação anterior.
    if (String(route.params.id) !== String(id)) return

    destination.value = response.data
    isOwner.value = response.data.isOwner
  } catch (error) {
    if (String(route.params.id) !== String(id)) return

    errorMessage.value =
      error.response?.data?.message ||
      'Destino não encontrado.'
  } finally {
    // Apenas a requisição do destino atual encerra o carregamento.
    if (String(route.params.id) === String(id)) {
      isLoading.value = false
    }
  }
}

onMounted(() => {
  loadDestination(route.params.id)
})

watch(() => route.params.id, (newId) => {
  loadDestination(newId)
})
</script>

<template>
  <div class="p-4">
    <p v-if="isLoading" class="text-center text-muted">
      Carregando...
    </p>

    <div
      v-else-if="errorMessage"
      class="alert alert-danger"
      role="alert"
    >
      {{ errorMessage }}
    </div>

    <div v-else-if="destination" class="destination-detail">
      <div class="destination-card">
        <img
          :src="getDestinationImageUrl(destination.imagePath)"
          :alt="destination.title"
          class="destination-image"
        />

        <div class="destination-content">
          <h1>
            {{ destination.title }}
          </h1>

          <p class="text-muted">
            @{{ destination.User.username }}
          </p>

          <p>
            <i class="bi bi-eye"></i>
            {{ destination.views }} visualizações
          </p>

          <p>
            {{ destination.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.destination-detail {
  max-width: 750px;
  margin: 0 auto;
}

.destination-content h1 {
  font-size: 2rem;
  margin-bottom: 8px;
}

.destination-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.destination-image {
  width: 100%;
  max-height: 500px;
  object-fit: contain;
  display: block;
}

.destination-content {
  padding: 24px;
}
</style>