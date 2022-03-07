import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'DrawCenter',
    component: () => import('../views/draw-center/index.vue')
  },
  {
    path: '/ComponentCenter',
    name: 'ComponentCenter',
    component: () => import('../views/component-center/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
