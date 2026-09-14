<script setup>
import { onMounted } from 'vue'
import { getMyProfile } from '../../services/userService'

onMounted(async () => {
  try {
    const response = await getMyProfile()

    console.log('Perfil autenticado OK:', response.data)
  } catch (error) {
    console.error(
      'Erro ao buscar perfil autenticado:',
      error.message
    )
  }
})
</script>

<template>
  <div class="p-4">
    <h1>Meu Perfil</h1>
    <p>
      Em construção — chega na Aula 05.
      (teste temporário de autenticação no console)
    </p>
  </div>
</template>