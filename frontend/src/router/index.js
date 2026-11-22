import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useToast } from '../composables/useToast'

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
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchView.vue')
  },

  {
    path: '/destinos/upload',
    name: 'destination-upload',
    component: () => import('../views/UploadView.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: '/destinos/:id',
    name: 'destination-detail',
    component: () => import('../views/DestinationDetailView.vue')
  },

  // Aula 09 - Perfil público
  {
    path: '/profile/:username',
    name: 'public-profile',
    component: () => import('../views/profile/PublicProfileView.vue')
  },

  {
    path: '/profile/:username/followers',
    name: 'profile-followers',
    component: () => import('../views/profile/FollowListView.vue'),
    props: { kind: 'followers' }
  },

  {
    path: '/profile/:username/following',
    name: 'profile-following',
    component: () => import('../views/profile/FollowListView.vue'),
    props: { kind: 'following' }
  },

  // Aula 09 - Meus destinos
  {
    path: '/destinos/meus',
    name: 'my-destinations',
    component: () => import('../views/MyDestinationsView.vue'),
    meta: { requiresAuth: true }
  },

  // Aula 09 - Editar destino
  {
    path: '/destinos/:id/edit',
    name: 'destination-edit',
    component: () => import('../views/EditDestinationView.vue'),
    meta: { requiresAuth: true }
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
    path: '/colecoes/minhas',
    name: 'my-collections',
    component: () => import('../views/collection/MyCollectionsView.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: '/colecoes/:id',
    name: 'collection-detail',
    component: () => import('../views/collection/CollectionDetailView.vue')
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
    path: '/notifications',
    name: 'notifications',
    component: () => import('../views/NotificationsView.vue'),
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
    component: () => import('../components/layout/AdminLayout.vue'),
    redirect: { name: 'admin-dashboard' },
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: () => import('../views/admin/AdminDashboardView.vue')
      },
      {
        path: 'reports',
        name: 'admin-reports',
        component: () => import('../views/admin/AdminReportsView.vue')
      },
      {
        path: 'usuarios',
        name: 'admin-users',
        component: () => import('../views/admin/AdminUsersView.vue')
      },
      {
        path: 'destinos',
        name: 'admin-destinations',
        component: () => import('../views/admin/AdminDestinationsView.vue')
      },
      {
        path: 'categorias',
        name: 'admin-categories',
        component: () => import('../views/admin/AdminCategoriesView.vue')
      },
      {
        path: 'moderacao',
        name: 'admin-moderation',
        component: () => import('../views/admin/AdminModerationView.vue')
      }
    ]
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior(to, from, savedPosition) {
    return { top: 0, left: 0 }
  }
})

router.beforeEach((to) => {
  const { isAuthenticated, currentUser } = useAuth()

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  // Esta checagem só poupa a pessoa de ver uma tela vazia: quem protege os DADOS é a API (403).
  if (to.meta.requiresAdmin && !currentUser.value?.isAdmin) {
    useToast().error('Você não tem permissão para acessar a administração.')
    return { name: 'general-feed' }
  }
})

export default router