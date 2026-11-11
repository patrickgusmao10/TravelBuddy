<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getPublicProfile } from '../../services/userService'
import { getFollowers, getFollowing } from '../../services/followService'
import { useAsyncData } from '../../composables/useAsyncData'
import { getProfilePictureUrl } from '../../utils/media'

const props = defineProps({
  kind: { type: String, required: true }
})

const route = useRoute()

async function fetchList() {
  const profileResponse = await getPublicProfile(route.params.username)
  const loadPeople = props.kind === 'followers' ? getFollowers : getFollowing
  const listResponse = await loadPeople(profileResponse.data.id)

  return {
    data: {
      profile: profileResponse.data,
      people: listResponse.data
    }
  }
}

const {
  data: result,
  isLoading,
  error
} = useAsyncData(fetchList, {
  watch: () => [props.kind, route.params.username]
})

const profile = computed(() => result.value?.profile)
const people = computed(() => result.value?.people ?? [])
</script>

<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-8 col-xl-6">
        <p v-if="isLoading" class="text-center text-muted">
          Carregando...
        </p>

        <p v-else-if="error" class="text-danger text-center">
          {{ error }}
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