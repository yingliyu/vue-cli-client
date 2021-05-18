import Vue from 'vue'
import router from './routers'
import stores from './stores'
import App from './app.vue'
import '@/styles/index.less'
import ElementUI from 'element-ui'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  stores,
  router,
  render: (h) => h(App)
}).$mount('#app')
