import Vue from 'vue'
import VueRouter from 'vue-router'
//import '../views/reset.css'
import ProblemList from '../views/ProblemList'
import ProblemDetail from "../views/ProblemDetail"
import AnswerPage from "../views/AnswerPage"
import test from "../views/test";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "主页面",
    component: ProblemList
  },
  {
    path: "/problem/:id",
    name: "答题页面",
    component: ProblemDetail
  },
  {
    path: "/answer",
    name: "答题页面",
    component: AnswerPage
  },
  {
    path: "/test",
    name: "代码编译器测试",
    component: test
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
