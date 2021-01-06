<template>
    <div class="main">
        <h2 style="margin-bottom: 0px">用户信息</h2>
        <el-divider class="line"></el-divider>

        <el-avatar :size="80" shape="square"
                   src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>


        <div class="msg">
            <h1 style="margin-bottom: 0px">基本资料</h1>
            <el-divider class="line"></el-divider>
            <p>账号: {{user_msg.username}}</p>
            <p>名称:{{user_msg.name}}</p>
            <p>邮箱:{{user_msg.email}}</p>
            <p>注册日期:{{user_msg.create_date}}</p>
            <p>简介:{{user_msg.description}}</p>
        </div>

        <div class="problem_sum">
            <h2>完成题目总数</h2>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserHomePage",
        data() {
            return {
                user_msg: {
                    username: '',
                    name: '',
                    face_url: '',
                    email: '',
                    description: '',
                    create_date: ''
                }
            }
        },
        created() {
            axios.get(this.base_url + "/user")
                .then(res => {
                    this.user_msg = res.data.data;
                    if (res.data)
                    console.log(this.problem_data)
                }).catch(err => {
                //请求失败时进入catch
                this.$message.error(err);;
            })
        },
        beforeRouteEnter(to, from, next) {
            window.document.body.style.backgroundImage = 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)';
            next();
        },
    }
</script>

<style scoped>
    .main {
        margin: 20px auto;
        padding: 0px 20px;
    }

    .line {
        margin-top: 10px !important;
        margin-bottom: 10px !important;
    }
</style>
