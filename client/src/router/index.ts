import { createRouter, createWebHashHistory } from 'vue-router'

export const ROUTE_LINK = {
  root: '/',
  about: '/about',
  blog: '/blog',
  blogArticle: '/blog/:id',
  login: '/login',
  adminPanel: '/admin-panel',
  notFound: '404'
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
    path: ROUTE_LINK.blogArticle,
    name: 'Article',
    component: () => import(/* webpackChunkName: "Article" */ '../views/Article/Article.vue')
  },
  {
    path: ROUTE_LINK.login,
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login/Login.vue')
  },
  {
    path: ROUTE_LINK.adminPanel,
    name: 'AdminPanel',
    component: () => import(/* webpackChunkName: "AdminPanel" */ '../views/AdminPanel/AdminPanel.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "Article" */ '../views/NotFound/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
