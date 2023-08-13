import { createRouter, createWebHashHistory } from 'vue-router'


export const ROUTES_CONFIG = {
  root: {
    path: '/',
    name: 'Home',
  },
  about: {
    path: '/about',
    name: 'About',
  },
  article: {
    path: '/blog/:category.ts/:id',
    name: 'Article',
  },
  articles: {
    path: '/blog/:category.ts?',
    name: 'Articles',
  },
  login: {
    path: '/login',
    name: 'Login',
  },
  adminPanel: {
    path: '/admin-panel',
    name: 'AdminPanel',
  },
  notFound: {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
  },
}


const routes = [
  {
    path: ROUTES_CONFIG.root.path,
    name: ROUTES_CONFIG.root.name,
    component: () => import(/* webpackChunkName: "TheHome" */ '../views/TheHome/TheHome.vue')
  },
  {
    path: ROUTES_CONFIG.login.path,
    name: ROUTES_CONFIG.login.name,
    component: () => import(/* webpackChunkName: "AdminLogin" */ '../views/AdminLogin/AdminLogin.vue')
  },
  {
    path: ROUTES_CONFIG.adminPanel.path,
    name: ROUTES_CONFIG.adminPanel.name,
    component: () => import(/* webpackChunkName: "AdminPanel" */ '../views/AdminPanel/AdminPanel.vue')
  },
  {
    path: ROUTES_CONFIG.article.path,
    name: ROUTES_CONFIG.article.name,
    component: () => import(/* webpackChunkName: "TheArticle" */ '../views/TheArticle/TheArticle.vue')
  },
  {
    path: ROUTES_CONFIG.articles.path,
    name: ROUTES_CONFIG.articles.name,
    component: () => import(/* webpackChunkName: "TheArticles" */ '../views/TheArticles/TheArticles.vue')
  },
  {
    path: ROUTES_CONFIG.about.path,
    name: ROUTES_CONFIG.about.name,
    component: () => import(/* webpackChunkName: "TheAbout" */ '../views/TheAbout/TheAbout.vue')
  },
  {
    path: ROUTES_CONFIG.notFound.path,
    name: ROUTES_CONFIG.notFound.name,
    component: () => import(/* webpackChunkName: "NotFound" */ '../views/NotFound/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
