<script setup>
import { useToast } from '../../composables/useToast'

const { toasts, remove } = useToast()

const ICONS = {
  success: 'bi-check-circle-fill',
  info: 'bi-info-circle-fill',
  error: 'bi-exclamation-triangle-fill',
}

const COLORS = {
  success: 'text-bg-success',
  info: 'text-bg-primary',
  error: 'text-bg-danger',
}
</script>

<template>
  <div class="toast-container position-fixed top-0 end-0 p-3" aria-live="polite">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="toast show align-items-center border-0 mb-2"
      :class="COLORS[toast.type]"
      role="alert"
    >
      <div class="d-flex">
        <div class="toast-body">
          <i class="bi me-2" :class="ICONS[toast.type]"></i>{{ toast.message }}
        </div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          aria-label="Fechar"
          @click="remove(toast.id)"
        ></button>
      </div>
    </div>
  </div>
</template>