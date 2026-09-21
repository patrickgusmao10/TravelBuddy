<script setup>
import { reactive, ref, computed } from 'vue'
import { uploadDestination } from '../services/destinationService'
import BaseInput from '../components/base/BaseInput.vue'
import BaseButton from '../components/base/BaseButton.vue'
import FormCard from '../components/base/FormCard.vue'

const TITLE_MAX = 100
const DESCRIPTION_MAX = 500

const form = reactive({
  title: '',
  description: '',
})

const errors = reactive({
  title: '',
  description: '',
})

const imageInputRef = ref(null)
const selectedImage = ref(null)
const imagePreviewUrl = ref('')
const isSubmitting = ref(false)
const uploadProgress = ref(0)
const apiErrorMessage = ref('')
const successMessage = ref('')

const descriptionCharsRemaining = computed(
  () => DESCRIPTION_MAX - form.description.length
)

function handleImageChange(event) {
  const file = event.target.files[0]

  if (!file) {
    selectedImage.value = null
    imagePreviewUrl.value = ''
    return
  }

  selectedImage.value = file

  const reader = new FileReader()

  reader.onload = (e) => {
    imagePreviewUrl.value = e.target.result
  }

  reader.readAsDataURL(file)
}

function validate() {
  errors.title = ''
  errors.description = ''
  apiErrorMessage.value = ''

  if (!form.title.trim()) {
    errors.title = 'O título é obrigatório.'
  } else if (form.title.length > TITLE_MAX) {
    errors.title = `O título deve ter no máximo ${TITLE_MAX} caracteres.`
  }

  if (form.description.length > DESCRIPTION_MAX) {
    errors.description = `A descrição deve ter no máximo ${DESCRIPTION_MAX} caracteres.`
  }

  if (!selectedImage.value) {
    apiErrorMessage.value = 'Selecione uma imagem do destino.'
  }

  return (
    errors.title === '' &&
    errors.description === '' &&
    apiErrorMessage.value === ''
  )
}

function resetForm() {
  form.title = ''
  form.description = ''
  selectedImage.value = null
  imagePreviewUrl.value = ''
  uploadProgress.value = 0

  if (imageInputRef.value) {
    imageInputRef.value.value = ''
  }
}

async function handleSubmit() {
  successMessage.value = ''

  if (!validate()) {
    return
  }

  isSubmitting.value = true
  uploadProgress.value = 0

  const formData = new FormData()

  formData.append('title', form.title.trim())
  formData.append('description', form.description.trim())
  formData.append('image', selectedImage.value)

  try {
    await uploadDestination(formData, (progressEvent) => {
      uploadProgress.value = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      )
    })

    successMessage.value = 'Destino enviado com sucesso!'
    resetForm()
  } catch (error) {
    apiErrorMessage.value = error.message
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <FormCard title="Enviar Novo Destino">
    <form @submit.prevent="handleSubmit">

      <BaseInput
        label="Título do Destino"
        v-model="form.title"
        placeholder="Digite um título para o destino"
        :error="errors.title"
        :disabled="isSubmitting"
      />

      <BaseInput
        label="Descrição"
        type="textarea"
        v-model="form.description"
        placeholder="Conte mais sobre o destino (opcional)"
        :error="errors.description"
        :disabled="isSubmitting"
      >
        <template #hint>
          <div
            class="form-text text-end"
            :class="{ 'text-danger': descriptionCharsRemaining < 0 }"
          >
            {{ form.description.length }}/{{ DESCRIPTION_MAX }}
          </div>
        </template>
      </BaseInput>

      <div class="mb-3">
        <label for="destinationImage" class="form-label">
          Imagem do Destino
        </label>

        <input
          id="destinationImage"
          ref="imageInputRef"
          type="file"
          class="form-control"
          accept="image/*"
          :disabled="isSubmitting"
          @change="handleImageChange"
        />

        <div class="form-text">
          Selecione uma imagem que represente o destino.
        </div>

        <img
          v-if="imagePreviewUrl"
          :src="imagePreviewUrl"
          alt="Prévia do destino"
          class="thumbnail-preview mt-2"
        />
      </div>

      <div
        v-if="isSubmitting"
        class="progress mb-3"
        style="height: 10px;"
      >
        <div
          class="progress-bar"
          role="progressbar"
          :style="{ width: uploadProgress + '%' }"
          :aria-valuenow="uploadProgress"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>

      <p v-if="apiErrorMessage" class="text-danger small">
        {{ apiErrorMessage }}
      </p>

      <p v-if="successMessage" class="text-success small">
        {{ successMessage }}
      </p>

      <div class="d-grid gap-2">
        <BaseButton
          type="submit"
          :loading="isSubmitting"
          loading-text="Enviando..."
        >
          Enviar Destino
        </BaseButton>

        <router-link
          to="/destinos"
          class="btn btn-outline-secondary btn-lg"
        >
          Cancelar
        </router-link>
      </div>

    </form>
  </FormCard>
</template>