import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '' || localStorage.getItem("username"),
    token: '' || localStorage.getItem("token"),
    is_login: Boolean(localStorage.getItem('token')),
    name: '' || localStorage.getItem("name"),
    role: '' || localStorage.getItem("role")
  },
  mutations: {
    setUsername: (state, username) => {
      state.username = username;
      localStorage.setItem("username", username);
    },
    login: (state, payload) => {
      state.token = payload.token;
      state.is_login = true;
      state.username = payload.username;
      state.name = payload.name;
      state.role = payload.role;
      localStorage.setItem("token", payload.token);
      localStorage.setItem("username", payload.username);
      localStorage.setItem("name", payload.name);
      localStorage.setItem("role", payload.role);
    },
    setName: (state, name) => {
      state.name = name;
      localStorage.setItem("name", name);
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
