<template>
    <div class="main">
        <div class="option">
            <h2>用户设置</h2>
            <el-divider class="line"></el-divider>
            <el-form :model="user_message" ref="user_message" label-width="80px">
                <el-form-item label="名称" prop="username">
                    <el-input v-model="user_message.name"></el-input>
                </el-form-item>
                <el-form-item label="原密码" prop="password">
                    <el-input v-model="user_message.password"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="new_password">
                    <el-input v-model="user_message.new_password"></el-input>
                </el-form-item>
                <el-form-item label="再次输入" prop="new_password_again">
                    <el-input v-model="user_message.new_password_again"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="user_message.email"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="new_password_again">
                    <el-input
                            style="width: 50%"
                            type="textarea"
                            resize="none"
                            :autosize="{ minRows: 4, maxRows: 6}"
                            placeholder="请输入简介"
                            v-model="user_message.introduction">
                    </el-input>
                </el-form-item>
            </el-form>

            <div class="save">
                <el-button type="primary" @click="changeSave">保存修改</el-button>
            </div>
            <!--            <el-divider class="line"></el-divider>-->
            <!--            <div class="row">-->
            <!--                <p><strong>名称</strong></p>-->
            <!--                <el-input v-model="input" placeholder="请输入新的名称"></el-input>-->
            <!--            </div>-->
            <!--            <div class="row">-->
            <!--                <p><strong>原密码</strong></p>-->
            <!--                <el-input v-model="input" placeholder="原密码"></el-input>-->
            <!--                <p><strong>新密码</strong></p>-->
            <!--                <el-input v-model="input" placeholder="新密码"></el-input>-->
            <!--                <p><strong>再次输入新密码</strong></p>-->
            <!--                <el-input v-model="input" placeholder="再次输入新密码"></el-input>-->
            <!--            </div>-->
            <!--            <div class="row">-->
            <!--                <p><strong>邮箱</strong></p>-->
            <!--                <el-input v-model="input" placeholder="请输入新的邮箱"></el-input>-->
            <!--            </div>-->
            <!--            <div class="row">-->
            <!--                <p><strong>简介</strong></p>-->
            <!--                <el-input-->
            <!--                        style="width: 50%"-->
            <!--                        type="textarea"-->
            <!--                        resize="none"-->
            <!--                        :autosize="{ minRows: 4, maxRows: 6}"-->
            <!--                        placeholder="请输入简介"-->
            <!--                        v-model="textarea">-->
            <!--                </el-input>-->
            <!--            </div>-->
        </div>
    </div>
</template>

<script>
    import md5 from "js-md5";

    export default {
        name: "UserOptions",
        beforeRouteEnter(to, from, next) {
            window.document.body.style.backgroundColor = '#EFEFEF';
            next();
        },
        data() {
            return {
                user_message: {
                    name: '',
                    password: '',
                    new_password: '',
                    new_password_again: '',
                    email: '',
                    introduction: ''
                }
            }
        },
        methods: {
            changeSave() {
                console.log('changeSave');
                let name = this.user_message.name;
                let password = this.user_message.password;
                let email = this.user_message.email;
                let new_password = this.user_message.new_password;
                let new_password_again = this.user_message.new_password_again;
                let introduction = this.user_message.introduction;
                // if(new_password !== ""){
                //     new_password = md5( 'zkoj' + md5(username + new_password));
                // }

                let request_body = {
                    name: name,
                    // email: email,
                    // introduction: introduction

                }

                axios.put(this.base_url+"/user",request_body)
                    .then(res =>{
                        if(res.data.status ===1){
                            alert("保存成功");
                        }
                    })
            }
        }
    }
</script>

<style scoped>
    .main {
        padding-top: 20px;
        background-color: white;
        margin: 0 auto;
        min-width: 800px;
        width: 1000px;
        max-width: 1200px;
        height: 800px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

    .option {
        margin: 20px auto;
        width: 800px;
    }

    .line {
        margin-top: 10px !important;
        margin-bottom: 10px !important;
    }

    /deep/ .el-input__inner.el-input__inner {
        width: 30% !important;
    }

    .save {
        padding-top: 20px;
        text-align: center;
        padding-bottom: 20px;
    }
</style>
