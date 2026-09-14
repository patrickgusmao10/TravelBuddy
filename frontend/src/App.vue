<template>
  <div class="app-layout">
    <TheNavbar />

    <div class="app-body">
      <TheSidebar />

      <main class="app-content">
        <router-view />
      </main>
    </div>

    <TheFooter />
  </div>
</template>

<script setup>
import TheNavbar from './components/layout/TheNavbar.vue'
import TheSidebar from './components/layout/TheSidebar.vue'
import TheFooter from './components/layout/TheFooter.vue'
</script>