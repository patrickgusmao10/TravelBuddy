<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../../services/authService'

const router = useRouter()

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  fullName: '',
})

const errors = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  fullName: '',
})

const isSubmitting = ref(false)
const apiErrorMessage = ref('')
function validate()
{
  Object.keys(errors).forEach((key) => (errors[key] = ''))

  if (!form.fullName.trim()) {
    errors.fullName = 'O nome completo é obrigatório.'
  }

  if (form.username.trim().length < 3 || form.username.trim().length > 20) {
    errors.username = 'O nome de usuário deve ter entre 3 e 20 caracteres.'
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailPattern.test(form.email)) {
    errors.email = 'Informe um e-mail válido.'
  }

  if (form.password.length < 6) {
    errors.password = 'A senha deve ter pelo menos 6 caracteres.'
  }

  if (form.confirmPassword !== form.password) {
    errors.confirmPassword = 'As senhas não coincidem.'
  }

  return Object.values(errors).every((message) => message === '')
}

async function handleSubmit() {
  apiErrorMessage.value = ''

  if (!validate()) {
    return
  }

  isSubmitting.value = true

  try {
    const response = await register({
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password,
      confirmPassword: form.confirmPassword,
      fullName: form.fullName.trim(),
    })

    console.log('Conta criada:', response.data)

    router.push({ name: 'login' })
  } catch (error) {
    apiErrorMessage.value = error.message
  } finally {
    isSubmitting.value = false
  }
}
</script>


<template>
  <div class="auth-page">
    <h1>Criar Conta</h1>

    <form @submit.prevent="handleSubmit">
      <div class="field">
        <label for="fullName">Nome completo</label>
        <input id="fullName" type="text" v-model="form.fullName" />
        <span v-if="errors.fullName" class="error-message">
          {{ errors.fullName }}
        </span>
      </div>

      <div class="field">
        <label for="username">Usuário</label>
        <input id="username" type="text" v-model="form.username" />
        <span v-if="errors.username" class="error-message">
          {{ errors.username }}
        </span>
      </div>

      <div class="field">
        <label for="email">E-mail</label>
        <input id="email" type="email" v-model="form.email" />
        <span v-if="errors.email" class="error-message">
          {{ errors.email }}
        </span>
      </div>

      <div class="field">
        <label for="password">Senha</label>
        <input id="password" type="password" v-model="form.password" />
        <span v-if="errors.password" class="error-message">
          {{ errors.password }}
        </span>
      </div>

      <div class="field">
        <label for="confirmPassword">Confirmar senha</label>
        <input
          id="confirmPassword"
          type="password"
          v-model="form.confirmPassword"
        />
        <span v-if="errors.confirmPassword" class="error-message">
          {{ errors.confirmPassword }}
        </span>
      </div>

      <p v-if="apiErrorMessage" class="api-error">
        {{ apiErrorMessage }}
      </p>

      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Criando conta...' : 'Criar Minha Conta' }}
      </button>
    </form>
  </div>
</template>