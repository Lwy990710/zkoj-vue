import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '' || localStorage.getItem("username"),
    token: '' || localStorage.getItem("token"),
    is_login: Boolean(localStorage.getItem('token'))
  },
  mutations: {
    setUsername: (state, username) => {
      state.username = username;
      localStorage.setItem("username", username);
    },
    login: (state, token) => {
      state.token = token;
      state.is_login = true;
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.is_login = false;
      state.token = '';
      state.username = '';
      localStorage.removeItem('username');
      localStorage.removeItem('token');
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    username: state => state.username,
    token: state => state.token
  }
})
