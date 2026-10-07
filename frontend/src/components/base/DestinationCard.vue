<script setup>
import { getDestinationImageUrl } from '../../utils/media'

defineProps({
  destination: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <RouterLink
    :to="`/destinos/${destination.id}`"
    class="destination-link"
  >
    <div class="destination-card">
      <img
        :src="getDestinationImageUrl(destination.imagePath)"
        :alt="destination.title"
        class="destination-image"
      />

      <div class="p-3">
        <h6 class="text-truncate mb-1">
          {{ destination.title }}
        </h6>

        <div class="d-flex justify-content-between align-items-center">
          <span class="text-muted small">
            @{{ destination.User.username }}
          </span>

          <span class="text-muted small">
            <i class="bi bi-eye"></i>
            {{ destination.views }}
          </span>
        </div>
      </div>
    </div>
  </RouterLink>
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

.destination-link {
  text-decoration: none;
  color: inherit;
  display: block;
}
</style>