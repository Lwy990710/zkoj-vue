<template>
  <div class="body">
    <!-- logo -->
    <div class="logo">
      ZKOJ
    </div>
    <!-- 菜单 TODO: 设置事件 -->
    <div>
      <el-menu
        mode="horizontal"
        background-color="#ffffff00"
        text-color="#ffffff"
        active-text-color="#ffffff">
        <el-menu-item index="1">题目</el-menu-item>
        <el-menu-item index="2">讨论区</el-menu-item>
        <el-menu-item index="4">竞赛</el-menu-item>
        <!--<el-menu-item index="5">个人中心</el-menu-item>-->
      </el-menu>
    </div>
    <!-- 右侧登陆注册按钮 -->
    <div>
      <el-button-group>
        <el-button
          type="text"
          class="user-btn"
          href="javascript:;"
          :underline="false"
          target="_blank"
          @click="dialogFormVisible = true">
          登录
        </el-button>

        <el-button
          type="text"
          class="user-btn"
          href="javascript:;"
          :underline="false"
          target="_blank"
          @click="dialogFormVisible = true">
          注册
        </el-button>
      </el-button-group>
    </div>

    <el-dialog title="欢迎使用仲恺OJ" :visible.sync="dialogFormVisible" center>
      <LoginDialog/>
    </el-dialog>
  </div>
</template>

<script>
import LoginDialog from "@/components/LoginDialog";

export default {
  name: "Header",
  components: {
    LoginDialog
  },
  data() {
    return {
      dialogFormVisible: false,

    }
  }
}
</script>

<style scoped>
  .body {
    display: flex;
    min-width: 800px;
    justify-content: space-between;
  }
  .logo {
    color: white;
    margin-right: 40px;
    font-size: 40px;
    line-height: 60px;
  }
  .user-btn {
    font-size: 16px;
    width: 120px;
    color: white !important;
    box-sizing: border-box;
    height: 60px;

  }
  .user-btn:hover {
    color: #CCCCCC !important;
  }
</style>