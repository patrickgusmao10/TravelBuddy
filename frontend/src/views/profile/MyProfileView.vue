<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getMyProfile, updateProfile } from '../../services/userService'
import { getProfilePictureUrl } from '../../utils/media'

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
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="p-4 auth-card">
          <h2 class="fw-bold mb-4 text-center">Editar Perfil</h2>

          <p v-if="isLoading" class="text-center text-muted">Carregando...</p>

          <form v-else @submit.prevent="handleSubmit">
            <div class="text-center mb-4">
              <img
                :src="previewUrl"
                alt="Foto de Perfil"
                class="rounded-circle"
                width="120"
                height="120"
                style="object-fit: cover;"
              />

              <div class="mt-3">
                <label for="profilePicture" class="btn btn-outline-primary btn-sm">
                  Alterar Foto
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

            <div class="mb-3">
              <label for="username" class="form-label">Nome de Usuário</label>

              <input
                id="username"
                type="text"
                class="form-control"
                :value="username"
                disabled
              />
            </div>

            <div class="mb-3">
              <label for="fullName" class="form-label">Nome Completo</label>

              <input
                id="fullName"
                type="text"
                class="form-control"
                v-model="form.fullName"
              />

              <span v-if="errors.fullName" class="text-danger small">
                {{ errors.fullName }}
              </span>
            </div>

            <div class="mb-3">
              <label for="bio" class="form-label">Bio</label>

              <textarea
                id="bio"
                class="form-control"
                rows="3"
                v-model="form.bio"
                placeholder="Conte um pouco sobre você..."
              ></textarea>

              <div
                class="form-text text-end"
                :class="{ 'text-danger': bioCharsRemaining < 0 }"
              >
                {{ form.bio.length }}/{{ BIO_MAX }}
              </div>

              <span v-if="errors.bio" class="text-danger small">
                {{ errors.bio }}
              </span>
            </div>

            <p v-if="apiErrorMessage" class="text-danger small">
              {{ apiErrorMessage }}
            </p>

            <p v-if="successMessage" class="text-success small">
              {{ successMessage }}
            </p>

            <div class="d-grid gap-2">
              <button
                type="submit"
                class="btn btn-primary btn-lg"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? 'Salvando...' : 'Salvar Alterações' }}
              </button>

              <router-link to="/feed" class="btn btn-outline-secondary btn-lg">
                Cancelar
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>