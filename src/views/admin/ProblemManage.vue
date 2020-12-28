<template>
  <div>
    <!-- TODO: 筛选条件区域 -->
    <div>

    </div>

    <!-- 表格区域 -->
    <div>
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
  }
}
</script>

<style scoped>
.text-center{
  text-align: center;
}
</style>