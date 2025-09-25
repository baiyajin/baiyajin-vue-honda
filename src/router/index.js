import { createRouter, createWebHashHistory } from 'vue-router'
import home from '@/components/home.vue'
const AutoHack = () => import('@/views/AutoHack.vue')

const routes = [
  {
    path: '/',
    name: 'autohack',
    component: AutoHack
  },
  {
    path: '/home',
    name: 'home',
    component: home
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
