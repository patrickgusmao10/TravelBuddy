<script setup>
import { getFeed } from '../services/userService'
import { usePaginatedList } from '../composables/usePaginatedList'
import DestinationCard from '../components/base/DestinationCard.vue'
import BaseButton from '../components/base/BaseButton.vue'

const {
  items: destinations,
  hasMore,
  isLoading,
  isLoadingMore,
  error,
  loadMore,
} = usePaginatedList(getFeed)
</script>

<template>
  <div class="p-4">
    <h1>Feed Geral</h1>

    <div
      v-if="error"
      class="alert alert-danger mt-3"
      role="alert"
    >
      {{ error }}
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
        v-if="!destinations.length && !error"
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