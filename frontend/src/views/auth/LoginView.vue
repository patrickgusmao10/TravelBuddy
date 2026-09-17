<script setup>
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import BaseInput from '../../components/base/BaseInput.vue'
import BaseButton from '../../components/base/BaseButton.vue'
import FormCard from '../../components/base/FormCard.vue'

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
  <FormCard title="Entrar no TravelBuddy">
    <form @submit.prevent="handleSubmit">
      <BaseInput label="E-mail ou Usuário" v-model="form.login" />
      <BaseInput label="Senha" type="password" v-model="form.password" />

      <p v-if="apiErrorMessage" class="text-danger small">
        {{ apiErrorMessage }}
      </p>

      <div class="d-grid gap-2 mb-3">
        <BaseButton
          type="submit"
          :loading="isSubmitting"
          loading-text="Entrando..."
        >
          Entrar
        </BaseButton>
      </div>

      <p class="text-center text-muted">
        Não tem uma conta?
        <router-link to="/register">Crie uma agora</router-link>
      </p>
    </form>
  </FormCard>
</template>