<template>
    <div>
        <el-form :model="user_message" :rules="rules" ref="user_message" label-width="60px" key="res">
            <el-form-item label="账号" prop="username">
                <el-input v-model="user_message.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" show-password>
                <el-input v-model="user_message.password"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="name" @keyup.enter.native="register">
                <el-input v-model="user_message.name"></el-input>
            </el-form-item>
        </el-form>

        <div slot="footer" class="register-footer" key="res_btn">
            <el-button type="primary" @click="register">注册</el-button>
        </div>
    </div>
</template>

<script>
    import md5 from "js-md5";

    export default {
        name: "RegisterDialog",
        data() {
            return {
                user_message: {
                    username : '',
                    password : '',
                    name: '',
                },
                rules: {
                    username: [
                        { required: true,  message: '账号不能为空', trigger: 'blur' },
                        { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'},
                        { type : "string", pattern:/^[A-Za-z0-9]+$/ ,message: '用户名只能由数字和字符组成',trigger: 'blur'},

                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { min: 6, max: 18, message: '密码长度要在 6 到 18 个字符', trigger: 'blur' },
                        { type : "string", pattern:/^[A-Za-z0-9!"#$%&'()*+,\-./@\[\\\]^_`{|}~]+$/ ,message: '密码格式不正确',trigger: 'blur'},
                    ],
                    name:[
                        { required: true, message: '用户名不能为空',trigger: 'blur'},
                        { min: 1, max: 10,message: '长度在 1 到 10 个字符',trigger: 'blur'}
                    ]
                },
            }
        },
        methods:{
          register(){
              console.log('register');
              let username = this.user_message.username;
              let password = this.user_message.password;
              let name = this.user_message.name;
              password = md5( 'zkoj' + md5(username + password));
              let request_body = {
                  username: username,
                  password: password,
                  name: name
              };
              axios.post(this.base_url+"/register",request_body)
              .then(res => {
                  if (res.data.status === 1) {
                      //登陆成功
                      this.$store.commit('login', res.headers.authorization);
                      this.$emit('close');
                  } else {
                      alert(res.data.message);
                  }
              })
          }
        }
    }


</script>

<style scoped>
    .register-footer{
        text-align: center;
    }
</style>
