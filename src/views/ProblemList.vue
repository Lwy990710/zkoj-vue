<template>
  <div class="main">

    <div class="line"></div>
    <!-- 搜索条件区域 -->
    <div class="question-bar clear">
      <div class="search">
        <el-input v-model="input" placeholder="搜索题目名称或编号"></el-input>
      </div>
      <el-dropdown @command="chooseDifficulty">
        <span class="el-dropdown-link">
          难度<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="difficulty_menu" >
          <el-dropdown-item command="1">简单</el-dropdown-item>
          <el-dropdown-item command="2">中等</el-dropdown-item>
          <el-dropdown-item command="3">困难</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <!--<el-dropdown @command="chooseStatus" v-if="$store.state.is_login">
        <span class="el-dropdown-link">
          状态<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="status_menu" >
          <el-dropdown-item command="1">解决</el-dropdown-item>
          <el-dropdown-item command="0">未完成</el-dropdown-item>
          <el-dropdown-item command="2">尝试过</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>-->

      <el-dropdown @command="chooseClass">
        <span class="el-dropdown-link" >
          分组<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="class_menu" >
          <el-dropdown-item v-for="(item,index) in class_list" :command='item.id' :key="index">{{item.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown @command="chooseAlgorithm">
        <span class="el-dropdown-link" >
          算法<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="algorithm_menu" >
          <el-dropdown-item v-for="(item,index) in tag_list" :command='item.id' :key="index">{{item.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>



    <div class="question-line clear"></div>
    <!-- 标注难度 -->
    <el-tag
        id="tag_difficulty"
        type="success"
        v-show="is_show_tag.difficulty"
        closable
        :disable-transitions="false"
        @close="closeTagDifficulty('tag_difficulty')">
      难度 - {{tag_text.difficulty}}
    </el-tag>
    <!-- 标注状态 -->
    <!--<el-tag
        id="tag_status"
        type="warning"
        v-show="is_show_tag.status"
        closable
        :disable-transitions="false"
        @close="closeTagStatus('tag_status')">
      状态 - {{tag_text.status}}
    </el-tag>-->
    <!-- 标注分组 -->
    <el-tag
        id="tag_class"
        type="danger"
        v-show="is_show_tag.class"
        closable
        :disable-transitions="false"
        @close="closeTagClass('tag_class')">
      分组 - {{tag_text.class}}
    </el-tag>
    <!-- 标注算法 -->
    <el-tag
        id="tag_algorithm"
        type="danger"
        v-show="is_show_tag.tag"
        closable
        :disable-transitions="false"
        @close="closeTagAlgorithm('tag_algorithm')">
      算法 - {{tag_text.tag}}
    </el-tag>

    <!-- 列表区域 -->
    <div>
      <el-table
        v-loading="is_loading_table"
        :data="problem_list"
        style="width: 100%;">

        <el-table-column
          prop="status"
          label="状态"
          width="60"
          align="center">
          <template slot-scope="scope">
            <div v-if="$store.state.is_login">
              <div v-if="scope.row.status===1" class="el-icon-check"
                   style="color: #67C23A;font-size: 22px"></div>
              <div v-if="scope.row.status ===2 " class="el-icon-close"
                   style="color: red;font-size: 22px"></div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          label="题号"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
            prop="title"
            label="题目"
            min-width="200">
          <template slot-scope="scope">
            <router-link :to='"/problem/" + scope.row.id' target="_blank">
              {{ scope.row.title }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
            prop="problem_class"
            min-width="120"
            align="center">
          <template slot="header" slot-scope="scope">
            <el-tooltip effect="dark" content="点击切换显示算法标签/分类" placement="top-end">
              <el-button type="text" @click="isShowTag = !isShowTag"
                         style="display: inline-block;margin: 1px 20px">
                {{isShowTag ? '算法标签' : '分组'}}
              </el-button>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <el-tag v-if="isShowTag" v-for="(item, index) in scope.row.tag"  :key="index" disable-transitions
                    type="danger" effect="dark" style="font-size: 12px;margin: 0 5px" size="mini">
              {{ item.name }}
            </el-tag>
            <div v-if="!isShowTag && scope.row.problem_class">
              {{ scope.row.problem_class.name }}
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="difficulty"
          label="难度"
          width="100"
          align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.difficulty === 1" style="color: green"><strong>简单</strong></div>
            <div v-if="scope.row.difficulty === 2" style="color: orange"><strong>中等</strong></div>
            <div v-if="scope.row.difficulty === 3" style="color: red"><strong>困难</strong></div>
          </template>
        </el-table-column>

        <el-table-column
                prop="count"
                label="提交数"
                width="120"
                align="center">
        </el-table-column>

        <el-table-column
          prop="pass_rate"
          label="通过率"
          width="80"
          align="center">
          <template slot-scope="scope">
            <el-tooltip placement="top">
              <div slot="content">{{ scope.row.accepted }}/{{ scope.row.count }}</div>
              <div v-if="scope.row.count === 0">-</div>
              <div v-if="scope.row.count !== 0">{{ (scope.row.accepted / scope.row.count * 100).toFixed(1) }}%</div>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 切换页面区域 -->
      <div class="page" style="text-align: center">
        <div class="page-line"></div>
        <el-pagination
            :page-sizes="[10,20,30,40]"
            :page-size="this.request_query.limit"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            background
            layout="prev, pager, next, sizes, jumper"
            :total="problem_total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "main",
  beforeRouteEnter(to, from, next) {
    window.document.body.style.backgroundColor = '#FFFFFF';
    next();
  },
  data() {
    return {
      /* 输入显示框 */
      input: '',
      /* 显示读取状态 */
      is_loading_table: true,
      /* 是否切换算法标签 */
      isShowTag: false,
      /* 问题列表数据 */
      problem_list: null,
      /* 问题总数 */
      problem_total: 0,
      /* 标签数据 */
      tag_list: null,
      /* 分组数据 */
      class_list: null,
      /* 请求url参数 */
      request_query: {
        page: 1,
        limit: 20,
        difficulty: null,
        status: null,
        tag_id: null,
        class_id: null
      },
      /* 控制标签显示 */
      is_show_tag: {
        difficulty: false,
        status: false,
        tag: false,
        class: false
      },
      /* 标签内容 */
      tag_text: {
        difficulty: "",
        status: "",
        tag: "",
        class: ""
      }
    }
  },
  created() {
    this.mark = -1;
    // 获取问题列表
    this.request_problem_list();
    // 获取标签列表
    axios.get(this.base_url + "/tag")
      .then(res => {
        if(res.data.status === 1) {
          this.tag_list = res.data.data;
        }
        else {
          alert(this.data.message);
        }
      }).catch(err => {
       this.$message.error(err);;
    });
    // 获取分组列表
    axios.get(this.base_url + "/class")
      .then(res => {
        if(res.data.status === 1) {
          this.class_list = res.data.data;
          console.log(this.class_list);
        }
        else {
          alert(this.data.message);
        }
      }).catch(err => {
       this.$message.error(err);;
    });
  },
  methods: {
    /* 请求问题列表 */
    request_problem_list() {
      this.is_loading_table = true;

      let query = {};
      Object.keys(this.request_query).forEach(key => {
        if (this.request_query[key] !== null) {
          query[key] = this.request_query[key];
        }
      })
      axios.get(this.base_url + "/problem", {params: query})
          .then(res => {
            //请求成功时进入then(HTTP状态码为200)
            if (res.data.status === 1) {
              this.problem_list = res.data.data.problem_list;
              this.problem_total = res.data.data.count;
              this.is_loading_table = false;
            }
          })
          .catch(err => {
            //请求失败时进入catch
            this.$message.error(err);;
            this.is_loading_table = false;
          });
    },


    /* 选择难度 */
    chooseDifficulty(command) {
      let temp = {1: '简单', 2: '中等', 3: '困难'};
      this.request_query.difficulty = command;
      this.request_problem_list();
      this.tag_text.difficulty = temp[command]
      this.is_show_tag.difficulty = true;
    },

    chooseStatus(command) {
      let temp = {1: '解决', 0: '未完成', 2: '尝试过'};
      this.request_query.status = command;
      this.request_problem_list();
      this.tag_text.status = temp[command]
      this.is_show_tag.status = true;
    },

    chooseClass(command) {
      let temp = {1: '红桥杯', 2: '绿桥杯'};
      this.request_query.class_id = command;
      this.request_problem_list();
      this.tag_text.class = temp[command]
      this.is_show_tag.class = true;
    },

    chooseAlgorithm(command) {
      let temp = {1: '深度优先搜索', 2: '广度优先搜索', 3: '二叉树'};
      this.request_query.tag_id = command;
      this.request_problem_list();
      this.tag_text.tag = temp[command]
      this.is_show_tag.tag = true;
    },

    handleSizeChange(val) {
      this.request_query.limit = val;
      this.request_problem_list();
    },

    handleCurrentChange(val) {
      this.request_query.page = val;
      this.request_problem_list();
    },


    /* 取消难度筛选 */
    closeTagDifficulty(id) {
      let temp = {tag_difficulty: 'difficulty'};
      let tag = document.getElementById(id);
      this.is_show_tag.difficulty = false;
      this.request_query[temp[id]] = null;
      this.request_problem_list();
    },
    /* 取消状态筛选 */
    closeTagStatus(id){
      let temp = {tag_status: 'status'};
      this.is_show_tag.status = false;
      this.request_query[temp[id]] = null;
      this.request_problem_list();
    },
    /* 取消分组筛选 */
    closeTagClass(id){
      let temp = {tag_class: 'class_id'}
      this.is_show_tag.class = false;
      this.request_query[temp[id]] = null;
      this.request_problem_list();
    },
    /* 取消算法筛选 */
    closeTagAlgorithm(id){
      let temp = {tag_algorithm: 'tag_id'}
      this.is_show_tag.tag = false;
      this.request_query[temp[id]] = null;
      this.request_problem_list();
    }
  }

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

.main {
  font-size: 20px;
  min-width: 800px;
  max-width: 1200px;
  margin: 0 auto;
  /*width: 80%;*/
  /*border: black solid 1px;*/
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

/*.difficulty_menu{*/
/*  left: 1030px !important;*/
/*}*/

/*.status_menu{*/
/*  left: 1100px !important;*/
/*}*/

/*.class_menu{*/
/*  left: 1180px !important;*/
/*}*/

/*.algorithm_menu{*/
/*  left: 1220px !important;*/
/*}*/

.el-dropdown-link {
  display: inline-block;
  float: right;
  cursor: pointer;
  color: black;
}


.el-icon-arrow-down {
  font-size: 12px;
}

.question-line {
  width: 100%;
  height: 30px;
}

.page-line {
  border-bottom: #DDDDDD 1px solid;
  margin-bottom: 12px;
}

el-pagination {
  background-color: #42b983;
}
</style>
