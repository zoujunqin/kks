import '@/auto/index'
import '@/http/http'
import '@/styles/global.scss'
import '@/icons/index'
// import '@/auto/mock'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'echarts-liquidfill'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
