import { createRouter, createWebHashHistory } from 'vue-router'

export const ROUTE_LINK = {
  root: '/',
  about: '/about',
  blog: '/blog',
  blogArticle: '/blog/:id',
  // admin
  admin: '/admin',
  adminArticle: '/admin/article',
  adminArticles: '/admin/articles',
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
  // admin START
  {
    path: ROUTE_LINK.admin,
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login/Login.vue')
  },
  {
    path: ROUTE_LINK.adminArticle,
    name: 'AdminPanel',
    component: () => import(/* webpackChunkName: "Login" */ '../views/AdminPanel/AdminPanel.vue')
  },
  {
    path: ROUTE_LINK.adminArticles,
    name: 'AdminPanel',
    component: () => import(/* webpackChunkName: "Article" */ '../views/AdminPanel/AdminPanel.vue')
  },
  // admin END
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
