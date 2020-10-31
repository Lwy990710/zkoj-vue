<template>
    <div class="main" >
        <div class="answer_main">
            <div class="back">
                <el-button type="primary" @click="back">返回题目</el-button>
            </div>
            <!-- 问题描述 -->
            <div class="answer_problem_description">
                <h2>问题描述</h2>
                <div class="answer_problem_content" id="answer_problem_description_content">
                    这里是问题描述
                </div>
            </div>
        </div>
        <div>
            -----------------------------代码编译器测试-------------------------------
        </div>
        <div class="test"></div>
    </div>
</template>


<script>


    export default {
        name: "AnswerPage",
        methods: {
            back() {
                this.$router.push('/question')
            },
            beforeRouteEnter(to,from,next){
                window.document.body.style.backgroundColor = '#EFEFEF';
                next();
            },
        }
    }

</script>

<style scoped>

    .main {
        background-color: #ffffff!important;
        margin: 0 auto;
        max-width: 800px;
        min-width: 800px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }

    .answer_main{
        width: 600px;
        margin: 0 auto;
    }

    .back{
        padding-top: 20px;
        text-align: center;
    }

    .answer_problem_content{
        text-indent: 2em;
    }
</style>
