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
    <div v-if="!$store.state.is_login">
      <el-button-group>
        <el-button
          type="text"
          class="user-btn"
          href="javascript:;"
          :underline="false"
          target="_blank"
          @click="loginDialogFormVisible = true">
          登录
        </el-button>

        <el-button
          type="text"
          class="user-btn"
          href="javascript:;"
          :underline="false"
          target="_blank"
          @click="registerDialogFormVisible = true">
          注册
        </el-button>
      </el-button-group>
    </div>
    <!-- 登录后显示 -->
    <div v-if="$store.state.is_login">
        <el-button
            type="text"
            class="user-btn"
            href="javascript:;"
            :underline="false"
            target="_blank"
            @click="logout">
          退出登录
        </el-button>
      <!-- 个人信息 -->
    </div>

    <el-dialog  width="350px" title="欢迎使用仲恺OJ" :visible.sync="loginDialogFormVisible">
      <LoginDialog @close="closeLoginDialog"/>
    </el-dialog>

    <el-dialog  width="350px" title="欢迎使用仲恺OJ" :visible.sync="registerDialogFormVisible">
      <RegisterDialog/>
    </el-dialog>
  </div>
</template>

<script>
import LoginDialog from "@/components/LoginDialog";
import RegisterDialog from "@/components/RegisterDialog";

export default {
  name: "Header",
  components: {
    LoginDialog,
    RegisterDialog
  },
  data() {
    return {
      loginDialogFormVisible: false,
      registerDialogFormVisible: false
    }
  },
  methods: {
    logout() {
      this.$store.commit('logout');
    },
    closeLoginDialog() {
      this.loginDialogFormVisible = false;
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
