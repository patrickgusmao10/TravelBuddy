<script setup>
import { useAuthenticatedAction } from '../../composables/useAuthenticatedAction'
import { toggleFollow } from '../../services/followService'

const props = defineProps({
  userId: { type: Number, required: true },
})

const following = defineModel('following', { type: Boolean, default: false })
const followersCount = defineModel('followersCount', { type: Number, default: 0 })

async function performFollow() {
  const previousFollowing = following.value
  const previousCount = followersCount.value
  const nowFollowing = !previousFollowing

  following.value = nowFollowing
  followersCount.value = previousCount + (nowFollowing ? 1 : -1)

  try {
    const response = await toggleFollow(props.userId)

    following.value = response.data.isFollowing
    followersCount.value = response.data.followersCount
  } catch {
    following.value = previousFollowing
    followersCount.value = previousCount
  }
}

const { run: handleClick, isBusy } = useAuthenticatedAction(performFollow)
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
  </div>
</template>