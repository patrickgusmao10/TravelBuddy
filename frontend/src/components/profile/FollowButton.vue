<script setup>
import { useAuthenticatedAction } from '../../composables/useAuthenticatedAction'
import { toggleFollow } from '../../services/followService'
import { runOptimistic } from '../../utils/optimistic'

const props = defineProps({
  userId: { type: Number, required: true },
})

const following = defineModel('following', { type: Boolean, default: false })
const followersCount = defineModel('followersCount', { type: Number, default: 0 })

function performFollow() {
  return runOptimistic({
    apply() {
      const previousFollowing = following.value
      const previousCount = followersCount.value
      const nowFollowing = !previousFollowing

      following.value = nowFollowing
      followersCount.value = previousCount + (nowFollowing ? 1 : -1)

      return () => {
        following.value = previousFollowing
        followersCount.value = previousCount
      }
    },
    request: () => toggleFollow(props.userId),
    confirm(data) {
      following.value = data.isFollowing
      followersCount.value = data.followersCount
    },
  })
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