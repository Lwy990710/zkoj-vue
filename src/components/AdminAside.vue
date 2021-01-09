<template>
  <div>

    <!-- TODO： 头像以及名称 -->
    <div>

    </div>

    <el-menu
      default-active="/iacs"
      @select="changeMenu"
      background-color="rgba(0,0,0,0)"
      style="width: 100%;height: 100%"
      text-color="#fff"
      active-text-color="#269D80">
      <el-menu-item index="/iacs">
        <i class="el-icon-tickets"></i>
        <span slot="title">网站信息</span>
      </el-menu-item>
      <el-submenu index="/iacs/problem">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>题目管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/iacs/problem">题目信息</el-menu-item>
          <el-menu-item index="/iacs/add">增加问题</el-menu-item>
          <el-menu-item index="/iacs/modify">修改问题</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/iacs/user">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/iacs/user">用户信息</el-menu-item>
          <el-menu-item index="/iacs/adduser">批量增加</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
<!--      <el-menu-item index="/iacs/problem">-->
<!--        <i class="el-icon-menu"></i>-->
<!--        <span slot="title">题目管理</span>-->
<!--      </el-menu-item>-->
      <el-menu-item index="/">
        <i class="el-icon-school"></i>
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

<style>
  .el-aside{
    overflow: hidden!important;
  }
</style>
