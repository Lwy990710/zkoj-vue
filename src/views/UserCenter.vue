<template>
    <div class="main">
        <!-- 背景图与头像区域 -->
        <div class="background">
            <img src="https://portrait.gitee.com/uploads/avatars/user/2721/8165732_lastbzzb_1609261536.png!avatar100">
        </div>
        <!-- 菜单区域 -->
        <div id="user_menu" class="clear">
            <div id="option_menu">
                <el-button type="text" style="margin: 0 20px" @click="is_msg=true,is_record=false">主页</el-button>
                <el-button type="text" @click="is_msg=false,is_record=true">统计</el-button>
            </div>
            <span id="name" style="color:#606266;font-size:18px;display:inline-block;width: 16%;height: 70px;line-height: 70px">
                {{this.user_message_list.name}}
            </span>
            <div id="user_problem_msg">
                <span>提交</span><span>通过</span><span>排名</span>
                <span>{{this.user_message_list.submit_count}}</span>
                <span>{{this.user_message_list.accepted_count}}</span>
                <span v-if="this.user_message_list.rank === -1">无</span>
                <span v-else>{{this.user_message_list.rank}}</span>
            </div>
        </div>
        <!-- 基本信息 -->
        <div v-if="is_msg" id="user_msg">
            <div class="msg">用户名 : {{this.user_message_list.username}}</div>
            <div class="msg">邮箱 : {{this.user_message_list.email}}</div>
            <div class="msg">简介 : {{this.user_message_list.description}}</div>
        </div>
        <!-- 统计 -->
        <div v-if="is_record" id="user_record">
            统计
        </div>
        <!-- 侧边栏 -->
        <div id="user_msg_aside">
            <div class="msg">注册日期 : {{this.user_message_list.create_date}}</div>
            <div class="msg">最后登录日期 : {{this.user_message_list.last_date}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserCenter",
        data(){
            return {
                /** 开关信息页面 */
                is_msg: true,
                /** 开关统计页面 */
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
            /** 获取用户信息 */
            this.requestUserMessage();
        },

        methods: {
            /** 请求用户信息 */
            requestUserMessage(){
                if(this.$store.state.username !== ''){
                    axios.get(this.base_url + "/user/id/" + this.$store.state.username)
                    .then(res => {
                        if(res.data.status === 1){
                            this.user_message_list = res.data.data;
                        }
                    }).catch(err => {
                        this.$message.error(err);
                    })
                }

            }
        }

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
        height: 70px;
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
        height: 70px;
    }
    #user_msg,#user_record{
        float: left;
        margin-top: 10px;
        width: 60%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        padding: 20px;
        background-color: white;
    }
    #user_msg_aside{
        margin-top: 5px;
        float: right;
        width: 32%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        padding: 20px;
        background-color: white;
    }

    .msg{
        font-size: 16px;
        margin:  10px;
        color: #606266;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }

</style>
<style>

</style>
