<template>
  <div class="app-layout">
    <TheNavbar />

    <div class="container-fluid">
      <div class="row">
        <TheSidebar />

        <main class="col-12 col-md-9 col-lg-10 py-4">
          <router-view />
        </main>
      </div>
    </div>

    <TheFooter />
  </div>
</template>

<script setup>
import TheNavbar from './components/layout/TheNavbar.vue'
import TheSidebar from './components/layout/TheSidebar.vue'
import TheFooter from './components/layout/TheFooter.vue'
</script>