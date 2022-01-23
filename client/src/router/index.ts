import { createRouter, createWebHashHistory } from 'vue-router'

export const ROUTE_LINK = {
  root: '/',
  about: '/about',
  blog: '/blog',
  blogArticle: '/blog/:id',
  // admin
  admin: '/admin',
  adminPanel: '/admin/panel'
}

const routes = [
  {
    path: ROUTE_LINK.root,
    name: 'Articles',
    component: () => import(/* webpackChunkName: "Articles" */ '../views/Articles/Articles.vue')
  },
  {
    path: ROUTE_LINK.about,
    name: 'About',
    component: () => import(/* webpackChunkName: "About" */ '../views/About/About.vue')
  },
  {
    path: ROUTE_LINK.admin,
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login/Login.vue')
  },
  {
    path: ROUTE_LINK.adminPanel,
    name: 'AdminPanel',
    component: () => import(/* webpackChunkName: "Login" */ '../views/AdminPanel/AdminPanel.vue')
  },
  {
    path: ROUTE_LINK.blogArticle,
    name: 'Article',
    component: () => import(/* webpackChunkName: "Article" */ '../views/Article/Article.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
