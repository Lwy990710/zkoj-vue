<template>
  <div>

    <!-- TODO： 头像以及名称 -->
    <div>

    </div>

    <el-menu
      default-active="/iacs"
      @select="changeMenu"
      background-color="rgba(0,0,0,0)"
      style="width: 100%"
      text-color="#fff"
      active-text-color="#269D80">
      <el-menu-item index="/iacs">
        <i class="el-icon-menu"></i>
        <span slot="title">网站信息</span>
      </el-menu-item>
      <el-menu-item index="/iacs/problem">
        <i class="el-icon-menu"></i>
        <span slot="title">题目管理</span>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">返回主页</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "AdminAside",
  methods: {
    /* 切换菜单 */
    changeMenu(index) {
      this.$router.push(index);
    }
  }
}
</script>

<style scoped>

</style>