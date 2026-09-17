<script setup>
defineProps({
  title: { type: String, required: true },
})
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="auth-card">
          <div class="auth-header">
            <h2 class="fw-bold mb-0">{{ title }}</h2>
          </div>
          <div class="p-4">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>