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
          active-text-color="#ffffff"
          default-active="/"
          @select="changeMenu">
        <el-menu-item index="/">
          题目
        </el-menu-item>
        <el-menu-item index="discuss">
          讨论
        </el-menu-item>
        <el-menu-item index="record">
          记录
        </el-menu-item>
        <el-menu-item index="/no">
          竞赛
        </el-menu-item>
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
      <el-dropdown>
        <div class="avatar">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                     style="margin: 0 10px"></el-avatar>
          <span style="display: inline-block;color: #FFFFFF;float: right;margin-top: 12px">
            {{ $store.state.name }}
          </span>
        </div>
        <el-dropdown-menu slot="dropdown" @command="logout">
          <el-dropdown-item class="user_dropdown_item">
            <router-link :to='"/userhome"' target="_blank"
                         style="width: 96px;display: inline-block;text-align: center;color: #606266">
              个人中心
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item class="user_dropdown_item">
            <router-link :to='"/option"' target="_blank"
                         style="width: 96px;display: inline-block;text-align: center;color: #606266">
              设置
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item class="user_dropdown_item" style="display: inline-block">
            <el-button type="text" @click="logout" style="color: #606266">退出登录</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <!--                    <el-button-->
      <!--                        type="text"-->
      <!--                        class="user-btn"-->
      <!--                        href="javascript:;"-->
      <!--                        :underline="false"-->
      <!--                        target="_blank"-->
      <!--                        @click="logout1">-->
      <!--                      退出登录-->
      <!--                    </el-button>-->
      <!-- 个人信息 -->
    </div>

    <el-dialog width="350px" title="欢迎使用仲恺OJ" :visible.sync="loginDialogFormVisible">
      <LoginDialog @close="closeLoginDialog"/>
    </el-dialog>

    <el-dialog width="350px" title="欢迎使用仲恺OJ" :visible.sync="registerDialogFormVisible">
      <RegisterDialog @close="closeRegisterDialog"/>
    </el-dialog>
  </div>
</template>

<script>
import LoginDialog from "@/components/LoginDialog";
import RegisterDialog from "@/components/RegisterDialog";
import router from "@/router";

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
    closeLoginDialog(data) {
      this.loginDialogFormVisible = false;
      this.$store.commit('setName', data);

    },
    closeRegisterDialog() {
      this.registerDialogFormVisible = false;
    },
    logout() {
      this.$store.commit('logout');
    },
    changeMenu(index) {
      router.push({path: index});
    },
  }
}
</script>

<style scoped>
.body {
  display: flex;
  min-width: 800px;
  justify-content: space-between;
}

a {
  color: #606266;
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}

.logo {
  color: white;
  margin-right: 40px;
  font-size: 40px;
  line-height: 60px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.user_dropdown_item {
  text-align: center;
  padding-left: 0;
  padding-right: 0;
  width: 96px;
}

.avatar {
  height: 50px;
  margin-right: 50px;
  padding-top: 10px;
  display: inline-block;
  text-align: center;
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
