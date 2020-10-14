<template>
    <div class="main">

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
                          prop="title"
                          label="题目"
                          width="180">
                      <template slot-scope="scope">
                          <a href="http://localhost:8080/question" target="_blank">
                              {{scope.row.title}}
                          </a>
                      </template>
                  </el-table-column>
                  <el-table-column
                          prop="difficulty"
                          label="难度">
                  </el-table-column>
              </el-table>

          </div>

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
            //发起get请求
            axios.get("http://yapi.yukineko.top/mock/16/zkoj/question?page=1")
              .then(res => {
                console.log("in")
                //请求成功时进入then(HTTP状态码为200)
                if(res.data.status === 0) {
                  this.tableData = res.data.data;
                  console.log("in")
                  console.log(this.tableData)
                }
              })
              .catch(err => {
                //请求失败时进入catch
              });
        },
        methods: {

            res() {

            },

            login() {

            },

            handleCurrentChange(val) {
              axios.get("http://yapi.yukineko.top/mock/16/zkoj/question?page=" + val)
                  .then(res => {
                    console.log("in")
                    //请求成功时进入then(HTTP状态码为200)
                    if(res.data.status === 0) {
                      this.tableData = res.data.data;
                      console.log("in")
                      console.log(this.tableData)
                    }
                  })
                  .catch(err => {
                    //请求失败时进入catch
                  });
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
        /*border: black solid 1px;*/
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

    .page-line {
        border-bottom: #DDDDDD 1px solid;
        margin-bottom: 12px;
    }

    el-pagination {
        background-color: #42b983;
    }
</style>