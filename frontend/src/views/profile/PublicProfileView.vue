<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getPublicProfile } from '../../services/userService'
import { useAsyncData } from '../../composables/useAsyncData'
import { getProfilePictureUrl } from '../../utils/media'
import DestinationCard from '../../components/base/DestinationCard.vue'
import FollowButton from '../../components/profile/FollowButton.vue'

const route = useRoute()

const {
  data: profile,
  isLoading,
  error: loadError,
} = useAsyncData(
  () => getPublicProfile(route.params.username),
  { watch: () => route.params.username }
)

const error = computed(() => {
  if (!loadError.value) return ''

  return loadError.value.includes('404')
    ? 'Usuário não encontrado.'
    : loadError.value
})
</script>

<template>
  <div class="container mt-4">
    <p v-if="isLoading" class="text-center text-muted">
      Carregando...
    </p>

    <p v-else-if="error" class="text-danger text-center">
      {{ error }}
    </p>

    <div v-else-if="profile" class="row justify-content-center">
      <div class="col-md-10 col-xl-8">
        <div class="profile-card text-center p-4 mb-4">
          <img
            :src="getProfilePictureUrl(profile.profilePicture)"
            :alt="profile.username"
            class="profile-avatar mb-3"
          />

          <h2 class="h4 fw-bold mb-1">
            {{ profile.fullName || profile.username }}
          </h2>

          <p class="text-muted">
            @{{ profile.username }}
          </p>

          <p v-if="profile.bio" class="mb-3 profile-bio">
            {{ profile.bio }}
          </p>

          <p v-else class="text-muted mb-3">
            Nenhuma biografia ainda.
          </p>

          <div class="d-flex justify-content-center gap-4 mb-4">
            <div>
              <h5 class="mb-0 fw-bold">
                {{ profile.destinationsCount ?? 0 }}
              </h5>
              <small class="text-muted">Destinos</small>
            </div>

            <router-link
              :to="{ name: 'profile-followers', params: { username: profile.username } }"
              class="text-decoration-none text-reset"
            >
              <h5 class="mb-0 fw-bold">
                {{ profile.followersCount ?? 0 }}
              </h5>
              <small class="text-muted">Seguidores</small>
            </router-link>

            <router-link
              :to="{ name: 'profile-following', params: { username: profile.username } }"
              class="text-decoration-none text-reset"
            >
              <h5 class="mb-0 fw-bold">
                {{ profile.followingCount ?? 0 }}
              </h5>
              <small class="text-muted">Seguindo</small>
            </router-link>
          </div>

          <router-link
            v-if="profile.isOwner"
            :to="{ name: 'my-profile' }"
            class="btn btn-primary rounded-pill px-4"
          >
            Editar Perfil
          </router-link>

          <FollowButton
            v-else
            :user-id="profile.id"
            v-model:following="profile.isFollowing"
            v-model:followers-count="profile.followersCount"
          />
        </div>

        <h4 class="fw-bold mb-3">
          Destinos de {{ profile.fullName || profile.username }}
        </h4>

        <div
          v-if="!profile.Destinations?.length"
          class="alert alert-info text-center"
        >
          {{ profile.fullName || profile.username }} ainda não publicou nenhum destino.
        </div>

        <div v-else class="row g-4">
          <div
            v-for="destination in profile.Destinations"
            :key="destination.id"
            class="col-6 col-md-4"
          >
            <DestinationCard
              :destination="destination"
              :author="profile"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-bio {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
</style>