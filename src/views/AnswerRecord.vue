<template>
  <div class="main">
    <el-card shadow="hover">
      <div slot="header">
        <b style="font-size: 20px">查找评测记录</b>
      </div>
      <div>
        <div class="find clear">
          <span style="margin: 0 20px ;font-size: 18px">条件查找</span>
          <el-input
              class="choose"
              size="small"
              style="display: inline"
              placeholder="题目编号"
              v-model="inputProblemId"
              @change="changeProblemId">
          </el-input>
          <el-input
              size="small"
              style="display: inline"
              placeholder="用户名"
              v-model="inputUsername"
              @change="changeUsername">
          </el-input>
          <el-input
              size="small"
              style="display: inline"
              placeholder="评测ID"
              v-model="input_solution_id"
              @change="changeSolutionId">
          </el-input>
        </div>
        <div class="state_choose">
          <span style="margin: 0 20px ;font-size: 18px;display: inline-block">状态筛选</span>
          <el-select v-model="value" size="small" @change="changeStatus">
            <el-option v-for="state in options"
                       :key="state.value"
                       :label="state.label"
                       :value="state.value">
            </el-option>
          </el-select>
          <el-button type="text" @click="clearCondition" style="display: inline-block;margin: 0 20px;width: 150px;float: right"><strong>清除所有筛选条件</strong></el-button>
        </div>
      </div>
    </el-card>

    <div class="find_list">
      <el-table
          v-loading="is_loading_table"
          :data="record_list"
          style="width: 100%">
        <el-table-column
                prop="id"
                width="60">
        </el-table-column>
        <el-table-column
            prop="user.username"
            width="120">
          <template slot-scope="scope">
            <router-link :to='"/usercenter/" + scope.row.user.username'>
              <span style="color: #3a8ee6">{{ scope.row.user.username }}</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
            width="360">
          <template slot-scope="scope">
            <router-link :to='"/problem/" + scope.row.problem.id'>
              <span style="color: #3a8ee6">{{ scope.row.problem.id }}. {{ scope.row.problem.title }}</span>

            </router-link>

          </template>
        </el-table-column>
        <el-table-column
            prop="status.id"
            width="200">
          <template slot-scope="scope">
            <div v-if="scope.row.status.id === 1">
              <el-tag @click="showSolutionDetail(scope.row.id)" effect="dark" color="#67C23A">Accepted</el-tag>
            </div>
            <div v-if="scope.row.status.id === 2">
              <el-tag @click="showSolutionDetail(scope.row.id)" effect="dark" color="#F56C6C">Wrong Answer</el-tag>
            </div>
            <div v-if="scope.row.status.id === 3">
              <el-tag @click="showSolutionDetail(scope.row.id)" effect="dark" color="#409EFF">Running</el-tag>
            </div>
            <div v-if="scope.row.status.id === 4">
              <el-tag @click="showSolutionDetail(scope.row.id)" effect="dark" color="#409EFF">Compiling</el-tag>
            </div>
            <div v-if="scope.row.status.id === 5">
              <el-tag @click="showSolutionDetail(scope.row.id)" effect="dark" color="#409EFF">Waiting</el-tag>
            </div>
            <div v-if="scope.row.status.id === 6">
              <el-tag @click="showSolutionDetail(scope.row.id)" effect="dark" color="#E6A23C">Compile Error</el-tag>
            </div>
            <div v-if="scope.row.status.id === 7">
              <el-tag @click="showSolutionDetail(scope.row.id)" effect="dark" color="#E6A23C">Runtime Error</el-tag>
            </div>
            <div v-if="scope.row.status.id === 8">
              <el-tag @click="showSolutionDetail(scope.row.id)" effect="dark" color="#E6A23C">Time Limit Exceeded</el-tag>
            </div>
            <div v-if="scope.row.status.id === 9">
              <el-tag @click="showSolutionDetail(scope.row.id)" effect="dark" color="#E6A23C">Memory Limit Exceeded</el-tag>
            </div>
            <div v-if="scope.row.status.id === 10">
              <el-tag @click="showSolutionDetail(scope.row.id)" effect="dark" color="#E6A23C">PE</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
            min-width="220">
          <template slot-scope="scope">
            <span style="width: 80px;display: inline-block">
              <i class="el-icon-stopwatch" style="font-size: 18px"></i>
              {{ scope.row.time }}ms
            </span>
            <span style="width: 80px;display: inline-block">
              <i class="el-icon-coin" style="font-size: 18px"></i>
              {{ (scope.row.memory / 1024).toFixed(0)}}MB
            </span>
            <span style="width: 80px;display: inline-block">
              <i class="el-icon-document" style="font-size: 18px"></i>
              {{ scope.row.language.name }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
            width="160px"
            prop="submit_date">
        </el-table-column>
      </el-table>
      <div class="page" style="text-align: center">
        <el-divider></el-divider>
        <el-pagination
            background
            layout="prev, pager, next"
            :page-size="20"
            @current-change="handleCurrentChange"
            :total="100">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "AnswerRecord",
  beforeRouteEnter(to, from, next) {
    window.document.body.style.backgroundImage = 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)';
    next();
  },
  data() {
    return {
      inputProblemId: null,
      inputUsername: null,
      is_loading_table: true,
      input_solution_id: null,
      options: [
        {
          value: 'all',
          label: '全部状态'
        },
        {
          value: 'Accepted',
          label: '已完成',
        },
        {
          value: 'Wrong answer',
          label: '错误',
        },],
      value: '全部状态',
      /* 记录列表数据 */
      record_list: null,
      /* 请求url参数 */
      request_query: {
        page: 1,
        status_id: null,
        problem_id: null,
        username: null,
        solution_id: null
      },
      /** 定时任务对象 */
      interval: null,
    }
  },
  mounted() {
    document.title = '评测记录|ZKOJ';
    if(Boolean((new RegExp("problem_id").exec(location.href)))){
      /* 从题目详情页面进入默认显示该题的记录 */
      this.request_query.problem_id = this.$route.query.problem_id;
      this.inputProblemId = this.$route.query.problem_id;
      this.request_record_list();
    } else if(Boolean((new RegExp("username").exec(location.href)))){
      /* 登录状态时进入默认显示该用户的记录 */
      this.request_query.username = this.$route.query.username;
      this.inputUsername = this.$route.query.username;
      this.request_record_list();
    } else if(Boolean((new RegExp("solution_id").exec(location.href)))) {
      this.request_query.solution_id = this.$route.query.solution_id;
      this.input_solution_id = this.$route.query.solution_id;
      this.interval = setInterval(this.timingRequest, 3000);
    } else {
      /* 显示所有记录 */
      this.request_record_list();
    }
  },
  methods: {

    /* 请求测评列表 */
    request_record_list() {
      let query = {};
      this.is_loading_table = true;
      Object.keys(this.request_query).forEach(key => {
        if (this.request_query[key] !== null && this.request_query[key] !== ''){
          query[key] = this.request_query[key];
        }
      })
      axios.get(this.base_url + "/solution", {params: query})
      .then(res => {
        if (res.data.status === 1){
          this.record_list = res.data.data;
          this.is_loading_table = false;
        }
      })
      .catch(err => {
        this.$message.error(err);;
        this.is_loading_table = false;
      })
    },
    /* 状态筛选 */
    changeStatus(value){
      let temp = {"Accepted": 1, "Wrong answer": 2, "all": null}
      this.request_query.status_id = temp[value];
      this.request_record_list();
    },
    /* 题号筛选 */
    changeProblemId(value){
      this.request_query.problem_id = value;
      this.request_record_list();
    },
    /* 用户名筛选 */
    changeUsername(value){
      this.request_query.username = value;
      this.request_record_list();
    },
    /** 评测ID筛选 */
    changeSolutionId(value) {
      this.request_query.solution_id = value;
      this.request_record_list();
    },
    handleCurrentChange(val){
      this.request_query.page = val;
      this.request_record_list();
    },
    /* 清空筛选条件 */
    clearCondition(){
      this.is_loading_table = true;
      this.inputProblemId = "";
      this.inputUsername = "";
      this.value = "全部状态";
      axios.get(this.base_url + "/solution")
      .then(res => {
        this.record_list = res.data.data;
        this.is_loading_table = false;
      }).catch(err => {
        this.$message.error(err);;
        this.is_loading_table = false;
      })
    },
    showSolutionDetail(id){
      let routerJump = this.$router.resolve('/solution/' + id);
      window.open(routerJump.href, '_blank');
    },
    /** 定时获取结果 */
    timingRequest() {
      let continue_id = [3,4,5]
      if(this.record_list !== null) {
        if(continue_id.indexOf(this.record_list[0].status.id) < 0) {
          clearInterval(this.interval);
          return;
        }
      }
      this.request_record_list();
    }
  }
}
</script>

<style scoped>

a{
  text-decoration: none;
}

.clear::before,
.clear::after {
  content: '';
  display: table;
  clear: both;
}


.main {
  padding: 10px;
  min-width: 800px;
  max-width: 1200px;
  margin: 0 auto;
}

.evaluation_record {
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

/deep/ .el-input__inner.el-input__inner {
  margin: 0 5px;
  width: 180px !important;
}

.find {

  width: 800px;
}

.state_choose {
  margin-top: 20px;
}

.find_list {
  margin-top: 30px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.el-tag:hover {
  cursor: pointer;
}

</style>
