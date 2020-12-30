import Vue from 'vue'
import VueRouter from 'vue-router'
//import '../views/reset.css'
import ProblemList from '../views/ProblemList'
import ProblemDetail from "../views/ProblemDetail"
import AnswerPage from "../views/AnswerPage"
import PersonalCenter from "../views/PersonalCenter";
import UserHomePage from "../views/UserHomePage";
import Statistics from "../views/Statistics";
import MyRelease from "../views/MyRelease";
import UserOptions from "../views/UserOptions";
import DiscussionPage from "../views/DiscussionPage";
import AnswerRecord from "../views/AnswerRecord";
import SolutionDetail from "../views/SolutionDetail";
import test from "../views/test";
import Main from "@/views/Main";
import AdminContainer from "@/views/admin/AdminContainer";
import ProblemManage from "@/views/admin/ProblemManage";
import solutionDetail from "../views/SolutionDetail";

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        component: Main,
        children: [{
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
                path: "/answer/:id",
                name: "答题页面",
                component: AnswerPage
            },
            {
                path: "/center",
                name: "个人中心",
                component: PersonalCenter,
                children: [{
                    path: "/userhome",
                    name: "主页",
                    component: UserHomePage
                },
                    {
                        path: "/statistics",
                        name: "统计",
                        component: Statistics
                    },


                    {
                        path: "/release",
                        name: "我的发布",
                        component: MyRelease
                    }
                ]
            },
            {
                path: "/option",
                name: "设置页面",
                component: UserOptions
            },
            {
                path: "/discuss",
                name: "讨论页面",
                component: DiscussionPage
            },
            {
                path: "/record",
                name: "答题记录",
                component: AnswerRecord
            },
            {
                path: "/test",
                name: "代码编译器测试",
                component: test
            },
            {
                path: "/solution/:id",
                name: "测评详情",
                component: SolutionDetail
            }]
    },
    {
        path: "/iacs",
        component: AdminContainer,
        children: [{
            path: "problem",
            component: ProblemManage
        }]
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
