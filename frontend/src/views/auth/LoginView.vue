<script setup>
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const form = reactive({
  login: '',
  password: '',
})

const isSubmitting = ref(false)
const apiErrorMessage = ref('')

async function handleSubmit() {
  apiErrorMessage.value = ''
  isSubmitting.value = true

  try {
    await authStore.login({
      login: form.login.trim(),
      password: form.password,
    })

    router.push(
      route.query.redirect || { name: 'destinations' }
    )
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
      <div class="col-md-6 col-lg-5">
        <div class="auth-card">

          <div class="auth-header">
            <h2 class="fw-bold mb-0">
              Entrar no TravelBuddy
            </h2>
          </div>

          <div class="p-4">
            <form @submit.prevent="handleSubmit">

              <div class="mb-3">
                <label for="login" class="form-label">
                  E-mail ou Usuário
                </label>

                <input
                  id="login"
                  v-model="form.login"
                  type="text"
                  class="form-control"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="password" class="form-label">
                  Senha
                </label>

                <input
                  id="password"
                  v-model="form.password"
                  type="password"
                  class="form-control"
                  required
                />
              </div>

              <p
                v-if="apiErrorMessage"
                class="text-danger small"
              >
                {{ apiErrorMessage }}
              </p>

              <div class="d-grid gap-2 mb-3">
                <button
                  type="submit"
                  class="btn btn-primary btn-lg"
                  :disabled="isSubmitting"
                >
                  {{ isSubmitting ? 'Entrando...' : 'Entrar' }}
                </button>
              </div>

              <p class="text-center text-muted">
                Não tem uma conta?
                <router-link to="/register">
                  Crie uma agora
                </router-link>
              </p>

            </form>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>