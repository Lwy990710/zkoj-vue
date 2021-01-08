<template>
    <div class="main">
        <div id="user_option">
            <div class="option">
                <span>邮箱 : </span>
                <el-input v-model="new_email" size="small" placeholder="新邮箱" style="width: 200px"></el-input>
            </div>
            <div class="option">
                <span>昵称 : </span>
                <el-input v-model="new_name" size="small" placeholder="新昵称" style="width: 200px">
                    <template slot="append"><el-button>修改</el-button></template>
                </el-input>
            </div>
            <div class="option">
                <span>原密码 : </span>
                <el-input v-model="old_password" size="small" show-password placeholder="原密码" style="width: 200px"></el-input>
            </div>
            <div class="option">
                <span>新密码 : </span>
                <el-input v-model="new_password" size="small" show-password placeholder="新密码" style="width: 200px"></el-input>
            </div>
            <div class="option">
                <span>再次输入 : </span>
                <el-input v-model="pardon_new_password" size="small" show-password placeholder="再次输入新密码" style="width: 200px"></el-input>
            </div>
            <div id="submit" style="margin-left: 100px">
                <el-button type="danger">修改密码</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserOptions",
        data(){
            return {
                new_name: '',
                old_password: '',
                new_password: '',
                pardon_new_password: '',
                new_email: '',
            }
        },
        beforeRouteEnter(to, from, next) {
            window.document.body.style.backgroundImage = 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)';
            next();
        },
        methods: {

        }
    }
</script>

<style scoped>
    .main{
        min-width: 800px;
        width: 1000px;
        max-width: 1200px;
        margin: 0 auto;
        background-color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    #user_option{
        padding: 20px;
    }

    #user_option span{
        width: 70px;
        display: inline-block;
        font-size: 14px;
        margin: 10px;
    }

    .option{
        margin: 20px 0;
    }
</style>
