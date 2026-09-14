<script setup>
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

async function handleLogout() {
  await authStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <nav>
    <router-link to="/">Início</router-link>

    <span> | </span>

    <router-link to="/destinos">Destinos</router-link>

    <span> | </span>

    <router-link to="/feed/geral">Feed Geral</router-link>

    <template v-if="!authStore.isAuthenticated">
      <span> | </span>

      <router-link to="/login">Login</router-link>

      <span> | </span>

      <router-link to="/register">Criar Conta</router-link>
    </template>

<template v-else>
  <span> | </span>

  <router-link :to="{ name: 'my-profile' }">
    Meu Perfil
  </router-link>

  <span> | </span>

  <span>
    Olá, {{ authStore.user?.username }}
  </span>

  <span> | </span>

  <button type="button" @click="handleLogout">
    Sair
  </button>
</template>
  </nav>
</template>