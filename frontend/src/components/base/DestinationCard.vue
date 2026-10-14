
<script setup>
import { computed } from 'vue'
import { getDestinationImageUrl, getProfilePictureUrl } from '../../utils/media'

const props = defineProps({
  destination: {
    type: Object,
    required: true,
  },
  author: {
    type: Object,
    default: null,
  },
})

const displayAuthor = computed(() => props.author ?? props.destination.User)
</script>

<template>
  <div class="destination-card">
    <RouterLink
      :to="{ name: 'destination-detail', params: { id: destination.id } }"
      class="d-block"
    >
      <img
        :src="getDestinationImageUrl(destination.imagePath)"
        :alt="destination.title"
        class="destination-image"
      />
    </RouterLink>

    <div class="p-3">
      <h6 class="text-truncate mb-1">
        <RouterLink
          :to="{ name: 'destination-detail', params: { id: destination.id } }"
          class="text-decoration-none text-dark"
        >
          {{ destination.title }}
        </RouterLink>
      </h6>

      <div class="d-flex justify-content-between align-items-center gap-2">
        <RouterLink
          v-if="displayAuthor"
          :to="{ name: 'public-profile', params: { username: displayAuthor.username } }"
          class="d-flex align-items-center text-decoration-none overflow-hidden"
        >
          <img
            :src="getProfilePictureUrl(displayAuthor.profilePicture)"
            :alt="displayAuthor.username"
            class="rounded-circle me-2"
            width="24"
            height="24"
            style="object-fit: cover;"
          />

          <span class="text-muted small text-truncate">
            @{{ displayAuthor.username }}
          </span>
        </RouterLink>

        <span class="text-muted small text-nowrap ms-auto">
          <i class="bi bi-eye"></i>
          {{ destination.views }}
        </span>
      </div>

      <div class="d-flex align-items-center gap-3 mt-2">
        <span class="text-muted small">
          <i class="bi bi-heart"></i>
          {{ destination.likesCount ?? 0 }}
        </span>

        <span class="text-muted small">
          <i class="bi bi-chat"></i>
          {{ destination.commentsCount ?? 0 }}
        </span>
      </div>

      <slot name="actions" />
    </div>
  </div>
</template>

<style scoped>
.destination-card {
  border: none;
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s;
  background: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.destination-card:hover {
  transform: translateY(-5px);
}

.destination-image {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
}
</style>