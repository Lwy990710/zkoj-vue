import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'codemirror/lib/codemirror.css'
import "codemirror/addon/hint/show-hint.css";

Vue.config.productionTip = false
//Vue.prototype.base_url = "http://yapi.yukineko.top/mock/16/zkoj/"
Vue.prototype.base_url = "http://localhost:8080"

axios.interceptors.request.use(config => {
  // 为请求头对象，添加 Token 验证的 Authorization 字段
  console.log("axios: " + store.state.is_login);
  if (store.state.is_login)
    config.headers['Authorization'] = store.state.token;
  //必须return config 这是固定写法
  return config
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');



