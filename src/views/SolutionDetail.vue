<template>
    <div class="main clear">

        <div class="msg_main">
            <div id="msg_code">
                <el-button style="max-width: 150px;display: inline-block" @click="isSolutionMsg=true,isCode=false" type="text">评测信息</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button style="max-width: 150px;display: inline-block" @click="isSolutionMsg=false,isCode=true" type="text">源代码</el-button>
            </div>

            <div v-if="isSolutionMsg" class="solution_msg">
                <p>使用内存: {{solutionDetailData.memory}}MB</p>
                <p>执行耗时: {{solutionDetailData.time}}s</p>
                <p>错误信息: {{solutionDetailData.error_massage}}</p>
            </div>

            <div v-if="isCode" class="solution_msg">
                <h3>提交代码为:</h3>
                <div>{{solutionDetailData.source_code}}</div>
            </div>
        </div>

        <div id="submit_msg">
            <p>题目名:<router-link :to='"/problem/" + solutionDetailData.problem.id'> {{solutionDetailData.problem.id}}</router-link></p>
            <p>用户: <router-link :to='"/userhome"'>{{solutionDetailData.user.username}}</router-link> </p>
            <p>提交时间: {{solutionDetailData.submit_date}}</p>
            <p>状态: {{solutionDetailData.status.name}}</p>
            <p>语言: {{solutionDetailData.language.name}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "solutionDetail",
        data(){
            return {
                isSolutionMsg: true,
                isCode: false,
                solutionDetailData: {
                    status: {
                        id: -1,
                        name: '',
                        description: ''
                    },
                    source_code: '',
                    error_massage: '',
                    submit_date: '',
                    time: -1,
                    memory: -1,
                    language: {
                        id: -1,
                        name: ''
                    },
                    problem: {
                        id: -1,
                        title: ''
                    },
                    user: {
                        username: '',
                        name: ''
                    },
                    status: -1,
                    message: ''
                }
            }
        },
        beforeRouteEnter(to, from, next) {
            window.document.body.style.backgroundColor = '#EFEFEF';
            next();
        },
        created() {
            axios.get(this.base_url + "/solution/" + this.$route.params.id)
                .then(res => {
                    if(res.data.status === 1){
                        this.solutionDetailData = res.data.data;
                    }
                }).catch(err => {
                    alert(err);
            })
        },
        methods: {

        }
    }
</script>

<style scoped>

    a{
        text-decoration: none;
    }

    .clear::before,
    .clear::after {
        content: '';
        display: table;
        clear: both;
    }

    .main{
        padding: 20px;
        max-width: 1050px;
        width: 1000px;
        min-width: 1000px;
        margin: 0 auto;
    }

    .msg_main{
        width: 640px;
        float: left;
    }

    #msg_code{
        background-color: white;
        padding:  0 20px;
        width: 600px;
        height: 40px;
        line-height: 40px;
        float: left;
        font-size: 22px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }

    .solution_msg{
        background-color: white;
        padding: 20px;
        width: 640px;
        margin-top: 20px;
        float: left;
        height: 400px;
        box-sizing: border-box;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }

    #submit_msg{
        background-color: white;
        padding: 20px;
        width: 350px;
        height: 220px;
        float: right;
        box-sizing: border-box;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }
</style>
