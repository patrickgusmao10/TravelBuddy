<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getMyProfile, updateProfile } from '../../services/userService'
import { getProfilePictureUrl } from '../../utils/media'
import BaseInput from '../../components/base/BaseInput.vue'
import BaseButton from '../../components/base/BaseButton.vue'
import FormCard from '../../components/base/FormCard.vue'
import { useAuth } from '../../composables/useAuth'

const { updateUser } = useAuth()

const router = useRouter()

const BIO_MAX = 255

const username = ref('')

const form = reactive({
  fullName: '',
  bio: '',
})

const errors = reactive({
  fullName: '',
  bio: '',
})

const currentPictureFilename = ref('')
const previewUrl = ref('')
const selectedFile = ref(null)

const isLoading = ref(true)
const isSubmitting = ref(false)

const apiErrorMessage = ref('')
const successMessage = ref('')

const bioCharsRemaining = computed(() => BIO_MAX - form.bio.length)

onMounted(async () => {
  try {
    const response = await getMyProfile()
    const user = response.data

    username.value = user.username
    form.fullName = user.fullName || ''
    form.bio = user.bio || ''
    currentPictureFilename.value = user.profilePicture
    previewUrl.value = getProfilePictureUrl(user.profilePicture)
  } catch (error) {
    apiErrorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
})

function handleFileChange(event) {
  const file = event.target.files[0]

  if (!file) {
    return
  }

  selectedFile.value = file

  const reader = new FileReader()

  reader.onload = (e) => {
    previewUrl.value = e.target.result
  }

  reader.readAsDataURL(file)
}

function validate() {
  errors.fullName = ''
  errors.bio = ''

  if (!form.fullName.trim()) {
    errors.fullName = 'O nome completo é obrigatório.'
  }

  if (form.bio.length > BIO_MAX) {
    errors.bio = `A bio deve ter no máximo ${BIO_MAX} caracteres.`
  }

  return Object.values(errors).every((message) => message === '')
}

async function handleSubmit() {
  apiErrorMessage.value = ''
  successMessage.value = ''

  if (!validate()) {
    return
  }

  isSubmitting.value = true

  const formData = new FormData()
  formData.append('fullName', form.fullName.trim())
  formData.append('bio', form.bio.trim())

  if (selectedFile.value) {
    formData.append('profilePicture', selectedFile.value)
  }

  try {
    const response = await updateProfile(formData)

    currentPictureFilename.value = response.data.profilePicture
    updateUser(response.data)
    selectedFile.value = null

    successMessage.value = 'Perfil atualizado com sucesso!'
  } catch (error) {
    apiErrorMessage.value = error.message
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <FormCard title="Editar Perfil">
    <p v-if="isLoading" class="text-center text-muted">Carregando...</p>

    <form v-else @submit.prevent="handleSubmit">
      <div class="text-center mb-4">
        <img
          :src="previewUrl"
          alt="Foto de Perfil"
          class="avatar-preview"
        />

        <div class="mt-3">
          <label for="profilePicture" class="btn btn-outline-primary btn-sm">
            <i class="bi bi-camera me-1"></i> Alterar Foto
          </label>

          <input
            id="profilePicture"
            type="file"
            accept="image/*"
            class="d-none"
            @change="handleFileChange"
          />
        </div>
      </div>

      <BaseInput
        label="Nome de Usuário"
        :model-value="username"
        disabled
      />

      <BaseInput
        label="Nome Completo"
        v-model="form.fullName"
        :error="errors.fullName"
      />

      <BaseInput
        label="Bio"
        type="textarea"
        v-model="form.bio"
        :error="errors.bio"
      >
        <template #hint>
          <div
            class="form-text text-end"
            :class="{ 'text-danger': bioCharsRemaining < 0 }"
          >
            {{ form.bio.length }}/{{ BIO_MAX }}
          </div>
        </template>
      </BaseInput>

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
          loading-text="Salvando..."
        >
          Salvar Alterações
        </BaseButton>

        <router-link to="/feed/geral" class="btn btn-outline-secondary btn-lg">
          Cancelar
        </router-link>
      </div>
    </form>
  </FormCard>
</template>