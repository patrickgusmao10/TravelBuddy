import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: () => import('../views/LandingView.vue')
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/LoginView.vue')
  },

  {
    path: '/register',
    name: 'register',
    component: () => import('../views/auth/RegisterView.vue')
  },

  {
    path: '/destinos',
    name: 'destinations',
    component: () => import('../views/DestinationsView.vue')
  },

  {
    path: '/destinos/:id',
    name: 'destination-detail',
    component: () => import('../views/DestinationDetailView.vue')
  },

  {
  path: '/profile/me',
  name: 'my-profile',
  component: () => import('../views/profile/MyProfileView.vue'),
  meta: { requiresAuth: true }
  },

  {
    path: '/favoritos',
    name: 'favorites',
    component: () => import('../views/FavoritesView.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: '/roteiros',
    name: 'itineraries',
    component: () => import('../views/ItinerariesView.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: '/relatos/novo',
    name: 'create-report',
    component: () => import('../views/CreateReportView.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: '/relatos',
    name: 'reports',
    component: () => import('../views/ReportsView.vue')
  },

  {
    path: '/avaliacoes',
    name: 'reviews',
    component: () => import('../views/ReviewsView.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: '/viajantes',
    name: 'travelers',
    component: () => import('../views/TravelersView.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: '/feed/seguindo',
    name: 'following-feed',
    component: () => import('../views/FollowingFeedView.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: '/feed/geral',
    name: 'general-feed',
    component: () => import('../views/GeneralFeedView.vue')
  },

  {
    path: '/admin',
    name: 'admin-dashboard',
    component: () => import('../views/admin/AdminDashboardView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },

  {
    path: '/admin/destinos',
    name: 'admin-destinations',
    component: () => import('../views/admin/AdminDestinationsView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },

  {
    path: '/admin/categorias',
    name: 'admin-categories',
    component: () => import('../views/admin/AdminCategoriesView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },

  {
    path: '/admin/moderacao',
    name: 'admin-moderation',
    component: () => import('../views/admin/AdminModerationView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  
  {
    path: '/admin/usuarios',
    name: 'admin-users',
    component: () => import('../views/admin/AdminUsersView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      name: 'login',
      query: {
        redirect: to.fullPath
      }
    }
  }
})

export default router