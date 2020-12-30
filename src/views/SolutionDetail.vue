<template>
    <div class="main clear">

        <div class="msg_main">
            <div id="msg_code">
             <strong>评测信息 | 源代码</strong>
            </div>

            <div id="solution_msg">
                <p>使用内存: {{solutionDetailData.memory}}MB</p>
                <p>执行耗时:{{solutionDetailData.time}}s</p>
                <p>错误信息:{{solutionDetailData.error_massage}}</p>
            </div>
        </div>

        <div id="submit_msg">
            <p>提名</p>
            <p>用户:用户名</p>
            <p>提交时间:时间</p>
            <p>状态:状态名</p>
            <p>语言:语言名</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "solutionDetail",
        data(){
            return {
                solutionDetailData: {
                    status: {
                        id: -1,
                        name: '',
                        description: ''
                    },
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
            /*axios.get(this.base_url + "/solution/" + this.$route.params.id)
                .then(res => {
                    if(res.data.status === 1){
                        this.solutionDetailData = res.data.data;
                    }
                }).catch(err => {
                    alert(err);
            })*/
        },
        methods: {

        }
    }
</script>

<style scoped>

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
        padding: 20px;
        width: 640px;
        height: 50px;
        line-height: 10px;
        float: left;
        font-size: 22px;
        box-sizing: border-box;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }

    #solution_msg{
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
        height: 200px;
        float: right;
        box-sizing: border-box;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }
</style>
