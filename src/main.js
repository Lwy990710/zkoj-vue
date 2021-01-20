import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'codemirror/lib/codemirror.css'
import "codemirror/addon/hint/show-hint.css";
import hljs from 'highlight.js';
import 'highlight.js/styles/a11y-light.css';
import './assets/theme/index.css';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

Vue.use(mavonEditor);
Vue.use(hljs.vuePlugin);
Vue.config.productionTip = false
//Vue.prototype.base_url = "http://yapi.yukineko.top/mock/16/zkoj/"
//Vue.prototype.base_url = "http://localhost:8084"
Vue.prototype.base_url = "http://47.100.60.193/api/"
axios.interceptors.request.use(config => {
  // 为请求头对象，添加 Token 验证的 Authorization 字段
  if (store.state.is_login)
    config.headers['Authorization'] = store.state.token;
  //必须return config 这是固定写法
  return config
});

// 添加响应拦截器
axios.interceptors.response.use(response =>{

  if(response.headers.authorization !== undefined) {
    store.commit('setToken', response.headers.authorization);
  }
  return response;
}, err => {

  if(err.response.status === 401){
    store.commit('logout');
    router.push("/");
  }
  return Promise.reject(err);
});

/** 前置钩子 */
router.beforeEach((to, from, next) => {

  if(!to.matched.some(check)) {
    next({path: "/"});
    return;
  }
  next();

});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

function check(record) {
  // 是否需要登录
  if('requiresAuth' in record.meta && !store.state.is_login) {
    return false;
  }
  if('role' in record.meta) {
    let roles = record.meta.role;
    if( roles.indexOf(store.state.role) === -1) {
      return false;
    }
  }
  return true;
}



