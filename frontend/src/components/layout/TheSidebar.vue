<script setup>
import { useAuth } from '../../composables/useAuth'

const { currentUser } = useAuth()
</script>

<template>
  <aside class="col-md-3 col-lg-2 d-none d-md-block sidebar py-4">
    <nav class="nav flex-column">
      <router-link to="/favoritos" class="nav-link">
        <i class="bi bi-heart me-2"></i> Favoritos
      </router-link>

      <router-link to="/roteiros" class="nav-link">
        <i class="bi bi-map me-2"></i> Meus Roteiros
      </router-link>

      <router-link to="/relatos" class="nav-link">
        <i class="bi bi-journal-text me-2"></i> Relatos
      </router-link>

      <router-link to="/viajantes" class="nav-link">
        <i class="bi bi-people me-2"></i> Viajantes
      </router-link>

      <router-link to="/profile/me" class="nav-link">
        <i class="bi bi-person me-2"></i> Meu Perfil
      </router-link>

      <template v-if="currentUser?.isAdmin">
        <hr />

        <p class="small text-muted px-3 mb-2">
          Administração
        </p>

        <router-link to="/admin" class="nav-link">
          <i class="bi bi-speedometer2 me-2"></i> Dashboard Admin
        </router-link>
      </template>
    </nav>
  </aside>
</template>