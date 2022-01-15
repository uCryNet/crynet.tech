import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "About" */ '../views/About/About.vue')
  },
  {
    path: '/blog/:id',
    name: 'Article',
    component: () => import(/* webpackChunkName: "Article" */ '../views/Article/Article.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login/Login.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
