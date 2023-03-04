import { createRouter, createWebHashHistory } from 'vue-router'


export const ROUTE_LINK = {
  root: '/',
  about: '/about',
  blogArticle: '/blog/:category/:id',
  blogArticles: '/blog/:category?',
  login: '/login',
  adminPanel: '/admin-panel',
  notFound: '404'
}

const routes = [
  {
    path: ROUTE_LINK.root,
    name: 'TheHome',
    component: () => import(/* webpackChunkName: "TheHome" */ '../views/TheHome/TheHome.vue')
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
    path: ROUTE_LINK.blogArticle,
    name: 'TheArticle',
    component: () => import(/* webpackChunkName: "TheArticle" */ '../views/TheArticle/TheArticle.vue')
  },
  {
    path: ROUTE_LINK.blogArticles,
    name: 'TheArticles',
    component: () => import(/* webpackChunkName: "TheArticles" */ '../views/TheArticles/TheArticles.vue')
  },
  {
    path: ROUTE_LINK.about,
    name: 'TheAbout',
    component: () => import(/* webpackChunkName: "TheAbout" */ '../views/TheAbout/TheAbout.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "NotFound" */ '../views/NotFound/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
