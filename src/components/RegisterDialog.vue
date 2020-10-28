<template>
    <div>
        <el-form :model="user_message" :rules="rules" ref="user_message" label-width="60px">

            <el-form-item label="账号" prop="username">
                <el-input v-model="user_message.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="user_message.password"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="name">
                <el-input v-model="user_message.name"></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="register-footer ">
            <el-button type="primary">注册</el-button>
        </div>
    </div>
</template>

<script>
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
                        {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'},
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
        }
    }


</script>

<style scoped>
    .register-footer{
        text-align: center;
    }
</style>