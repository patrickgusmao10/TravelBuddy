
<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'
import { toggleLike } from '../../services/likeService'

const props = defineProps({
  destinationId: { type: Number, required: true },
  initialLiked: { type: Boolean, default: false },
  initialCount: { type: Number, default: 0 },
})

const route = useRoute()
const router = useRouter()
const { isAuthenticated } = useAuth()

const liked = ref(props.initialLiked)
const likesCount = ref(props.initialCount)
const isBusy = ref(false)
const errorMessage = ref('')

async function handleClick() {
  if (!isAuthenticated.value) {
    router.push({ name: 'login', query: { redirect: route.fullPath } })
    return
  }

  if (isBusy.value) {
    return
  }

  isBusy.value = true
  errorMessage.value = ''

  const previousLiked = liked.value
  const previousCount = likesCount.value

  liked.value = !previousLiked
  likesCount.value = previousCount + (liked.value ? 1 : -1)

  try {
    const response = await toggleLike(props.destinationId)

    liked.value = response.data.liked
    likesCount.value = response.data.likesCount
  } catch (error) {
    liked.value = previousLiked
    likesCount.value = previousCount
    errorMessage.value = error.message
  } finally {
    isBusy.value = false
  }
}
</script>

<template>
  <div class="d-inline-block">
    <button
      type="button"
      class="btn rounded-pill"
      :class="liked ? 'btn-danger' : 'btn-outline-danger'"
      :aria-pressed="liked"
      @click="handleClick"
    >
      <i class="bi" :class="liked ? 'bi-heart-fill' : 'bi-heart'"></i>
      {{ likesCount }}
      <span class="visually-hidden">{{ liked ? 'Descurtir' : 'Curtir' }}</span>
    </button>

    <div v-if="errorMessage" class="text-danger small mt-1">
      {{ errorMessage }}
    </div>
  </div>
</template>