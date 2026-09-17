<script setup>
defineProps({
  type: { type: String, default: 'button' },
  variant: { type: String, default: 'primary' },
  loading: { type: Boolean, default: false },
  loadingText: { type: String, default: 'Enviando...' },
  disabled: { type: Boolean, default: false },
})
</script>

<template>
  <button
    :type="type"
    class="btn btn-lg"
    :class="`btn-${variant}`"
    :disabled="disabled || loading"
  >
    {{ loading ? loadingText : '' }}
    <slot v-if="!loading" />
  </button>
</template>