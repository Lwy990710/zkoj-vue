<template>
  <div>
    <!-- TODO: 筛选条件区域 -->
    <div class="problem_screen">
      <div class="add_problem">
        <el-button size="small" style="display: inline-block; margin-right: 10px">增加题目</el-button>
        <el-button size="small" style="display: inline-block; margin: 0 10px">增加标签</el-button>
        <el-button size="small" style="display: inline-block; margin: 0 10px">增加分类</el-button>
        <el-divider></el-divider>
      </div>
      <div class="search_area">

        <div class="search_problem">
          <p>搜索题目:</p>
          <el-input size="small" style="width: 400px" id="search_problem_input" v-model="input_search_problem" placeholder="输入题号或题目名搜索"></el-input>
          <el-button size="small" type="primary" style="display: inline-block;margin: 0 10px;width: 80px">搜索</el-button>
          <el-divider></el-divider>
        </div>

        <div class="condition_screen">
          <p>根据条件搜索题目:</p>
          <span>难度</span>
          <el-select size="small" v-model="value_difficulty" style="width: 200px;margin-right: 300px">
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
                    :value="item.name">
            </el-option>
          </el-select>
          <br><br>
          <span>算法</span>
          <el-select size="small"  v-model="value_algorithm" style="width: 200px;margin-right: 290px" @change="changeAlgorithm">
            <el-option
                    v-for="item in algorithm_list"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
            </el-option>
          </el-select>
          <span>上传者</span>
          <el-input size="small"
                    style="width: 200px"
                    id="search_up_username"
                    v-model="input_up_username"
                    placeholder="输入用户名"></el-input>
          <el-button
                  size="small"
                  type="primary"
                  style="display:
                  inline-block;margin: 0 10px;width: 80px">
            搜索
          </el-button>
        </div>
      </div>
    </div>

    <!-- 表格区域 -->
    <div class="table_area">
      <el-table
        :data="problem_list"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="题号"
          width="80px"
          align="center"
          min-width="300px"/>
        <el-table-column
          prop="title"
          label="题名"
          min-width="200px"
          show-overflow-tooltip="true"/>
        <el-table-column
          prop="problem_class.name"
          label="分组"
          min-width="100px"
          align="center"
          show-overflow-tooltip="true"/>
        <el-table-column
            prop="difficulty"
            label="难度"
            width="80px"
            align="center"
            show-overflow-tooltip="true"/>
        <el-table-column
          prop="count"
          label="提交数"
          sortable="custom"
          width="100px"
          align="center"/>
        <el-table-column
          prop="accepted"
          label="AC数"
          sortable="custom"
          width="100px"
          align="center"/>
        <el-table-column
          label="通过率"
          sortable="custom"
          width="100px"
          align="center">
          <template slot-scope="scope">
            {{(scope.row.accepted / scope.row.count * 100).toFixed(1)}}%
          </template>
        </el-table-column>
        <el-table-column
          label="公开"
          custom
          width="80px"
          align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.is_private">否</div>
            <div v-if="!scope.row.is_private">是</div>
          </template>
        </el-table-column>

      </el-table>
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
      value_difficulty: '简单',
      value_class: '红桥杯',
      value_algorithm: '深度学习',
      /* 算法标签数据 */
      algorithm_list: null,
      /* 分组数据 */
      class_list: null,
      problem_list: [{
        id: 10000,
        title: "标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题",
        count: 111111111,
        accepted: 31111111,
        difficulty: 1,
        tag: [{
          id: 1,
          name: '标签',
        }],
        problem_class: {
          id: 1,
          name: '分类分类分类分类分类分类分类',
        },
        is_private: false
      }
      ],

    }
  },

  created() {
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
    changeClass(val){
      this.value_class = val;
    },
    changeAlgorithm(val){
      this.value_algorithm = val;
    }
  }
}
</script>

<style scoped>

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
