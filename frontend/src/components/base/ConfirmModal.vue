<script setup>
import BaseModal from './BaseModal.vue'

defineProps({
  title: { type: String, required: true },
  message: { type: String, required: true },
  confirmLabel: { type: String, default: 'Confirmar' },
  confirmVariant: { type: String, default: 'danger' },
  busy: { type: Boolean, default: false },
})

const emit = defineEmits(['confirm', 'close'])
</script>

<template>
  <BaseModal :title="title" :busy="busy" @close="emit('close')">
    <p class="mb-0">{{ message }}</p>

    <template #footer>
      <button
        type="button"
        class="btn btn-secondary"
        :disabled="busy"
        @click="emit('close')"
      >
        Cancelar
      </button>

      <button
        type="button"
        class="btn"
        :class="`btn-${confirmVariant}`"
        :disabled="busy"
        @click="emit('confirm')"
      >
        {{ busy ? 'Aguarde...' : confirmLabel }}
      </button>
    </template>
  </BaseModal>
</template>