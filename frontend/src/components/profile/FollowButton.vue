<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../../composables/useAuth'
import { toggleFollow } from '../../services/followService'

const props = defineProps({
  userId: { type: Number, required: true },
})

const following = defineModel('following', { type: Boolean, default: false })
const followersCount = defineModel('followersCount', { type: Number, default: 0 })

const route = useRoute()
const router = useRouter()
const { isAuthenticated } = useAuth()

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

  const previousFollowing = following.value
  const previousCount = followersCount.value
  const nowFollowing = !previousFollowing

  following.value = nowFollowing
  followersCount.value = Math.max(0, previousCount + (nowFollowing ? 1 : -1))

  try {
    const response = await toggleFollow(props.userId)
    
    following.value = response.data.isFollowing
    followersCount.value = response.data.followersCount

  } catch (error) {
    following.value = previousFollowing
    followersCount.value = previousCount
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
      class="btn rounded-pill px-4"
      :class="following ? 'btn-outline-secondary' : 'btn-primary'"
      :aria-pressed="following"
      :disabled="isBusy"
      @click="handleClick"
    >
      {{ following ? 'Seguindo' : 'Seguir' }}
    </button>
    <div v-if="errorMessage" class="text-danger small mt-1">
      {{ errorMessage }}
    </div>
  </div>
</template>