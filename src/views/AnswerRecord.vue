<template>
  <div class="main">
    <div class="evaluation_record">
      <h1>
        评测记录
      </h1>
      <el-divider></el-divider>
      <div class="find_record">
        <h3>查找记录</h3>
        <div class="find clear">
          <span style="margin: 0 20px ;font-size: 18px">题号查找</span>
          <el-input
              class="choose"
              size="small"
              style="display: inline"
              placeholder="题目编号"
              v-model="input">
          </el-input>
        </div>
        <div class="find clear">
          <span style="margin: 0 20px ;font-size: 18px">账号查找</span>
          <el-input
              size="small"
              style="display: inline"
              placeholder="用户账号"
              v-model="input2">
          </el-input>
        </div>
        <div class="state_choose">
          <span style="margin: 0 20px ;font-size: 18px">状态筛选</span>
          <el-select v-model="value" size="small" @change="changeStatus(value)">
            <el-option v-for="state in options"
                       :key="state.value"
                       :label="state.label"
                       :value="state.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>

    <div class="find_list">
      <el-table
          :data="tableData"
          style="width: 100%">
        <el-table-column
            prop="user.username"
            width="120">
        </el-table-column>
        <el-table-column
            width="360">
          <template slot-scope="scope">
            {{ scope.row.problem.id }}. {{ scope.row.problem.title }}
          </template>
        </el-table-column>
        <el-table-column
            prop="status.id"
            width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.status.id===1">
              <el-tag effect="dark" color="#67C23A">Accepted</el-tag>
            </div>
            <div v-if="scope.row.status.id === 2">
              <el-tag effect="dark" color="#F56C6C">Wrong Answer</el-tag>
            </div>
            <div v-if="scope.row.status.id ===3">
              <el-tag effect="dark" color="#03651A">Running</el-tag>
            </div>
            <div v-if="scope.row.status.id ===4">
              <el-tag effect="dark" color="#0276BF">Compiling</el-tag>
            </div>
            <div v-if="scope.row.status.id ===5">
              <el-tag effect="dark" color="#EB5B05">Waiting</el-tag>
            </div>
            <div v-if="scope.row.status.id ===6">
              <el-tag effect="dark" color="#E6A23C">Compile Error</el-tag>
            </div>
            <div v-if="scope.row.status.id ===7">
              <el-tag effect="dark">Runtime Error</el-tag>
            </div>
            <div v-if="scope.row.status.id ===8">
              <el-tag effect="dark" color="#052242">Time Limit Exceeded</el-tag>
            </div>
            <div v-if="scope.row.status.id ===9">
              <el-tag effect="dark">Memory Limit Exceeded</el-tag>
            </div>
            <div v-if="scope.row.status.id ===10">
              <el-tag effect="dark">PE</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
            width="360">
          <template slot-scope="scope">
            <i class="el-icon-stopwatch" style="font-size: 18px"></i>{{ scope.row.time }}
            <i class="el-icon-coin" style="font-size: 18px"></i>{{ scope.row.memory }}
            <i class="el-icon-document" style="font-size: 18px"></i>{{ scope.row.language.name }}
          </template>
        </el-table-column>
        <el-table-column
            prop="submit_date">
        </el-table-column>
      </el-table>
      <div class="page" style="text-align: center">
        <el-divider></el-divider>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "AnswerRecord",
  beforeRouteEnter(to, from, next) {
    window.document.body.style.backgroundColor = '#EFEFEF';
    next();
  },
  data() {
    return {
      input: '',
      input2: '',
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
      tableData: [{
        id: -1,
        user: {
          username: '',
          name: ''
        },
        problem: {
          id: -1,
          title: ''
        },
        status: {
          id: -1,
          short_name: '',
          name: '',
        },
        time: 0,
        memory: 0,
        language: {
          id: -1,
          name: ''
        },
        submit_date: ''
      }
      ]
    }
  },
  created() {
    axios.get(this.base_url + "/solution")
        .then(res => {
          console.log("in");
          if (res.data.status === 1) {
            this.tableData = res.data.data;
          }
          if (res.data.status === 401) {
            this.$store.commit('logout');
            this.$router.go(0);
          }
        })
  },
  methods: {
    changeStatus(value) {
      if (value === "Accepted") {
        axios.get(this.base_url + "/solution?status_id=" + 1)
            .then(res => {
              console.log("in")
              if (res.data.status === 1) {
                this.tableData = res.data.data;
              }
            }).catch(err => {
          //请求失败时进入catch
          alert(err);
        });
      }

      if (value === "Wrong answer") {
        axios.get(this.base_url + "/solution?status_id=" + 2)
            .then(res => {
              console.log("in")
              if (res.data.status === 1) {
                this.tableData = res.data.data;
              }
            }).catch(err => {
          //请求失败时进入catch
          alert(err);
        });
      }

      if (value === "all") {
        axios.get(this.base_url + "/solution")
            .then(res => {
              console.log("in")
              if (res.data.status === 1) {
                this.tableData = res.data.data;
              }
            }).catch(err => {
          //请求失败时进入catch
          alert(err);
        });
      }
    }
  }
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
  padding: 10px;
  min-width: 800px;
  max-width: 1200px;
  height: 800px;
  margin: 0 auto;
}

.evaluation_record {
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

/deep/ .el-input__inner.el-input__inner {
  width: 250px !important;
}

.find {
  margin-top: 20px;
  width: 600px;
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


</style>
