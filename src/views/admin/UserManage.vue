<template>
    <div class="main">
        <div id="user_screen">
            <!-- 搜索用户区域 -->
            <div id="search_screen">
                <span>搜索用户 : </span>
                <el-input v-model="search_user" @change="searchUser" size="small" placeholder="输入用户名" style="width: 400px"></el-input>
                <el-button type="primary" size="small" style="display: inline-block;margin: 0 20px" @click="searchUser">搜索</el-button>
                <el-divider></el-divider>
            </div>
            <!-- 权限与账号状态区域 -->
            <div id="role_status">
                <span>身份</span>
                <el-select size="small" v-model="value_role" @change="chooseRole">
                    <el-option
                            :key="null"
                            label="全部权限"
                            :value=null>
                    </el-option>
                    <el-option
                            v-for="item in role_list"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
                <span>状态</span>
                <el-select size="small" v-model="value_status" @change="chooseUserStatus">
                    <el-option
                            v-for="item in status_list"
                            :key="item.value_status"
                            :label="item.label"
                            :value="item.value_status">
                    </el-option>
                </el-select>
                <br><br>
                <el-button @click="clearScreen" type="text" style="display: inline-block;margin: 0 20px;float: right"><strong>清除所有筛选项</strong></el-button>
                <span>修改状态</span>
                <el-select size="small" v-model="change_value_status" @change="setStatusType">
                    <el-option
                            v-for="item in change_status_list"
                            :key="item.change_value_status"
                            :label="item.change_label"
                            :value="item.change_value_status">
                    </el-option>
                </el-select>
                <el-button @click="changeStatus" type="primary" size="small" style="display: inline-block;margin: 0 20px">修改所有选择用户状态</el-button>
            </div>
        </div>
        <!-- 用户列表区域 -->
        <div id="user_table">
            <el-table
                    ref="multipleTable"
                    v-loading="is_loading_table"
                    :data="user_list"
                    stripe
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        :selectable="selectRule"
                        width="55">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="用户类型"
                        width="140">
                    <template slot-scope="scope">
                       <div v-if="scope.row.role_id === 1">
                           NORMAL
                       </div>
                        <div v-if="scope.row.role_id === 0">
                            SUPER_ADMIN
                        </div>
                        <div v-if="scope.row.role_id === 2">
                            ADMIN
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="用户id"
                        width="80">
                    <template slot-scope="scope">
                        {{scope.row.id}}
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="账号"
                        width="160">
                    <template slot-scope="scope">
                        {{scope.row.username}}
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label=昵称
                        width="160">
                    <template slot-scope="scope">
                        {{scope.row.name}}
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="最后登录ip"
                        width="140">
                    <template slot-scope="scope">
                        {{scope.row.lastIp}}
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="最后登录时间"
                        width="160">
                    <template slot-scope="scope">
                        {{scope.row.lastDate}}
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="状态"
                        width="60">
                    <template slot-scope="scope">
                        <div v-if="scope.row.status === 1">正常</div>
                        <div v-if="scope.row.status === 0">禁用</div>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        width="100">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.role_id !== 0" size="small" type="primary" @click="open_role_dialog = true,scope.row.username = modify_role_username">修改权限</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        width="100">
                    <template slot-scope="scope">
                        <el-button size="small" type="danger" @click="open_password_dialog = true,scope.row.id = modify_password_id">修改密码</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 修改密码对话框 -->
            <el-dialog title="修改密码" :visible.sync="open_password_dialog" style="width: 1000px;margin: 0 auto">
                <el-form :model="password_form">
                    <el-form-item  label="新密码 : " >
                        <el-input v-model="password_form.new_password" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="open_password_dialog = false">取 消</el-button>
                    <el-button type="primary" @click="modifyPassword">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 修改权限对话框 -->
            <el-dialog title="修改权限" :visible.sync="open_role_dialog" style="width: 1000px;margin: 0 auto">
                <div style="text-align: center">
                    <el-radio-group v-model="Role">
                        <el-radio  label="1" @change="setRole">NORMAL</el-radio>
                        <el-radio  label="2" @change="setRole">ADMIN</el-radio>
                    </el-radio-group>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="open_role_dialog = false">取 消</el-button>
                    <el-button type="primary" @click="modifyRole">确 定</el-button>
                </div>
            </el-dialog>
            <!-- 分页区域 -->
            <div style="text-align: center;background-color: white;margin: 20px 0;height: 50px;line-height: 50px">
                <el-pagination
                        :page-sizes="[50,100,150,200]"
                        :page-size="request_query.limit"
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                        background
                        layout="prev, pager, next, sizes, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserManage",
        data(){
            return {
                /** 列表加载 */
                is_loading_table: false,
                /** 用户列表 */
                user_list: null,
                /** 数据条数 */
                total: null,
                /** 权限列表 */
                role_list: null,
                /** 输入框内容 */
                search_user: '',
                /** 身份筛选 */
                value_role: null,
                /** 账号状态 */
                status_list: [{
                    value_status: null,
                    label: "全部状态"
                },{
                    value_status: "1",
                    label: "正常"
                },{
                    value_status: "0",
                    label: "禁用"
                }],
                value_status: '全部状态',
                /** 修改状态 */
                status_selection_list: [],
                change_status_type: 1,
                /**  修改状态 */
                change_status_list: [{
                    change_value_status: 1,
                    change_label: "正常"
                },{
                    change_value_status: 0,
                    change_label: "禁用"
                }],
                change_value_status: '正常',
                /** 修改密码对话框 */
                open_password_dialog: false,
                modify_password_id: null,
                password_form:{
                    new_password: '',
                },
                /** 修改权限对话框 */
                open_role_dialog: false,
                modify_role_username: null,
                role: null,
                /** 请求参数列表 */
                request_query:{
                    page: 1,
                    limit: 50,
                    search: null,
                    role_id: null,
                    status: null
                }
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
                this.is_loading_table = true;
                let query = {};
                Object.keys(this.request_query).forEach(key => {
                    if (this.request_query[key] !== null) {
                        query[key] = this.request_query[key];
                    }
                })
                axios.get(this.base_url + "/manage/user", {params: query})
                .then(res => {
                    if(res.data.status === 1){
                        this.user_list = res.data.data.user_list;
                        this.total = res.data.data.count;
                        this.is_loading_table = false;
                    } else {
                        alert(res.data.message);
                        this.is_loading_table = false;
                    }
                }).catch(err => {
                    this.$message.error(err);
                    this.is_loading_table = false;
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
            },
            /** 权限筛选 */
            chooseRole(value){
                this.request_query.role_id = value;
                this.requestUserList();
            },
            /** 账号状态筛选 */
            chooseUserStatus(value){
                this.request_query.status_id = value;
                this.requestUserList();
            },
            /** 搜索用户 */
            searchUser(){
                this.request_query.search = this.search_user;
                this.requestUserList();
            },
            /** 修改用户状态 */
            setStatusType(value){
                this.change_status_type = value;
            },
            changeStatus(){
              for(let i = 0;i < this.$refs.multipleTable.selection.length;i++){
                  this.status_selection_list.push(this.$refs.multipleTable.selection[i].username);
              }
                let query = {
                    type: this.change_status_type,
                    username_list: this.status_selection_list
                }
              axios.put(this.base_url + "/user/status", query)
                .then(res => {
                    if(res.data.status === 1){
                        this.$router.go(0);
                        this.$message.success("修改成功");
                    } else {
                        alert(res.data.message);
                    }
                }).catch(err => {
                    this.$message.error(err);
              })
            },
            /** 修改权限 */
            setRole(value){
                alert(value);
                this.role = value;
            },
            modifyRole(){
                let query = {
                    username: this.modify_role_username,
                    role_id: this.role,
                }
                axios.put(this.base_url + "/user/role" + query)
                    .then(res => {
                        if(res.data.status === 1){
                            this.$router.go(0);
                            this.$message.success("修改成功");
                        } else {
                            alert(res.data.message);
                        }
                    }).catch(err => {
                    this.$message.error(err);
                })
            },
            /** 修改密码 */
            modifyPassword(){

            },
            /** 清空筛选 */
            clearScreen(){
                this.request_query.search = null;
                this.request_query.role_id = null;
                this.request_query.status = null;
                this.requestUserList();
            },
            /** 禁止冻结超级管理员 */
            selectRule(row){
                if(row.role_id ===1){
                    return true;
                }
            },
            /** 每一页数据条数 */
            handleSizeChange(val) {
                this.request_query.limit = val;
                this.requestUserList();
            },
            /** 换页 */
            handleCurrentChange(val) {
                this.request_query.page = val;
                this.requestUserList();
            },

        },
    }
</script>

<style scoped>

    .main{
        margin: 0 auto;
        min-width: 800px;
        width: 1200px;
        padding: 20px;
    }
    #user_table{
        margin-top: 20px;
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
