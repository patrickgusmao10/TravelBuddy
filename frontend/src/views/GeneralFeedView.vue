
<script setup>
import { ref, onMounted } from 'vue'
import { getFeed } from '../services/userService'
import DestinationCard from '../components/base/DestinationCard.vue'
import BaseButton from '../components/base/BaseButton.vue'

const destinations = ref([])
const page = ref(1)
const limit = 12
const hasMore = ref(true)

const isLoading = ref(false)
const isLoadingMore = ref(false)
const apiErrorMessage = ref('')

async function loadFeed() {
  isLoading.value = true
  apiErrorMessage.value = ''

  try {
    const response = await getFeed(1, limit)
    const newDestinations = response.data

    destinations.value = newDestinations
    page.value = 1
    hasMore.value = newDestinations.length === limit
  } catch (error) {
    apiErrorMessage.value =
      error.response?.data?.message ||
      'Erro ao carregar os destinos.'
  } finally {
    isLoading.value = false
  }
}

async function loadMore() {
  if (isLoadingMore.value || !hasMore.value) return

  isLoadingMore.value = true
  apiErrorMessage.value = ''

  const nextPage = page.value + 1

  try {
    const response = await getFeed(nextPage, limit)
    const newDestinations = response.data

    destinations.value.push(...newDestinations)

    // Atualiza a página somente após sucesso.
    page.value = nextPage

    hasMore.value = newDestinations.length === limit
  } catch (error) {
    apiErrorMessage.value =
      error.response?.data?.message ||
      'Erro ao carregar mais destinos.'
  } finally {
    isLoadingMore.value = false
  }
}

onMounted(() => {
  loadFeed()
})
</script>

<template>
  <div class="p-4">
    <h1>Feed Geral</h1>

    <div
      v-if="apiErrorMessage"
      class="alert alert-danger mt-3"
      role="alert"
    >
      {{ apiErrorMessage }}
    </div>

    <div v-if="isLoading" class="text-center mt-4">
      Carregando destinos...
    </div>

    <template v-else>
      <div class="row g-4 mt-2">
        <div
          v-for="destination in destinations"
          :key="destination.id"
          class="col-6 col-md-4 col-lg-3"
        >
          <DestinationCard :destination="destination" />
        </div>
      </div>

      <div
        v-if="!destinations.length && !apiErrorMessage"
        class="text-center mt-4"
      >
        Nenhum destino encontrado.
      </div>

      <div v-if="hasMore" class="text-center mt-5">
        <BaseButton
          variant="outline-primary"
          :loading="isLoadingMore"
          loading-text="Carregando..."
          @click="loadMore"
        >
          Carregar mais
        </BaseButton>
      </div>
    </template>
  </div>
</template>