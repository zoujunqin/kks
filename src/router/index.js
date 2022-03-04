import Vue from 'vue'
import VueRouter from 'vue-router'
import ComponentCenter from '../views/component-center/index.vue'
import DrawCenter from '../views/draw-center/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'DrawCenter',
    component: DrawCenter
  },
  {
    path: '/ComponentCenter',
    name: 'ComponentCenter',
    component: ComponentCenter
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
