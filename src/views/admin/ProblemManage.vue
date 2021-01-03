<template>
  <div class="main">
    <!-- TODO: 筛选条件区域 -->
    <div class="problem_screen">
      <div class="add_problem">
        <el-button size="small" style="display: inline-block; margin-right: 10px">
        <router-link style="color: black" :to="'add'">增加题目</router-link>
        </el-button>
        <el-button size="small" style="display: inline-block; margin: 0 10px">删除题目</el-button>
        <el-button size="small" style="display: inline-block; margin: 0 10px">增加标签</el-button>
        <el-button size="small" style="display: inline-block; margin: 0 10px">增加分类</el-button>
        <el-divider></el-divider>
      </div>
      <div class="search_area">

        <div class="search_problem">
          <p>搜索题目:</p>
          <el-input size="small" style="width: 400px" id="search_problem_input" v-model="input_search_problem" placeholder="输入题号或题目名搜索"></el-input>
          <el-button @click="searchProblemIdOrTitle" size="small" type="primary" style="display: inline-block;margin: 0 10px;width: 80px">搜索</el-button>
          <el-divider></el-divider>
        </div>

        <div class="condition_screen">
          <p>根据条件搜索题目:</p>
          <span>难度</span>
          <el-select size="small" v-model="value_difficulty" style="width: 200px;margin-right: 300px" @change="changeDifficulty">
            <el-option
                    v-for="item in options_difficulty"
                    :key="item.value_difficulty"
                    :label="item.label"
                    :value="item.value_difficulty">
            </el-option>
          </el-select>
          <span>分组</span>
          <el-select size="small"  v-model="value_class" style="width: 200px" @change="changeClass">
            <el-option
                    v-for="item in class_list"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
            </el-option>
          </el-select>
          <br><br>
          <span>算法</span>
          <el-select size="small"  v-model="value_algorithm" style="width: 200px;margin-right: 290px" @change="changeAlgorithm">
            <el-option
                    v-for="item in algorithm_list"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
            </el-option>
          </el-select>
          <span>上传者</span>
          <el-input size="small"
            style="width: 200px"
            d="search_up_username"
            v-model="input_up_username"
            placeholder="输入用户名"></el-input>
          <el-button
            size="small"
            type="primary"
            style="display: inline-block;margin: 0 10px;width: 80px"
            @click="searchUsername">
            搜索
          </el-button>
        </div>
      </div>
    </div>

    <!-- 表格区域 -->
    <div class="table_area">
      <el-table
        v-loading="is_loading_table"
        :data="problem_list"
        style="width: 100%">
        <el-table-column
                prop="user.username"
                label="上传者"
                align="center"
                width="120">
        </el-table-column>
        <el-table-column
          prop="id"
          label="题号"
          align="center"
          width="90">
        </el-table-column>
        <el-table-column
          prop="title"
          label="题名"
          align="center"
          width="200">
          <template slot-scope="scope">
            <router-link :to='"/problem/" + scope.row.id' target="_blank">
              {{ scope.row.title }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="tag"
          label="算法标签"
          width="320">
          <template slot-scope="scope">
            <el-tag type="danger" effect="dark" size="mini" v-for="(item, index) in scope.row.tag" :key="index" style="margin: 0 5px">
              {{item.name}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="problem_class.name"
          width="80"
          align="center"
          label="分组">
        </el-table-column>
        <el-table-column
          prop="difficulty"
          width="80"
          align="center"
          label="难度">
          <template slot-scope="scope">
            <div v-if="scope.row.difficulty === 1" style="color: green"><strong>简单</strong></div>
            <div v-if="scope.row.difficulty === 2" style="color: orange"><strong>中等</strong></div>
            <div v-if="scope.row.difficulty === 3" style="color: red"><strong>困难</strong></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="count"
          width="100"
          sortable
          align="center"
          label="提交数">
        </el-table-column>
        <el-table-column
          prop="accepted"
          width="100"
          sortable
          align="center"
          label="AC数">
        </el-table-column>
        <el-table-column
          sortable
          width="90"
          align="center"
          label="通过率">
          <template slot-scope="scope">
            <el-tooltip placement="top">
              <div slot="content">{{ scope.row.accepted }}/{{ scope.row.count }}</div>
              <div v-if="scope.row.count === 0">-</div>
              <div v-if="scope.row.count !== 0">{{ (scope.row.accepted / scope.row.count * 100).toFixed(1) }}%</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="is_private"
          align="center"
          label="公开">
          <template slot-scope="scope">
            <div v-if="is_private">否</div>
            <div v-if="!is_private">是</div>
          </template>
        </el-table-column>
      </el-table>
<!--      <el-table-->
<!--        :data="problem_list"-->
<!--        style="width: 100%">-->
<!--        <el-table-column-->
<!--          prop="id"-->
<!--          label="题号"-->
<!--          width="80px"-->
<!--          align="center"-->
<!--          min-width="30px"/>-->
<!--        <el-table-column-->
<!--          prop="title"-->
<!--          label="题名"-->
<!--          min-width="150px"-->
<!--          show-overflow-tooltip="true"/>-->
<!--        <el-table-column-->
<!--          prop="problem_class.name"-->
<!--          label="分组"-->
<!--          min-width="100px"-->
<!--          align="center"-->
<!--          show-overflow-tooltip="true"/>-->
<!--        <el-table-column-->
<!--            prop="difficulty"-->
<!--            label="难度"-->
<!--            width="80px"-->
<!--            align="center"-->
<!--            show-overflow-tooltip="true"/>-->
<!--        <el-table-column-->
<!--          prop="count"-->
<!--          label="提交数"-->
<!--          sortable="custom"-->
<!--          width="100px"-->
<!--          align="center"/>-->
<!--        <el-table-column-->
<!--          prop="accepted"-->
<!--          label="AC数"-->
<!--          sortable="custom"-->
<!--          width="100px"-->
<!--          align="center"/>-->
<!--        <el-table-column-->
<!--          label="通过率"-->
<!--          sortable="custom"-->
<!--          width="100px"-->
<!--          align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <div v-if="scope.row.count === 0">-</div>-->
<!--            <div v-else>{{(scope.row.accepted / scope.row.count * 100).toFixed(1)}}%</div>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--                label="公开"-->
<!--                prop="is_private"-->
<!--                custom-->
<!--                width="80px"-->
<!--                align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <div v-if="!is_private">是</div>-->
<!--            <div v-if="is_private">否</div>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "ProblemManage",
  data() {
    return {
      input_search_problem: '',
      input_up_username: '',
      is_loading_table: false,
      options_difficulty: [{
        value_difficulty: '1',
        label: '简单'
      }, {
        value_difficulty: '2',
        label: '中等'
      }, {
        value_difficulty: '3',
        label: '困难'
      }],
      is_private: '',
      value_difficulty: '全部难度',
      value_class: '全部分组',
      value_algorithm: '全部算法标签',
      /* 算法标签数据 */
      algorithm_list: null,
      /* 分组数据 */
      class_list: null,
      /* 问题列表 */
      problem_list: null,
      /* 请求参数列表 */
      request_query: {
        page: 1,
        limit: 20,
        difference: null,
        class_id: null,
        tag_id: null,
        upload_username: null,
        upload_user_id: null,
        sort_type: null,
        search: null,
      }
      // problem_list: [{
      //   id: 10000,
      //   title: "标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题",
      //   count: 111111111,
      //   accepted: 31111111,
      //   difficulty: 1,
      //   tag: [{
      //     id: 1,
      //     name: '标签',
      //   }],
      //   problem_class: {
      //     id: 1,
      //     name: '分类分类分类分类分类分类分类',
      //   },
      //   is_private: false
      // }
      // ],

    }
  },

  created() {

    /* 获取问题列表 */
    this.request_problem_list();
    /* 获取标签列表 */
    axios.get(this.base_url + "/tag")
            .then(res => {
              if(res.data.status === 1) {
                this.algorithm_list = res.data.data;
              }
              else {
                alert(this.data.message);
              }
            }).catch(err => {
      alert(err);
    });
    /* 获取分组列表 */
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
      alert(err);
    });
  },

  methods:{
    /* 请求问题列表 */
    request_problem_list(){
      let query = {};
      this.is_loading_table = true;
      Object.keys(this.request_query).forEach(key => {
        if(this.request_query[key] !== null){
          query[key] = this.request_query[key];
        }
      })
      axios.get(this.base_url + "/iacs/problem", {params: query})
      .then(res => {
        this.problem_list = res.data.data.problem_list;
        this.is_loading_table = false
      }).catch(err => {
        alert(err);
        this.is_loading_table = false;
      })
    },

    /* 难度筛选 */
    changeDifficulty(val){
      this.request_query.difficulty = val;
      this.request_problem_list();
    },
    /* 分组筛选 */
    changeClass(val){
      this.value_class = val;
      this.request_query.class_id = val;
      this.request_problem_list();
    },
    /* 算法筛选 */
    changeAlgorithm(val){
      this.value_algorithm = val;
      this.request_query.tag_id = val;
      this.request_problem_list();
    },
    /* 题号或题目筛选 */
    searchProblemIdOrTitle(){
      this.request_query.search = this.input_search_problem;
      this.request_problem_list();
    },
    /* 上传者筛选 */
    searchUsername(){
      this.request_query.upload_username = this.input_up_username;
      this.request_query.upload_user_id = this.input_up_username;
      this.request_problem_list();
    }
  }
}
</script>

<style scoped>

a{
  text-decoration: none;
}

span{
  margin: 0 20px;
  font-size: 14px;
  display: inline-block;
}

p{
 font-size: 14px;
}


.problem_screen{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  background-color: white;
  padding: 20px;
}

.table_area{
  margin-top: 20px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.text-center{
  text-align: center;
}

</style>
