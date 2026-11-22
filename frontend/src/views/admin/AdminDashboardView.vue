<script setup>
import { getAdminDashboard } from '../../services/adminService'
import { useAsyncData } from '../../composables/useAsyncData'

const { data: stats, isLoading, error, execute: reload } = useAsyncData(getAdminDashboard)

const cards = [
  { key: 'users', label: 'Usuários', icon: 'bi-people' },
  { key: 'blockedUsers', label: 'Usuários bloqueados', icon: 'bi-slash-circle' },
  { key: 'destinations', label: 'Destinos', icon: 'bi-geo-alt' },
  { key: 'comments', label: 'Comentários', icon: 'bi-chat-left-text' },
  { key: 'likes', label: 'Curtidas', icon: 'bi-heart' },
  { key: 'reviewedReports', label: 'Denúncias revisadas', icon: 'bi-check2-circle' },
]
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="fw-bold mb-0">Visão geral</h5>

      <button
        type="button"
        class="btn btn-outline-secondary btn-sm rounded-pill"
        :disabled="isLoading"
        @click="reload"
      >
        <i class="bi bi-arrow-clockwise"></i> Atualizar
      </button>
    </div>

    <p v-if="isLoading" class="text-center text-muted">Carregando...</p>

    <p v-else-if="error" class="text-danger text-center">{{ error }}</p>

    <div v-else class="row g-3">
      <div class="col-12 col-md-6 col-lg-4">
        <router-link :to="{ name: 'admin-reports' }" class="text-decoration-none">
          <div class="card h-100 border-danger" data-testid="stat-pendingReports">
            <div class="card-body">
              <div class="text-muted small">
                <i class="bi bi-flag me-1"></i> Denúncias pendentes
              </div>

              <div class="display-6 fw-bold text-danger">
                {{ stats.pendingReports }}
              </div>

              <div class="small text-muted">Clique para revisar</div>
            </div>
          </div>
        </router-link>
      </div>

      <div
        v-for="card in cards"
        :key="card.key"
        class="col-12 col-md-6 col-lg-4"
      >
        <div class="card h-100" :data-testid="`stat-${card.key}`">
          <div class="card-body">
            <div class="text-muted small">
              <i class="bi me-1" :class="card.icon"></i> {{ card.label }}
            </div>

            <div class="display-6 fw-bold">
              {{ stats[card.key] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>