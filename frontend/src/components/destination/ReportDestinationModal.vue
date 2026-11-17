<script setup>
import { ref } from 'vue'
import { reportDestination } from '../../services/reportService'
import { REPORT_REASONS } from '../../config/constants'
import BaseModal from '../base/BaseModal.vue'

const props = defineProps({
  destinationId: { type: Number, required: true }
})

const emit = defineEmits(['close', 'reported'])

const reason = ref('')
const reasonError = ref('')
const isSubmitting = ref(false)
const apiErrorMessage = ref('')

async function handleSubmit() {
  apiErrorMessage.value = ''
  reasonError.value = ''

  if (!reason.value) {
    reasonError.value = 'Escolha um motivo para continuar.'
    return
  }

  isSubmitting.value = true

  try {
    await reportDestination(props.destinationId, reason.value)
    emit('reported')
  } catch (error) {
    apiErrorMessage.value = error.message
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <BaseModal
    title="Denunciar destino"
    :busy="isSubmitting"
    @close="emit('close')"
  >
    <form
      id="report-destination-form"
      novalidate
      @submit.prevent="handleSubmit"
    >
      <fieldset :disabled="isSubmitting">
        <legend class="fs-6 fw-semibold">
          Por que você está denunciando este destino?
        </legend>

        <div
          v-for="option in REPORT_REASONS"
          :key="option.value"
          class="form-check"
        >
          <input
            :id="`report-reason-${option.value}`"
            v-model="reason"
            class="form-check-input"
            type="radio"
            name="report-reason"
            :value="option.value"
          />

          <label
            class="form-check-label"
            :for="`report-reason-${option.value}`"
          >
            {{ option.label }}
          </label>
        </div>
      </fieldset>

      <span
        v-if="reasonError"
        class="text-danger small d-block mt-2"
      >
        {{ reasonError }}
      </span>

      <div
        v-if="apiErrorMessage"
        class="alert alert-danger mt-3 mb-0"
        role="alert"
      >
        {{ apiErrorMessage }}
      </div>
    </form>

    <template #footer>
      <button
        type="button"
        class="btn btn-secondary"
        :disabled="isSubmitting"
        @click="emit('close')"
      >
        Cancelar
      </button>

      <button
        type="submit"
        form="report-destination-form"
        class="btn btn-danger"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Enviando...' : 'Enviar denúncia' }}
      </button>
    </template>
  </BaseModal>
</template>