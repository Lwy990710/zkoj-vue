import Vue from 'vue'
import VueRouter from 'vue-router'
import '../views/reset.css'
import ProblemList from '../views/ProblemList';
import ProblemDetail from "../views/ProblemDetail";
import AnswerPage from "../views/AnswerPage";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "主页面",
    component: ProblemList
  },
  {
    path: "/question",
    name: "答题页面",
    component: ProblemDetail
  },
  {
    path: "/answer",
    name: "答题页面",
    component: AnswerPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
