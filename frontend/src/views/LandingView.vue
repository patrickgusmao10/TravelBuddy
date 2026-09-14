<script setup>
import { ref, onMounted } from 'vue'
import { getApiStatus } from '../services/systemService'

const apiStatus = ref('verificando...')

onMounted(async () => {
  try {
    const response = await getApiStatus()
    apiStatus.value = response.data.status
  } catch (error) {
    apiStatus.value = 'offline'
    console.error('Erro ao consultar a API:', error.message)
  }
})
</script>

<template>
  <div class="landing">
    <h1>Bem-vindo ao TravelBuddy</h1>

    <p>
      Explore destinos, compartilhe experiências e planeje sua próxima viagem.
    </p>

    <p>
      Status da API:
      <strong>{{ apiStatus }}</strong>
    </p>
  </div>
</template>