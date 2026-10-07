<script setup>
import { ref, onMounted } from 'vue'
import { getFeed } from '../services/userService'
import DestinationCard from '../components/base/DestinationCard.vue'

const destinations = ref([])
const page = ref(1)
const limit = 12
const hasMore = ref(true)

async function loadFeed() {
  const response = await getFeed(page.value, limit)
  const newDestinations = response.data

  destinations.value.push(...newDestinations)

  if (newDestinations.length < limit) {
    hasMore.value = false
  }
}

async function loadMore() {
  page.value++
  await loadFeed()
}

onMounted(() => {
  loadFeed()
})
</script>

<template>
  <div class="p-4">
    <h1>Feed Geral</h1>

    <div class="row g-4 mt-2">
      <div
        v-for="destination in destinations"
        :key="destination.id"
        class="col-6 col-md-4 col-lg-3"
      >
        <DestinationCard :destination="destination" />
      </div>
    </div>

    <div v-if="hasMore" class="text-center mt-5">
      <button
        class="btn btn-outline-primary px-5 rounded-pill fw-bold"
        @click="loadMore"
      >
        Carregar mais
      </button>
    </div>
  </div>
</template>