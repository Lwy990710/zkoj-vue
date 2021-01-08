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
                <el-button type="text" style="margin: 0 20px" @click="is_msg=false,is_record=true">统计</el-button>
                <el-button @click="option" v-if="this.$route.params.username === this.$store.state.username" style="margin: 0 20px" type="text">设置</el-button>

            </div>
            <span id="name" style="color:#606266;font-size:18px;display:inline-block;width: 16%;height: 70px;line-height: 70px">
                {{user_message_list.name}}
            </span>
            <div id="user_problem_msg">
                <span>提交</span><span>通过</span><span>排名</span>
                <span>{{user_message_list.submit_count}}</span>
                <span>{{user_message_list.accepted_count}}</span>
                <span v-if="user_message_list.rank === -1">无</span>
                <span v-else>{{user_message_list.rank}}</span>
            </div>
        </div>
        <!-- 基本信息 -->
        <div v-if="is_msg" id="user_msg">
            <div class="msg">用户名 : {{user_message_list.username}}</div>
            <div class="msg">邮箱 : {{user_message_list.email}}</div>
            <div class="msg" >简介 : </div>
            <div class="msg description" v-if="typeof user_message_list.description == null">
                <div @click="check"  v-if="!change_description">这个人很懒，什么都没写</div>
                <el-input
                        @blur="check"
                        v-model="new_description"
                        v-if="change_description"
                        aria-placeholder="编辑简介"
                        type="textarea" resize="none"
                        :autosize="{minRows: 6, maxRows: 6}"
                        style="width: 600px">
                </el-input>
            </div>
            <div class="msg description" v-else>
                <div @click="check"  v-if="!change_description">{{user_message_list.description}}</div>
                <el-input
                        @blur="check"
                        v-model="new_description"
                        v-if="change_description"
                        aria-placeholder="编辑简介"
                        type="textarea" resize="none"
                        :autosize="{minRows: 6, maxRows: 6}"
                        style="width: 600px">
                </el-input>
            </div>
        </div>
        <!-- 统计 -->
        <div v-if="is_record" id="user_record">
            <div class="msg">做过的题 : </div>
            <div class="msg">
                <router-link :to='"/problem/" + item.problem_id' v-for="item in submit_problem_list" :key="item.problem_id">
                    [{{item.problem_id}}]
                </router-link>
            </div>
            <div class="msg">完成的题 : </div>
            <div class="msg">
                <router-link :to='"/problem/" + item.problem_id' v-for="item in accepted_problem_list" :key="item.problem_id">
                    [{{item.problem_id}}]
                </router-link>
            </div>
        </div>
        <!-- 侧边栏 -->
        <div id="user_msg_aside">
            <div class="msg">注册日期 : {{user_message_list.create_date}}</div>
            <div class="msg">最后登录日期 : {{user_message_list.last_date}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserCenter",
        data(){
            return {
                /** 修改简介 */
                change_description: false,
                new_description: '',
                /** 开关信息页面 */
                is_msg: true,
                /** 开关统计页面 */
                is_record: false,
                /** 用户信息列表 */
                user_message_list: null,
                /** 提交问题列表 */
                submit_problem_list: null,
                /** 通过问题列表 */
                accepted_problem_list: null,
            }
        },
        beforeRouteEnter(to, from, next) {
            window.document.body.style.backgroundImage = 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)';
            next();
        },
        created() {
            /** 获取用户信息 */
            this.requestUserMessage();
            /** 获取用户做题信息 */
            this.getUserProblemCount();
        },

        methods: {
            /** 请求用户信息 */
            requestUserMessage(){
                    axios.get(this.base_url + "/user/id/" + this.$route.params.username)
                    .then(res => {
                        if(res.data.status === 1){
                            this.user_message_list = res.data.data;
                        }
                    }).catch(err => {
                        this.$message.error(err);
                    })
            },

            getUserProblemCount(){
              let query = {username: this.$route.params.username};
              axios.get(this.base_url + "/user/count/problem",{params: query})
                .then(res => {
                    if(res.data.status === 1){
                        this.submit_problem_list = res.data.data.submit_problem_list;
                        this.accepted_problem_list = res.data.data.accepted_problem_list;
                    } else {
                        alert(res.data.message)
                    }
                }).catch(err => {
                    this.$message.error(err);
              })
            },

            /** 在用户自己的个人页面可编辑简介 */
            check(){
                this.change_description = !this.change_description;
                let query = {description: this.new_description}
                if(this.new_description !== ''){
                    axios.put(this.base_url + "/user", query)
                    .then(res => {
                        if(res.data.status === 1){
                            alert("修改成功");
                            this.$router.go(0);
                        } else {
                            alert(res.data.message);
                        }
                    }).catch(err => {
                        this.$message.error(err);
                    })
                    this.requestUserMessage();
                }
            },
            /** 跳转设置页面 */
            option(){
                this.$router.push("/option/" + this.$store.state.username);
            }
        }

    }
</script>

<style scoped>

    a{
        text-decoration: none;
        display: inline-block;
        width: 50px;
        height: 20px;
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

    #user_record span{
        display: inline-block;
        font-size: 14px;
        width: 40px;
        height: 20px;
        line-height: 20px;
        color: #606266;
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

    .description{
        text-indent: 2em;
    }
</style>
<style>

</style>
