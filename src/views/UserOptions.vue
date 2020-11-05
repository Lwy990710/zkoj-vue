<template>
    <div class="main">
        <div class="option">
            <h2>用户设置</h2>
            <el-divider class="line"></el-divider>
            <div class="row">
                <p><strong>名称</strong></p>
                <el-input v-model="input" placeholder="请输入新的名称"></el-input>
            </div>
            <div class="row">
                <p><strong>原密码</strong></p>
                <el-input v-model="input" placeholder="原密码"></el-input>
                <p><strong>新密码</strong></p>
                <el-input v-model="input" placeholder="新密码"></el-input>
                <p><strong>再次输入新密码</strong></p>
                <el-input v-model="input" placeholder="再次输入新密码"></el-input>
            </div>
            <div class="row">
                <p><strong>邮箱</strong></p>
                <el-input v-model="input" placeholder="请输入新的邮箱"></el-input>
            </div>
            <div class="row">
                <p><strong>简介</strong></p>
                <el-input
                        style="width: 50%"
                        type="textarea"
                        resize="none"
                        :autosize="{ minRows: 4, maxRows: 6}"
                        placeholder="请输入简介"
                        v-model="textarea">
                </el-input>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserOptions",
        beforeRouteEnter(to, from, next) {
            window.document.body.style.backgroundColor = '#EFEFEF';
            next();
        },
        data(){
            return{
                input: '',
                textarea: '',
            }
        }
    }
</script>

<style scoped>
    .main{
        padding-top: 20px;
        background-color: white;
        margin: 0 auto;
        min-width: 800px;
        width: 1000px;
        max-width: 1200px;
        height: 800px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

    .option{
        margin: 20px auto;
        width: 800px;
    }

    .line{
        margin-top: 10px !important;
        margin-bottom: 10px !important;
    }

    /deep/.el-input__inner.el-input__inner{
        width: 30% !important;
    }
</style>
