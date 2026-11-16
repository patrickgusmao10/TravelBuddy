<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { search } from '../services/searchService'
import { useAsyncData } from '../composables/useAsyncData'
import { useDebouncedValue } from '../composables/useDebouncedValue'
import { SEARCH } from '../config/constants'
import { getProfilePictureUrl } from '../utils/media'
import DestinationCard from '../components/base/DestinationCard.vue'

const route = useRoute()
const router = useRouter()

const searchInputRef = ref(null)

onMounted(() => searchInputRef.value?.focus())

const typedText = ref(typeof route.query.q === 'string' ? route.query.q : '')
const term = useDebouncedValue(typedText, SEARCH.DEBOUNCE_MS)

const normalizedTerm = computed(() => term.value.trim())
const isTooShort = computed(() => normalizedTerm.value.length < SEARCH.MIN_LENGTH)

const EMPTY_RESULT = { data: { query: '', destinations: [], users: [] } }

const { data: results, isLoading, error } = useAsyncData(
  () => (isTooShort.value ? Promise.resolve(EMPTY_RESULT) : search(normalizedTerm.value)),
  { watch: normalizedTerm, initialData: EMPTY_RESULT.data },
)

watch(() => route.query.q, (value) => {
  const fromUrl = typeof value === 'string' ? value : ''

  if (fromUrl !== normalizedTerm.value) {
    typedText.value = fromUrl
  }
})

watch(normalizedTerm, (value) => {
  router.replace({ name: 'search', query: value ? { q: value } : {} })
})

const hasResults = computed(
  () => results.value.destinations.length > 0 || results.value.users.length > 0,
)
</script>

<template>
  <div>
    <h4 class="fw-bold mb-3">Explorar</h4>

    <div class="input-group input-group-lg mb-4">
      <span class="input-group-text bg-white">
        <i class="bi bi-search"></i>
      </span>

      <input
        ref="searchInputRef"
        v-model="typedText"
        type="search"
        class="form-control"
        placeholder="Buscar destinos e pessoas"
        aria-label="Buscar destinos e pessoas"
      />
    </div>

    <p v-if="isTooShort" class="text-muted text-center">
      Digite pelo menos {{ SEARCH.MIN_LENGTH }} letras para buscar.
    </p>

    <p v-else-if="isLoading" class="text-center text-muted">
      Buscando...
    </p>

    <p v-else-if="error" class="text-danger text-center">
      {{ error }}
    </p>

    <template v-else>
      <div v-if="!hasResults" class="alert alert-info text-center">
        Nada encontrado para <strong>{{ results.query }}</strong>.
      </div>

      <section v-if="results.users.length > 0" class="mb-5">
        <h5 class="fw-bold mb-3">Pessoas</h5>

        <div class="list-group">
          <RouterLink
            v-for="user in results.users"
            :key="user.id"
            :to="{ name: 'public-profile', params: { username: user.username } }"
            class="list-group-item list-group-item-action d-flex align-items-center"
          >
            <img
              :src="getProfilePictureUrl(user.profilePicture)"
              :alt="user.username"
              class="rounded-circle me-3"
              width="48"
              height="48"
              style="object-fit: cover;"
            />

            <div>
              <div class="fw-semibold">
                {{ user.fullName || user.username }}
              </div>
              <small class="text-muted">@{{ user.username }}</small>
            </div>
          </RouterLink>
        </div>
      </section>

      <section v-if="results.destinations.length > 0" class="mb-5">
        <h5 class="fw-bold mb-3">Destinos</h5>

        <div class="row">
          <div
            v-for="destination in results.destinations"
            :key="destination.id"
            class="col-12 col-md-6 col-xl-4"
          >
            <DestinationCard :destination="destination" />
          </div>
        </div>
      </section>
    </template>
  </div>
</template>