<template>
    <div class="main">
        <div class="background">
            <img src="https://portrait.gitee.com/uploads/avatars/user/2721/8165732_lastbzzb_1609261536.png!avatar100">
        </div>
        <div id="user_menu" class="clear">
            <div id="option_menu">
                <el-button type="text" style="margin: 0 20px">主页</el-button>
                <el-button type="text">统计</el-button>
            </div>
            <span id="name" style="color:#606266;font-size:18px;display:inline-block;width: 16%;height: 50px;line-height: 50px">
                昵称
            </span>
            <div id="user_problem_msg">
                <span>提交</span><span>通过</span><span>排名</span>
                <span>100</span><span>100</span><span>1</span>
            </div>
        </div>
        <div v-if="is_msg" id="user_msg">
            <div class="msg">账号 : {{}}</div>
            <div class="msg">邮箱 : {{}}</div>
            <div class="msg">简介 : {{}}</div>
        </div>
        <div v-if="is_record" id="user_record"></div>
        <div id="user_msg_aside">
            <div class="msg">用户ID : {{}}</div>
            <div class="msg">注册日期 : {{}}</div>
            <div class="msg">最后登录日期 : {{}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserCenter",
        data(){
            return {
                is_msg: true,
                is_record: false,
                /** 用户信息列表 */
                user_message_list: null,
                username: '',
            }
        },
        beforeRouteEnter(to, from, next) {
            window.document.body.style.backgroundImage = 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)';
            next();
        },
        created() {

        },
    }
</script>

<style scoped>

    a{
        text-decoration: none;
    }

    img{
        margin-left: 45%;
        margin-top: 16%;
        border-radius: 50%;
    }

    #user_menu span{
        display: inline-block;
        font-size: 14px;
        width: 30%;
        height: 50%;
        text-align: center;
    }

    .clear::before,
    .clear::after {
        content: '';
        display: table;
        clear: both;
    }


    .main{
        clear: both;
        margin: 0 auto;
        min-width: 800px;
        width: 1100px;
        max-width: 1200px;
    }

    .background{
        width: 100%;
        height: 260px;
        background-image: url("img/bg4.jpg");
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    #user_menu{
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        padding-left: 20px;
        background-color: white;
    }

    #option_menu{
        margin-top: 12px;
        float: left;
        width:40%;
    }
    #user_problem_msg{
        width: 20%;
        margin-right: 10px;
        margin-top: 5px;
        float: right;
        height: 50px;
    }
    #user_msg,#user_record{
        float: left;
        margin-top: 10px;
        width: 70%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        padding: 20px;
        background-color: white;
    }
    #user_msg_aside{
        float: right;
        margin-top: 10px;
        width: 22%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        padding: 20px;
        background-color: white;
    }

    .msg{
        font-size: 18px;
        margin: 10px;
        color: #606266;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }

</style>
<style>

</style>
