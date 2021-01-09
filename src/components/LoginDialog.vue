<template>
    <div>
        <div>
            <el-form :model="user_message" :rules="rules" label-width="60px" >
                <el-form-item label="账号" prop="username">
                    <el-input v-model="user_message.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="user_message.password" show-password></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer ">
            <el-button type="primary" @click="login">登录</el-button>
        </div>
    </div>
</template>

<script>
    import md5 from 'js-md5';

    export default {
        name: "LoginDialog",
        data() {
            return {
                user_message: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        {required: true, message: '账号不能为空', trigger: 'blur'},
                        {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'},
                        {type: "string", pattern: /^[A-Za-z0-9]+$/, message: '用户名只能由数字和字符组成', trigger: 'blur'},

                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                        {min: 6, max: 18, message: '密码长度要在 6 到 18 个字符', trigger: 'blur'},
                        {
                            type: "string",
                            pattern: /^[A-Za-z0-9!"#$%&'()*+,\-./@\[\\\]^_`{|}~]+$/,
                            message: '密码格式不正确',
                            trigger: 'blur'
                        },
                    ],
                }
            }
        },
        methods: {
            login() {
                this.getName();
                let name = '';
                let username = this.user_message.username;
                let password = this.user_message.password;
                this.$store.commit('setUsername', username);
                password = md5('zkoj' + md5(username + password))
                let request_body = {
                    username: username,
                    password: password
                };

                axios.post(this.base_url + "/login", request_body)
                    .then(res => {
                        if (res.data.status === 1) {
                          let payload = {
                            token: res.headers.authorization,
                            username: username,
                            name: res.data.data.name,
                            role: res.data.data.role
                          }
                            this.$store.commit('login', payload);
                            //登陆成功
                            this.$router.go(0);
                        } else {
                            alert(res.data.message);
                        }
                    })
                    .catch(err => {
                        this.$message.error(err);;
                    });
            },
            getName(){
                let name = '';
                let username = this.user_message.username;
                axios.get(this.base_url + "/user/id/" + username)
                    .then(res => {
                        if (res.data.status === 1) {
                            name = res.data.data.name;
                            this.$store.commit('setName', name);
                            return false;
                        } else {
                            alert(res.data.message);
                        }
                    }).catch(err => {
                    this.$message.error(err);
                })

            }
        }
    }
</script>

<style scoped>

    .dialog-footer {

        text-align: center !important;
    }
</style>
