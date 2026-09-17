<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../../services/authService'
import BaseInput from '../../components/base/BaseInput.vue'
import BaseButton from '../../components/base/BaseButton.vue'
import FormCard from '../../components/base/FormCard.vue'

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
  <FormCard title="Criar Conta no TravelBuddy">
    <form @submit.prevent="handleSubmit">
      <BaseInput
        label="Nome de Usuário"
        v-model="form.username"
        :error="errors.username"
      />

      <BaseInput
        label="Nome Completo"
        v-model="form.fullName"
        :error="errors.fullName"
      />

      <BaseInput
        label="E-mail"
        type="email"
        v-model="form.email"
        :error="errors.email"
      />

      <BaseInput
        label="Senha"
        type="password"
        v-model="form.password"
        :error="errors.password"
      />

      <BaseInput
        label="Confirmar Senha"
        type="password"
        v-model="form.confirmPassword"
        :error="errors.confirmPassword"
      />

      <p v-if="apiErrorMessage" class="text-danger small">
        {{ apiErrorMessage }}
      </p>

      <div class="d-grid gap-2 mb-3">
        <BaseButton
          type="submit"
          :loading="isSubmitting"
          loading-text="Criando conta..."
        >
          Criar Minha Conta
        </BaseButton>
      </div>

      <p class="text-center text-muted">
        Já tem uma conta?
        <router-link to="/login">Faça login</router-link>
      </p>
    </form>
  </FormCard>
</template>