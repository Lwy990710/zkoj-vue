<template>
    <div class="main">
        <div class="problem_nav">
            <div class="problem_msg_main">
                <h1 class="problem_id">1000 水题</h1>
            </div>

            <div class="msg_detail">
                <span class="msg">难度：简单</span>
                <span class="msg">提交数：1</span>
                <span class="msg">通过数：1</span>
                <span class="msg time">时间限制：1.000s</span>
                <span class="msg">内存：100M</span>
            </div>
        </div>

        <div class="problem_main">
            <div class="problem_describe">
                <h2>问题描述</h2>
                <div class="problem_content">
                    纯纯的A+B纯纯的A+B纯纯的A+B纯纯的A+B纯纯的A+B纯纯的A+B纯纯的A+B纯纯
                    的A+B纯纯的A+B纯纯的A+B纯纯的A+B纯纯的A+B纯纯的A+B纯纯的A+B纯纯的
                    A+B纯纯的A+B纯纯的A+B纯纯的A+B纯纯的A+B纯纯的A+B纯
                    纯的A+B纯纯的A+B纯纯的A+B纯纯的A+B纯纯的A+B纯纯的A+B纯纯的A+B纯纯的A+B纯纯的A+B
                </div>
            </div>

            <div class="problem_input">
                <div class="input_content">
                    <h2>输入格式</h2>
                    <div class="input">
                        1 2
                    </div>
                </div>
            </div>

            <div class="problem_output">
                <div class="output_content">
                    <h2>输出格式</h2>
                    <div class="output">
                        3
                    </div>
                </div>
            </div>
        </div>

        <div class="submit">
            <el-button type="primary" @click="answer">提交答案</el-button>
        </div>
    </div>
</template>

<script>

    export default {
        name: "questionMain",
        methods :{
            answer(){
                this.$router.push('/answer')
            }
        }
    }
</script>

<style scoped>

    .main{
        margin: 0 auto;
        max-width: 1200px;
        min-width: 800px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }

    .problem_nav{
        text-align: center;
        margin-bottom: 30px;
    }

    .problem_msg_main{

        margin-bottom: 20px;
        padding-top: 30px;
    }

    .msg{
        display: inline-block;
        width: 100px;
    }

    .time{
        width: 140px;
    }

    .problem_main{
        line-height: 26px;
        padding-left: 20px;
        text-align: left;
        margin: 0 auto;
        width: 600px;
    }

    .problem_content{
        margin: 20px 0;
    }

    .input{
        margin: 20px 0;
    }

    .output{
        margin: 20px 0;
    }

    .submit{
        text-align: center;
        padding-bottom: 40px;
    }
</style>