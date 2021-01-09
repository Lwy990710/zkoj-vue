<template>
    <div class="main">
        <div id="user_screen">
            <div id="search_screen">
                <span>搜索用户 : </span>
                <el-input size="small" placeholder="输入用户名" style="width: 400px"></el-input>
                <el-button type="primary">搜索</el-button>
                <el-divider></el-divider>
            </div>
            <div id="role_status">
                <span>身份</span>
                <el-select size="small" v-model="value_role">
                    <el-option
                            v-for="item in role_list"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
                <span>状态</span>
                <el-select size="small" v-model="value_status">
                    <el-option
                            v-for="item in status_list"
                            :key="item.value_status"
                            :label="item.label"
                            :value="item.value_status">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div id="user_table">
            <el-table
                    :data="user_list"
                    stripe
                    style="width: 100%">
                <el-table-column
                        align="center"
                        label="用户类型"
                        min-width="120"
                        width="180"
                        max-width="360">
                    <template slot-scope="scope">
                       <div v-if="scope.row.role_id === 1">
                           学生
                       </div>
                        <div v-if="scope.row.role_id === 0">
                            超级管理员
                        </div>
                        <div v-if="scope.row.role_id === 2">
                            管理员
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="用户id"
                        min-width="120"
                        width="180"
                        max-width="360">
                    <template slot-scope="scope">
                        {{scope.row.id}}
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="账号"
                        min-width="120"
                        width="180"
                        max-width="360">
                    <template slot-scope="scope">
                        {{scope.row.username}}
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label=昵称
                        min-width="120"
                        width="180"
                        max-width="360">
                    <template slot-scope="scope">
                        {{scope.row.name}}
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="状态"
                        min-width="120">
                    <template slot-scope="scope">
                        <div v-if="scope.row.status === 1">正常</div>
                        <div v-if="scope.row.status === 0">禁用</div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserManage",
        data(){
            return {
                /** 用户列表 */
                user_list: null,
                /** 数据条数 */
                total: null,
                /** 权限列表 */
                role_list: null,
                /** 身份筛选 */
                value_role: '全部身份',
                /** 账号状态 */
                status_list: [{
                    value_status: "1",
                    label: "正常"
                },{
                    value_status: "0",
                    label: "禁用"
                },{
                    value_status: null,
                    label: "全部状态"
                }],
                value_status: "全部状态",
            }
        },
        created() {
            /** 获取用户列表 */
            this.requestUserList();
            /** 获取权限列表 */
            this.requestRoleList();
        },
        methods: {
            /** 获取用户列表 */
            requestUserList(){
                axios.get(this.base_url + "/manage/user")
                .then(res => {
                    if(res.data.status === 1){
                        this.user_list = res.data.data.user_list;
                        this.total = this.data.data.count;
                    } else {
                        alert(res.data.message);
                    }
                }).catch(err => {
                    this.$message.error(err);
                })
            },
            /** 获取权限列表 */
            requestRoleList(){
                axios.get(this.base_url + "/role")
                .then(res => {
                    if(res.data.status === 1){
                        this.role_list = res.data.data.role_list;
                    } else {
                        alert(res.data.message);
                    }
                }).catch(err => {
                    this.$message.error(err);
                })
            }
        },
    }
</script>

<style scoped>

    .main{
        margin: 0 auto;
        min-width: 800px;
        width: 1200px;
        max-width: 1200px;
    }
    #user_table{
        margin: 20px auto;
        background-color: white;
        width: 100%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    #user_screen{
        padding: 20px;
        background-color: white;
        width: 1160px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    #user_screen span{
        text-align: center;
        width: 80px;
        display: inline-block;
        font-size: 14px
    }

    #role_status{

    }
</style>
