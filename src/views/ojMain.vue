<template>
    <div class="main">
        <el-container>

            <el-header>
                <div class="nav clear">
                    <p class="title">仲恺农业工程学院OJ </p>
                    <el-button
                            type="text"
                            class="btn"
                            href="javascript:;"
                            :underline="false"
                            target="_blank"
                            @click="dialogFormVisible = true">
                        注册
                    </el-button>
                    <span>|</span>
                    <el-button
                            type="text"
                            class="btn"
                            href="javascript:;"
                            :underline="false"
                            target="_blank"
                            @click="dialogFormVisible = true">
                        登录
                    </el-button>
                    <el-dialog title="欢迎使用仲恺OJ" :visible.sync="dialogFormVisible" center>
                        <el-form :model="user_message">
                            <el-form-item label="学号" :label-width="userLabelWidth">
                                <el-input v-model="user_message.id" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" :label-width="userLabelWidth">
                                <el-input v-model="user_message.password" auto-complete="off"></el-input>
                            </el-form-item>

                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                            </div>
                        </el-form>
                        <div slot="footer" class="dialog-footer ">
                            <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
                            <el-button  @click="dialogFormVisible = false">取消</el-button>
                        </div>
                    </el-dialog>
                </div>
            </el-header>

            <el-main>
                <div class="question-main">
                    <div class="line"></div>
                    <div class="question-bar">
                        <div class="search">
                            <el-input v-model="input" placeholder="搜索题目名称或编号"></el-input>
                        </div>

                        <el-dropdown>
                         <span class="el-dropdown-link">
                            难度<i class="el-icon-arrow-down el-icon--right"></i>
                         </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>简单</el-dropdown-item>
                                <el-dropdown-item>中等</el-dropdown-item>
                                <el-dropdown-item>困难</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>

                        <el-dropdown>
                         <span class="el-dropdown-link">
                            状态<i class="el-icon-arrow-down el-icon--right"></i>
                         </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>解决</el-dropdown-item>
                                <el-dropdown-item>未完成</el-dropdown-item>
                                <el-dropdown-item>尝试过</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>

                    <div class="question-line"></div>
                    <el-table
                            :data="tableData"
                            style="width: 100%"
                            :row-class-name="tableRowClassName">

                        <el-table-column
                                prop="id"
                                label="题号"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="题目"
                                width="180">
                            <template slot-scope="scope">
                                <a href="http://localhost:8080/question" target="_blank">
                                    {{scope.row.name}}
                                </a>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="difficulty"
                                label="难度">
                        </el-table-column>
                    </el-table>

                </div>
            </el-main>

            <el-footer>
                <div class="page">
                    <div class="page-line"></div>
                    <el-pagination
                            @current-change="handleCurrentChange"
                            page-size="10"
                            background
                            layout="prev, pager, next"
                            :total="50">
                    </el-pagination>
                </div>
            </el-footer>

        </el-container>
    </div>
</template>

<script>

    export default {
        name: "main",

        data() {
            return {
                input: '',
                tableData: [],
                dialogFormVisible: false,
                user_message: {
                    id: '',
                    password: '',
                },
                userLabelWidth: '120px'
            }
        },
        created() {
            this.handleCurrentChange(1);
        },
        methods: {

            res() {

            },

            login() {

            },

            handleCurrentChange(val) {
                const item = [
                    {
                        id: '1',
                        name: 'A+B',
                        difficulty: 'easy'
                    },
                    {
                        id: '2',
                        name: 'A+B2',
                        difficulty: 'normal'
                    },
                    {
                        id: '3',
                        name: 'A+B3',
                        difficulty: 'difficult'
                    }
                ];

                this.tableData = Array(10).fill(item[val - 1]);
            },

            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            },

        },

    }

</script>

<style scoped>


    .clear::before,
    .clear::after {
        content: '';
        display: table;
        clear: both;
    }

    .main {
        font-size: 20px;
        min-width: 800px;
        margin: 0 auto;
        width: 80%;
        border: black solid 1px;
    }

    .el-header {
        padding: 0;
        height: auto !important;

    }

    .nav {
        line-height: 76px;
        width: 100%;
        background-color: #E8E7E3;
        font-size: 16px;
    }

    .title {
        float: left;
        color: #7e8c8d;
        margin-left: 20px;
        margin-right: 0px;
        font-size: 40px;
    }

    span {
        float: right;
        display: inline-block;
    }

    .btn {
        margin-top: 16px;
        display: inline-block;
        font-size: 16px;
        float: right;
        width: 120px;
        color: black !important;
        box-sizing: border-box;
    }


    .btn:hover {
        color: grey !important;
    }

    .line {
        border-bottom: 1px solid #e4eaf1;
        background: -webkit-gradient(linear, left top, left bottom, from(white), to(#f7f7f7));
        background: -o-linear-gradient(white, #f7f7f7);
        background: linear-gradient(white, #f7f7f7);
        height: 7px;
        z-index: -3;
        margin-bottom: 20px;
    }

    .search {
        float: left;
        width: 70%;
    }

    .el-dropdown {
        box-sizing: border-box;
        display: block;
        height: 40px;
        line-height: 40px;
        width: 80px;
        float: left;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: black;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    .question-line {
        width: 100%;
        height: 30px;
        float: left;
    }

    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }

    .el-footer {
        background: #F5F5F5;
    }

    .page-line {
        border-bottom: #DDDDDD 1px solid;
        margin-bottom: 12px;
    }

    el-pagination {
        background-color: #42b983;
    }
</style>