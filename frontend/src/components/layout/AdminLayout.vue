<script setup>
const links = [
  { to: { name: 'admin-dashboard' }, label: 'Dashboard', icon: 'bi-speedometer2' },
  { to: { name: 'admin-reports' }, label: 'Denúncias', icon: 'bi-flag' },
  { to: { name: 'admin-users' }, label: 'Usuários', icon: 'bi-people' },
  { to: { name: 'admin-destinations' }, label: 'Destinos', icon: 'bi-geo-alt' },

]
</script>

<template>
  <div>
    <h4 class="fw-bold mb-3">Administração</h4>

    <nav aria-label="Seções da administração">
      <ul class="nav nav-pills mb-4">
        <li v-for="link in links" :key="link.label" class="nav-item">
          <router-link :to="link.to" class="nav-link" active-class="active">
            <i class="bi me-1" :class="link.icon"></i> {{ link.label }}
          </router-link>
        </li>
      </ul>
    </nav>

    <router-view />
  </div>
</template>