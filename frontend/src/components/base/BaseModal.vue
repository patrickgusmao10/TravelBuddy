
<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  busy: { type: Boolean, default: false },
})

const emit = defineEmits(['close'])

const dialogRef = ref(null)

function requestClose() {
  if (!props.busy) {
    emit('close')
  }
}

onMounted(() => dialogRef.value?.focus())
</script>

<template>
  <div>
    <div
      ref="dialogRef"
      class="modal fade show d-block"
      tabindex="-1"
      role="dialog"
      aria-modal="true"
      :aria-label="title"
      @click.self="requestClose"
      @keydown.esc="requestClose"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>

            <button
              type="button"
              class="btn-close"
              aria-label="Fechar"
              @click="requestClose"
            ></button>
          </div>

          <div class="modal-body">
            <slot />
          </div>

          <div v-if="$slots.footer" class="modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>

    <div class="modal-backdrop fade show"></div>
  </div>
</template>