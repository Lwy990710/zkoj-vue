import Vue from 'vue'
import VueRouter from 'vue-router'
import '../views/reset.css'
import ojMain from '../views/ojMain';
import questionMain from "../views/questionMain";

Vue.use(VueRouter)

const routes = [
  {
    path: "/main",
    name:"主页面",
    component: ojMain
  },
  {
    path: "/question",
    name: "答题页面",
    component: questionMain
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
