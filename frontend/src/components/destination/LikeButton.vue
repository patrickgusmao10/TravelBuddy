<script setup>
import { ref } from 'vue'
import { useAuthenticatedAction } from '../../composables/useAuthenticatedAction'
import { toggleLike } from '../../services/likeService'

const props = defineProps({
  destinationId: { type: Number, required: true },
  initialLiked: { type: Boolean, default: false },
  initialCount: { type: Number, default: 0 },
})

const liked = ref(props.initialLiked)
const likesCount = ref(props.initialCount)

async function performLike() {
  const previousLiked = liked.value
  const previousCount = likesCount.value

  liked.value = !previousLiked
  likesCount.value = previousCount + (liked.value ? 1 : -1)

  try {
    const response = await toggleLike(props.destinationId)

    liked.value = response.data.liked
    likesCount.value = response.data.likesCount
  } catch {
    liked.value = previousLiked
    likesCount.value = previousCount
  }
}

const { run: handleClick } = useAuthenticatedAction(performLike)
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
  </div>
</template>