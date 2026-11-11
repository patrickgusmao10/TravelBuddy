<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getDestinationById } from '../services/userService'
import { useAsyncData } from '../composables/useAsyncData'
import { getDestinationImageUrl, getProfilePictureUrl } from '../utils/media'
import LikeButton from '../components/destination/LikeButton.vue'
import CommentSection from '../components/destination/CommentSection.vue'

const route = useRoute()

const { data: destination, isLoading, error } = useAsyncData(
  () => getDestinationById(route.params.id),
  { watch: () => route.params.id }
)

const isOwner = computed(() => destination.value?.isOwner ?? false)
</script>

<template>
  <div class="p-4">
    <p v-if="isLoading" class="text-center text-muted">
      Carregando...
    </p>

    <div
      v-else-if="error"
      class="alert alert-danger"
      role="alert"
    >
      {{ error }}
    </div>

    <div v-else-if="destination" class="destination-detail">
      <div class="destination-card">
        <img
          :src="getDestinationImageUrl(destination.imagePath)"
          :alt="destination.title"
          class="destination-image"
        />

        <div class="destination-content">
          <h1>
            {{ destination.title }}
          </h1>

          <div class="d-flex align-items-center mb-3">
            <router-link
              :to="{
                name: 'public-profile',
                params: { username: destination.User.username }
              }"
              class="d-flex align-items-center text-decoration-none text-dark"
            >
              <img
                :src="getProfilePictureUrl(destination.User.profilePicture)"
                :alt="destination.User.username"
                class="rounded-circle me-2"
                width="40"
                height="40"
                style="object-fit: cover;"
              />

              <div>
                <h6 class="mb-0">
                  {{ destination.User.fullName || destination.User.username }}
                </h6>
                <small class="text-muted">
                  @{{ destination.User.username }}
                </small>
              </div>
            </router-link>
          </div>

          <div v-if="isOwner" class="mb-3">
            <router-link
              :to="{
                name: 'destination-edit',
                params: { id: destination.id }
              }"
              class="btn btn-outline-secondary rounded-pill"
            >
              <i class="bi bi-pencil"></i> Editar Destino
            </router-link>
          </div>

          <p>
            <i class="bi bi-eye"></i>
            {{ destination.views }} visualizações
          </p>

          <p>
            {{ destination.description }}
          </p>

          <LikeButton
            :key="destination.id"
            :destination-id="Number(destination.id)"
            :initial-liked="destination.isLiked"
            :initial-count="destination.likesCount"
          />

          <CommentSection
            :key="destination.id"
            :destination-id="Number(destination.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.destination-detail {
  max-width: 850px;
  width: 100%;
  margin: 0 auto;
}

.destination-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.destination-image {
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}

.destination-content {
  padding: 24px;
}

.destination-content h1 {
  font-size: 2rem;
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .destination-image {
    height: 280px;
  }

  .destination-content {
    padding: 16px;
  }
}
</style>