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
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home/Home.vue')
  },

  // Admin START
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
  // Admin END

  // Post START
  {
    path: ROUTE_LINK.blogArticle,
    name: 'Article',
    component: () => import(/* webpackChunkName: "Article" */ '../views/Article/Article.vue')
  },
  {
    path: ROUTE_LINK.blogArticles,
    name: 'Articles',
    component: () => import(/* webpackChunkName: "Articles" */ '../views/Articles/Articles.vue')
  },
  // Post END

  // Other START
  {
    path: ROUTE_LINK.about,
    name: 'About',
    component: () => import(/* webpackChunkName: "About" */ '../views/About/About.vue')
  },
  // Other END

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
