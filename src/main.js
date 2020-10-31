import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'codemirror/lib/codemirror.css'
import "codemirror/addon/hint/show-hint.css";

Vue.config.productionTip = false
Vue.prototype.base_url = "http://yapi.yukineko.top/mock/16/zkoj/"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

