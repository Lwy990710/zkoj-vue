<template>
  <div class="main clear">
    <!-- TODO: 筛选条件区域 -->
    <div class="problem_screen clear">
      <!-- 搜索问题区域 -->
      <div class="search_area">
        <!-- 题目搜索框 -->
        <div class="search_problem">
          <p>搜索题目:</p>
          <el-input @change="searchProblemIdOrTitle" size="small" style="width: 300px" id="search_problem_input" v-model="input_search_problem" placeholder="输入题号或题目名搜索"></el-input>
          <el-button @click="searchProblemIdOrTitle" size="small" type="primary" style="display: inline-block;margin: 0 10px;width: 80px">搜索</el-button>
          <el-divider></el-divider>
        </div>
        <!-- 条件筛选 -->
        <div class="condition_screen">
          <p>根据条件搜索题目:</p>
          <span>难度</span>
          <el-select size="small" v-model="value_difficulty" style="width: 200px;margin-right: 54px" @change="changeDifficulty">
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
                    :key="null"
                    label="全部分组"
                    :value="null">
            </el-option>
            <el-option
                    v-for="item in class_list"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
            </el-option>
          </el-select>
          <br><br>
          <span>算法</span>
          <el-select size="small"  v-model="value_algorithm" style="width: 200px;margin-right: 40px" @change="changeAlgorithm">
            <el-option
                    :key="null"
                    label="全部算法"
                    :value="null">
            </el-option>
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
            id="search_up_username"
            @change="searchUsername"
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

    <!-- 分组和算法标签管理区 -->
    <div class="manage_area clear">
      <el-tabs id="manege" v-model="active_name" type="border-card">
        <!-- 算法管理页面 -->
        <el-tab-pane label="算法标签管理" name="algorithm">
          <div style="overflow: auto;height: 200px">
            <div v-for="item in algorithm_list" style="margin: 20px">
              <span style="width: 100px">{{item.name}}</span>
              <el-button @click="modify_algorithm_dialog=true,modify_algorithm_id = item.id" style="width: 60px;display: inline-block" size="mini">修改</el-button>
              <el-button @click="delAlgorithm(item)" style="width: 60px;display: inline-block" size="mini" type="danger">删除</el-button>
            </div>
            <!-- 修改算法对话框 -->
            <el-dialog title="修改算法" :visible.sync="modify_algorithm_dialog" style="width: 1000px;margin: 0 auto">
              <span>新的算法名 : </span>
              <el-input v-model="modify_algorithm_name" size="small" placeholder="新算法名" style="width: 300px"></el-input>
              <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="modify_algorithm_dialog = false">取 消</el-button>
                <el-button size="small"  @click="modifyAlgorithm()" type="primary" >确 定</el-button>
              </div>
            </el-dialog>
          </div>
          <!-- 新增算法按钮 -->
          <div style="text-align: center">
            <el-button style="margin-top: 10px" @click="add_algorithm_dialog = true" type="primary" size="small">增加算法标签</el-button>
          </div>
          <!-- 增加算法对话框 -->
          <el-dialog title="增加算法" :visible.sync="add_algorithm_dialog" style="width: 1000px;margin: 0 auto">
            <span>新算法标签 : </span>
            <el-input v-model="new_algorithm_name" size="small" placeholder="算法名字" style="width: 300px"></el-input>
            <div slot="footer" class="dialog-footer">
              <el-button size="small" @click="add_algorithm_dialog = false">取 消</el-button>
              <el-button size="small"  @click="addAlgorithm()" type="primary" >确 定</el-button>
            </div>
          </el-dialog>
        </el-tab-pane>
        <!-- 分组管理页面 -->
        <el-tab-pane label="分组管理" name="class">
          <div style="height: 200px;overflow: auto">
            <div v-for="item in class_list" style="margin: 20px">
              <span style="width: 100px">{{item.name}}</span>
              <el-button @click="modify_class_dialog=true,modify_class_id = item.id" style="width: 60px;display: inline-block" size="mini">修改</el-button>
              <el-button @click="delClass(item)" style="width: 60px;display: inline-block" size="mini" type="danger">删除</el-button>
            </div>
          </div>
          <!-- 修改分组对话框 -->
          <el-dialog title="修改分组" :visible.sync="modify_class_dialog" style="width: 1000px;margin: 0 auto">
            <span>新的分组名 : </span>
            <el-input type="text" maxlength="40" show-word-limit v-model="modify_class_name" size="small" placeholder="分组名字" style="width: 300px"></el-input>
            <br><br>
            <span>修改后的分组描述 : </span>
            <div style="margin: 10px 28px">
              <el-input
                      type="textarea"
                      maxlength="255"
                      show-word-limit
                      resize="none"
                      :autosize="{minRows: 6, maxRows: 6}"
                      v-model="modify_class_description"
                      size="small" placeholder="分组描述"
                      style="width: 400px;font-size: 16px">
              </el-input>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button size="small" @click="add_class_dialog = false">取 消</el-button>
              <el-button size="small"  @click="modifyClass()" type="primary" >确 定</el-button>
            </div>
          </el-dialog>
          <!-- 新增分组按钮 -->
          <div style="text-align: center">
            <el-button style="margin-top: 10px" @click="add_class_dialog = true" type="primary" size="small">增加分组</el-button>
          </div>
          <!-- 新增分组对话框 -->
          <el-dialog title="增加分组" :visible.sync="add_class_dialog" style="width: 1000px;margin: 0 auto">
            <span>新分组名字 : </span>
            <el-input type="text" maxlength="40" show-word-limit v-model="new_class_name" size="small" placeholder="分组名字" style="width: 300px"></el-input>
            <br><br>
            <span>新分组描述 : </span>
            <div style="margin: 10px 28px">
              <el-input
                type="textarea"
                maxlength="255"
                show-word-limit
                resize="none"
                :autosize="{minRows: 6, maxRows: 6}"
                v-model="new_class_description"
                size="small" placeholder="分组描述"
                style="width: 400px;font-size: 16px">
              </el-input>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button size="small" @click="add_class_dialog = false">取 消</el-button>
              <el-button size="small"  @click="addClass()" type="primary" >确 定</el-button>
            </div>
          </el-dialog>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 表格区域 -->
    <div class="table_area clear">
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
          width="80">
        </el-table-column>
        <el-table-column
          prop="title"
          label="题名"
          min-width="150"
          show-overflow-tooltip="true">
          <template slot-scope="scope">
            <router-link :to='"/problem/" + scope.row.id' target="_blank">
              {{ scope.row.title }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="tag"
          label="算法标签"
          min-width="200"
          show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-tag type="danger" effect="dark" size="mini" v-for="(item, index) in scope.row.tag" :key="index" style="margin: 0 5px">
              {{item.name}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="problem_class.name"
          min-width="100"
          align="center"
          label="分组"
          show-overflow-tooltip="true">
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
          width="100"
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
      <el-divider></el-divider>
      <!-- 切换页面区域 -->
      <div class="page" style="text-align: center;margin: 20px 0">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="this.request_query.limit"
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "ProblemManage",
  data() {
    return {
      /* 加载界面 */
      is_loading_table: false,
      /* 题目搜索框内容 */
      input_search_problem: '',
      /* 用户搜索框内容 */
      input_up_username: '',
      /* 分组标签管理页面 */
      active_name: 'algorithm',
      /* 增加算法对话框 */
      add_algorithm_dialog: false,
      new_algorithm_name: '',
      /* 修改算法对话框 */
      modify_algorithm_dialog: false,
      modify_algorithm_id: null,
      modify_algorithm_name: '',
      /* 增加分组对话框 */
      add_class_dialog: false,
      new_class_name: '',
      new_class_description: '',
      /* 修改分组对话框 */
      modify_class_dialog: false,
      modify_class_id: null,
      modify_class_name: '',
      modify_class_description: '',
      options_difficulty: [{
        value_difficulty: null,
        label: '全部难度'
      },{
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
      total: 0,
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

    }
  },

  created() {

    /* 获取问题列表 */
    this.request_problem_list();
    /* 获取标签列表 */
    this.getAllAlgorithm();
    /* 获取分组列表 */
    this.getAllClass();
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
        this.total = res.data.data.count;
        this.is_loading_table = false
      }).catch(err => {
        this.$message.error(err);;
        this.is_loading_table = false;
      })
    },
    /* 增加算法标签 */
    addAlgorithm(){
      let add_quest = {name: this.new_algorithm_name};
      axios.post(this.base_url + "/tag", add_quest)
              .then(res => {
                if(res.data.status === 1){
                  this.getAllClass();
                  alert("增加成功，新算法标签id为:" + res.data.data.id)
                  this.$router.go(0);
                } else if(res.data.status === 0) {
                  alert(res.data.message);
                }
              }).catch(err => {
        this.$message.error(err);;
      })
    },
    /* 删除算法标签 */
    delAlgorithm(item){
      this.$confirm('是否确定删除算法 : ' + item.name, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    /* 修改算法标签 */
    modifyAlgorithm(){
      let modify_quest = {
        id: this.modify_algorithm_id + "",
        name: this.modify_algorithm_name
      }
      alert(modify_quest.id);
      axios.put(this.base_url + "/tag", modify_quest)
              .then(res => {
                if(res.data.status === 1){
                  alert("修改成功");
                  this.getAllClass();
                  this.$router.go(0);
                }
                if(res.data.status === 0){
                  alert(res.data.message);
                }
              }).catch(err => {
        this.$message.error(err);;
      })
    },
    /* 增加分组 */
    addClass(){
      let add_quest = {name: this.new_class_name, description: this.new_class_description};
      axios.post(this.base_url + "/problem-class", add_quest)
      .then(res => {
        if(res.data.status === 1){
          this.getAllClass();
          alert("增加成功，新分组id为:" + res.data.data.id);
          this.$router.go(0);
        } else if(res.data.status === 0) {
            alert("res.data.message")
        }
      }).catch(err => {
        this.$message.error(err);;
      })
    },

    /* 删除分组 */
    delClass(item){
      this.$confirm('是否确定删除分组 : ' + item.name, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    /* 修改分组 */
    modifyClass(){
      let modify_quest = {
        id: this.modify_class_id + "",
        name: this.modify_class_name,
        description: this.modify_class_description
      }
      axios.put(this.base_url + "/problem-class", modify_quest)
      .then(res => {
        if(res.data.status === 1){
          alert("修改成功");
          this.getAllClass();
          this.$router.go(0);
        }
        if(res.data.status === 0){
          alert(res.data.message);
        }
      }).catch(err => {
        this.$message.error(err);;
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
      alert(val);
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
    },
    /* 获取所有分组 */
    getAllClass(){
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
    /* 获取所有算法 */
    getAllAlgorithm(){
      axios.get(this.base_url + "/tag")
              .then(res => {
                if(res.data.status === 1) {
                  this.algorithm_list = res.data.data;
                }
                else {
                  alert(this.data.message);
                }
              }).catch(err => {
                  this.$message.error(err);
      });
    },
    /* 每一页数据条数 */
    handleSizeChange(val) {
      this.request_query.limit = val;
      this.request_problem_list();
    },
    /* 换页 */
    handleCurrentChange(val) {
      this.request_query.page = val;
      this.request_problem_list();
    },
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

.clear::before,
.clear::after {
  content: '';
  display: table;
  clear: both;
}

.main{

}

.problem_screen {
  min-width: 600px;
  width: 56%;
  float: left;
  height: 300px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  background-color: white;
  padding: 20px;

}

.manage_area {
  min-width: 350px;
  float: right;
  width: 36%;
  height: 300px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  padding: 20px;
}

.table_area {
  clear: both;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

#manege{
  background-color: white;
  border: none !important;
  box-shadow: none !important;
}

.text-center{
  text-align: center;
}
</style>
