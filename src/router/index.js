import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import FavoritesPage from '../views/FavoritesPage.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/favorites', name: 'Favorites', component: FavoritesPage },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
