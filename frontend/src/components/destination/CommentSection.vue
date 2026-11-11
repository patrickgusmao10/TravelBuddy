<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '../../composables/useAuth'
import { useAsyncData } from '../../composables/useAsyncData'
import { getComments, addComment } from '../../services/commentService'
import { getProfilePictureUrl } from '../../utils/media'
import { formatDateTime } from '../../utils/format'
import { LIMITS } from '../../config/constants'

const props = defineProps({
  destinationId: { type: Number, required: true },
})

const route = useRoute()
const { isAuthenticated } = useAuth()

const {
  data: comments,
  isLoading,
  error: loadErrorMessage,
} = useAsyncData(
  () => getComments(props.destinationId),
  { initialData: [] }
)

const newContent = ref('')
const contentError = ref('')
const isSubmitting = ref(false)

const charsRemaining = computed(() => LIMITS.COMMENT_MAX - newContent.value.length)

function validate() {
  contentError.value = ''

  if (!newContent.value.trim()) {
    contentError.value = 'O comentário não pode ser vazio.'
  } else if (newContent.value.length > LIMITS.COMMENT_MAX) {
    contentError.value = `O comentário deve ter no máximo ${LIMITS.COMMENT_MAX} caracteres.`
  }

  return contentError.value === ''
}

async function handleSubmit() {
  if (!validate()) {
    return
  }

  isSubmitting.value = true

  try {
    const response = await addComment(props.destinationId, newContent.value.trim())
    comments.value.unshift(response.data)
    newContent.value = ''
  } catch {
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
          {{ newContent.length }}/{{ LIMITS.COMMENT_MAX }}
        </small>

        <button
          type="submit"
          class="btn btn-primary rounded-pill px-4"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Enviando...' : 'Comentar' }}
        </button>
      </div>
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