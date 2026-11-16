<script setup>
import { reactive, ref } from 'vue'
import { createCollection } from '../../services/collectionService'
import { LIMITS } from '../../config/constants'
import BaseModal from '../base/BaseModal.vue'
import BaseInput from '../base/BaseInput.vue'

const emit = defineEmits(['close', 'created'])

const form = reactive({
  title: '',
  description: '',
  isPublic: false,
})

const errors = reactive({
  title: '',
  description: '',
})

const isSubmitting = ref(false)
const apiErrorMessage = ref('')

function validate() {
  errors.title = ''
  errors.description = ''

  const title = form.title.trim()
  const description = form.description.trim()

  if (title.length < LIMITS.COLLECTION_TITLE_MIN || title.length > LIMITS.COLLECTION_TITLE_MAX) {
    errors.title = `O título deve ter entre ${LIMITS.COLLECTION_TITLE_MIN} e ${LIMITS.COLLECTION_TITLE_MAX} caracteres.`
  }

  if (description.length > LIMITS.COLLECTION_DESCRIPTION_MAX) {
    errors.description = `A descrição deve ter no máximo ${LIMITS.COLLECTION_DESCRIPTION_MAX} caracteres.`
  }

  return errors.title === '' && errors.description === ''
}

async function handleSubmit() {
  apiErrorMessage.value = ''

  if (!validate()) {
    return
  }

  isSubmitting.value = true

  try {
    const response = await createCollection({
      title: form.title.trim(),
      description: form.description.trim(),
      isPublic: form.isPublic,
    })

    emit('created', response.data)
  } catch (error) {
    apiErrorMessage.value = error.message
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <BaseModal title="Nova coleção" :busy="isSubmitting" @close="emit('close')">
    <form id="create-collection-form" novalidate @submit.prevent="handleSubmit">
      <BaseInput
        v-model="form.title"
        label="Título"
        placeholder="Ex.: Lugares que quero visitar"
        :error="errors.title"
        :disabled="isSubmitting"
      />

      <BaseInput
        v-model="form.description"
        type="textarea"
        label="Descrição (opcional)"
        :error="errors.description"
        :disabled="isSubmitting"
      />

      <div class="form-check form-switch">
        <input
          id="collection-is-public"
          v-model="form.isPublic"
          class="form-check-input"
          type="checkbox"
          role="switch"
          :disabled="isSubmitting"
        />
        <label class="form-check-label" for="collection-is-public">
          Pública
          <span class="text-muted small">(qualquer pessoa com o link pode ver)</span>
        </label>
      </div>

      <div v-if="apiErrorMessage" class="alert alert-danger mt-3 mb-0" role="alert">
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
        form="create-collection-form"
        class="btn btn-primary"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Criando...' : 'Criar coleção' }}
      </button>
    </template>
  </BaseModal>
</template>