import Vue from 'vue'
import VueRouter from 'vue-router'
//import '../views/reset.css'
import ProblemList from '../views/ProblemList'
import ProblemDetail from "../views/ProblemDetail"
import AnswerPage from "../views/AnswerPage"
import DiscussionPage from "../views/DiscussionPage";
import AnswerRecord from "../views/AnswerRecord";
import RankPage from "../views/RankPage";
import SolutionDetail from "../views/SolutionDetail";
import AddProblem from "../views/admin/AddProblem";
import Main from "@/views/Main";
import AdminContainer from "@/views/admin/AdminContainer";
import ProblemManage from "@/views/admin/ProblemManage";
import UserCenter from "../views/UserCenter";
import UserManage from "../views/admin/UserManage";
import BatchAddUser from "../views/admin/BatchAddUser";
import ModifyQuestion from "../views/admin/ModifyQuestion";
import Home from '../views/Home';

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        component: Main,
        children: [{
                path: "/",
                name: "Home",
                component: Home
            },{
                path: "/problem",
                name: "ProblemList",
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
                path: "/usercenter/:username",
                name: "个人中心",
                component: UserCenter,
            },
            // {
            //     path: "/option/:username",
            //     name: "用户设置",
            //     component: UserOptions,
            //     meta: {
            //         requiresAuth: true
            //     }
            // },
            {
                path: "/discuss",
                name: "讨论页面",
                component: DiscussionPage
            },
            {
                path: "/rank",
                name: "排行榜",
                component: RankPage
            },
            {
                path: "/record",
                name: "答题记录",
                component: AnswerRecord
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
        meta: {
            requiresAuth: true,
            role: ['ADMIN', 'SUPER_ADMIN']
        },
        children: [{
            path: "problem",
            component: ProblemManage
        },
        {
            path: "add",
            name: "增加问题",
            component: AddProblem,
        },
        {
            path: "modify",
            name: "修改问题",
            component: ModifyQuestion
         },
        {
            path: "user",
            name: "用户管理",
            component: UserManage
        },
        {
            path: "adduser",
            name: "批量增加",
            component: BatchAddUser,
        }]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})



export default router
