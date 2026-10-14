
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '../../composables/useAuth'
import { getComments, addComment } from '../../services/commentService'
import { getProfilePictureUrl } from '../../utils/media'
import { formatDateTime } from '../../utils/format'

const COMMENT_MAX = 500

const props = defineProps({
  destinationId: { type: Number, required: true },
})

const route = useRoute()
const { isAuthenticated } = useAuth()

const comments = ref([])
const isLoading = ref(true)
const loadErrorMessage = ref('')

const newContent = ref('')
const contentError = ref('')
const isSubmitting = ref(false)
const submitErrorMessage = ref('')

const charsRemaining = computed(() => COMMENT_MAX - newContent.value.length)

onMounted(async () => {
  try {
    const response = await getComments(props.destinationId)
    comments.value = response.data
  } catch (error) {
    loadErrorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
})

function validate() {
  contentError.value = ''

  if (!newContent.value.trim()) {
    contentError.value = 'O comentário não pode ser vazio.'
  } else if (newContent.value.length > COMMENT_MAX) {
    contentError.value = `O comentário deve ter no máximo ${COMMENT_MAX} caracteres.`
  }

  return contentError.value === ''
}

async function handleSubmit() {
  submitErrorMessage.value = ''

  if (!validate()) {
    return
  }

  isSubmitting.value = true

  try {
    const response = await addComment(props.destinationId, newContent.value.trim())
    comments.value.unshift(response.data)
    newContent.value = ''
  } catch (error) {
    submitErrorMessage.value = error.message
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="mt-4">
    <h5 class="fw-bold mb-3">Comentários ({{ comments.length }})</h5>

    <form v-if="isAuthenticated" class="mb-4" @submit.prevent="handleSubmit">
      <textarea
        v-model="newContent"
        class="form-control"
        :class="{ 'is-invalid': contentError }"
        rows="3"
        placeholder="Escreva seu comentário..."
        :disabled="isSubmitting"
      ></textarea>

      <div v-if="contentError" class="invalid-feedback d-block">
        {{ contentError }}
      </div>

      <div class="d-flex justify-content-between align-items-center mt-2">
        <small :class="charsRemaining < 0 ? 'text-danger' : 'text-muted'">
          {{ newContent.length }}/{{ COMMENT_MAX }}
        </small>

        <button
          type="submit"
          class="btn btn-primary rounded-pill px-4"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Enviando...' : 'Comentar' }}
        </button>
      </div>

      <p v-if="submitErrorMessage" class="text-danger small mt-2 mb-0">
        {{ submitErrorMessage }}
      </p>
    </form>

    <p v-else class="text-muted mb-4">
      <router-link :to="{ name: 'login', query: { redirect: route.fullPath } }">
        Entre
      </router-link>
      para comentar.
    </p>

    <p v-if="isLoading" class="text-muted">Carregando comentários...</p>

    <p v-else-if="loadErrorMessage" class="text-danger">
      {{ loadErrorMessage }}
    </p>

    <p v-else-if="comments.length === 0" class="text-muted">
      Ainda não há comentários. Seja a primeira pessoa!
    </p>

    <ul v-else class="list-group list-group-flush">
      <li
        v-for="comment in comments"
        :key="comment.id"
        class="list-group-item px-0 d-flex"
      >
        <router-link
          :to="{ name: 'public-profile', params: { username: comment.User.username } }"
          class="me-3"
        >
          <img
            :src="getProfilePictureUrl(comment.User.profilePicture)"
            :alt="comment.User.username"
            class="rounded-circle"
            width="40"
            height="40"
            style="object-fit: cover;"
          />
        </router-link>

        <div class="flex-grow-1">
          <div>
            <router-link
              :to="{ name: 'public-profile', params: { username: comment.User.username } }"
              class="fw-semibold text-decoration-none text-dark"
            >
              {{ comment.User.fullName || comment.User.username }}
            </router-link>

            <small class="text-muted ms-1">
              @{{ comment.User.username }}
            </small>

            <small class="text-muted ms-2">
              {{ formatDateTime(comment.createdAt) }}
            </small>
          </div>

          <p class="comment-content mb-0">{{ comment.content }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>