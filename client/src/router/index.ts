import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/About/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "About" */ '../views/Home/About.vue')
  },
  {
    path: '/blog/:id',
    name: 'Article',
    component: () => import(/* webpackChunkName: "About" */ '../views/Article/Article.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
