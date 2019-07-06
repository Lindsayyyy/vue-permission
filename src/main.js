// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import {addRouterMenu} from './components/config/routerConfig.js'
import Vuex from 'vuex'
import store from './vuex/store'

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.addRouterMenu = addRouterMenu

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
