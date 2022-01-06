import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "Home" */ '../views/About/About.vue')
  },
  {
    path: '/blog/:id',
    name: 'Article',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Article/Article.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
