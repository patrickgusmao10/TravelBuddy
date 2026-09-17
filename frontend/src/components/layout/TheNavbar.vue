<script setup>
import { useAuth } from '../../composables/useAuth'
import { getProfilePictureUrl } from '../../utils/media'

const { isAuthenticated, currentUser, logout } = useAuth()
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
    <div class="container-fluid px-lg-5">
      <router-link class="navbar-brand" to="/">
        <i class="bi bi-play-fill"></i> TRAVELBUDDY
      </router-link>

      <div class="d-flex align-items-center gap-2">
        <template v-if="!isAuthenticated">
          <router-link to="/login" class="btn btn-outline-primary px-4">
            Entrar
          </router-link>

          <router-link to="/register" class="btn btn-primary text-white px-4">
            Criar Conta
          </router-link>
        </template>

        <template v-else>
          <router-link to="/feed/geral" class="nav-link">
            Feed
          </router-link>

          <router-link
            :to="{ name: 'my-profile' }"
            class="nav-link d-flex align-items-center gap-2"
          >
            <img
              :src="getProfilePictureUrl(currentUser?.profilePicture)"
              alt=""
              width="32"
              height="32"
              class="rounded-circle"
              style="object-fit: cover;"
            />

            {{ currentUser?.username }}
          </router-link>

          <button class="btn btn-outline-dark btn-sm" @click="logout">
            <i class="bi bi-box-arrow-right"></i> Sair
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>