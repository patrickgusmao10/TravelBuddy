<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getPublicProfile } from '../../services/userService'
import { getFollowers, getFollowing } from '../../services/followService'
import { getProfilePictureUrl } from '../../utils/media'

const props = defineProps({
  kind: { type: String, required: true }
})

const route = useRoute()

const profile = ref(null)
const people = ref([])
const isLoading = ref(true)
const apiErrorMessage = ref('')

async function loadList() {
  const username = route.params.username
  const kind = props.kind

  isLoading.value = true
  apiErrorMessage.value = ''
  profile.value = null
  people.value = []

  try {
    const profileResponse = await getPublicProfile(username)

    if (route.params.username !== username || props.kind !== kind) return

    profile.value = profileResponse.data

    const listResponse = kind === 'followers'
      ? await getFollowers(profile.value.id)
      : await getFollowing(profile.value.id)

    if (route.params.username !== username || props.kind !== kind) return

    people.value = listResponse.data
  } catch (error) {
    if (route.params.username !== username || props.kind !== kind) return

    apiErrorMessage.value =
      error.status === 404
        ? 'Usuário não encontrado.'
        : error.message || 'Não foi possível carregar a lista.'
  } finally {
    if (route.params.username === username && props.kind === kind) {
      isLoading.value = false
    }
  }
}

watch(
  () => [props.kind, route.params.username],
  loadList,
  { immediate: true }
)
</script>

<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-8 col-xl-6">
        <p v-if="isLoading" class="text-center text-muted">
          Carregando...
        </p>

        <p v-else-if="apiErrorMessage" class="text-danger text-center">
          {{ apiErrorMessage }}
        </p>

        <template v-else-if="profile">
          <router-link
            :to="{ name: 'public-profile', params: { username: profile.username } }"
            class="text-decoration-none small"
          >
            ← Voltar para o perfil de {{ profile.fullName || profile.username }}
          </router-link>

          <ul class="nav nav-pills my-3">
            <li class="nav-item">
              <router-link
                :to="{ name: 'profile-followers', params: { username: profile.username } }"
                class="nav-link"
                :class="{ active: kind === 'followers' }"
              >
                Seguidores ({{ profile.followersCount ?? 0 }})
              </router-link>
            </li>

            <li class="nav-item">
              <router-link
                :to="{ name: 'profile-following', params: { username: profile.username } }"
                class="nav-link"
                :class="{ active: kind === 'following' }"
              >
                Seguindo ({{ profile.followingCount ?? 0 }})
              </router-link>
            </li>
          </ul>

          <p v-if="people.length === 0" class="alert alert-info text-center">
            {{ kind === 'followers'
              ? `${profile.fullName || profile.username} ainda não tem seguidores.`
              : `${profile.fullName || profile.username} ainda não segue ninguém.` }}
          </p>

          <ul v-else class="list-group">
            <li
              v-for="person in people"
              :key="person.id"
              class="list-group-item"
            >
              <router-link
                :to="{ name: 'public-profile', params: { username: person.username } }"
                class="d-flex align-items-center text-decoration-none text-dark"
              >
                <img
                  :src="getProfilePictureUrl(person.profilePicture)"
                  :alt="person.username"
                  class="rounded-circle me-3"
                  width="48"
                  height="48"
                  style="object-fit: cover;"
                />

                <div>
                  <h6 class="mb-0">
                    {{ person.fullName || person.username }}
                  </h6>
                  <small class="text-muted">
                    @{{ person.username }}
                  </small>
                </div>
              </router-link>
            </li>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>