<template>
  <div class="main clear">

    <div class="msg_main" v-loading="is_loading_table">
      <el-card body-style="{ padding-top: 0px }" shadow="hover">
        <el-tabs value="solution_message">
          <el-tab-pane label="评测信息" name="solution_message">
            <div style="font-size: 14px; line-height: 32px">
              <div>
                <span>内存消耗：</span>
                <b>{{ (solutionDetailData.memory / 1024).toFixed(2) }} MB</b>
              </div>
              <div>
                <span>执行耗时：</span>
                <b>{{ (solutionDetailData.time / 1000).toFixed(3) }} S</b>
              </div>
              <div v-show="'error_message' in solutionDetailData">
                <span>错误信息：</span>
                <div>
                  {{ solutionDetailData.error_message }}
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="源代码" name="source_code">
            <div>
              <highlightjs autodetect :code="solutionDetailData.source_code"/>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>

    <el-card id="submit_msg" shadow="hover" v-loading="is_loading_table">
      <div>
        <span>题目：</span>
        <router-link class="hyperlink" style="float: right" :to='"/problem/" + solutionDetailData.problem.id'>
          {{ solutionDetailData.problem.title }}
        </router-link>
      </div>
      <div>
        <span>用户：</span>
        <router-link class="hyperlink" style="float: right" :to='"/userhome"'>
          {{ solutionDetailData.user.name }}
        </router-link>
      </div>
      <div>
        <span>评测状态：</span>
        <span style="float: right">{{ solutionDetailData.status.name }}</span>
      </div>
      <div>
        <span>编程语言：</span>
        <span style="float: right">{{ solutionDetailData.language.name }}</span>
      </div>
      <div>
        <span>提交日期：</span>
        <span style="float: right">{{ solutionDetailData.submit_date }}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "solutionDetail",
  data() {
    return {
      is_loading_table: false,
      isSolutionMsg: true,
      isCode: false,
      solutionDetailData: {
        status: {
          id: -1,
          name: '',
          description: ''
        },
        source_code: '',
        error_message: '',
        submit_date: '',
        time: -1,
        memory: -1,
        language: {
          id: -1,
          name: ''
        },
        problem: {
          id: -1,
          title: ''
        },
        user: {
          username: '',
          name: ''
        },
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    window.document.body.style.backgroundImage = 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)';
    next();
  },
  created() {
    this.is_loading_table = true
    axios.get(this.base_url + "/solution/" + this.$route.params.id)
        .then(res => {
          if (res.data.status === 1) {
            this.solutionDetailData = res.data.data;
            this.is_loading_table = false;
          }
        }).catch(err => {
      this.$message.error(err);
      ;
      this.is_loading_table = false;
    })
  },
  methods: {}
}
</script>

<style scoped>

a {
  text-decoration: none;
}

.clear::before,
.clear::after {
  content: '';
  display: table;
  clear: both;
}

.hyperlink {
  color: #409EFF;
}

.hyperlink:hover {
  color: #0000ff;
}

.main {
  padding: 20px;
  max-width: 1050px;
  width: 1000px;
  min-width: 1000px;
  margin: 0 auto;
}

.msg_main {
  width: 640px;
  float: left;
}

#submit_msg {
  width: 350px;
  float: right;
  line-height: 32px;
}
</style>
