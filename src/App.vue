<template>
  <div id="app">
    <el-container>
      <!-- 头部 高度60px-->
      <el-header class="header-view">
        <Header/>
      </el-header>
      <!-- 内容 -->
      <el-main id="main-view">
        <router-view/>
      </el-main>
      <!-- 页尾 高度60px -->
      <el-footer class="footer-view">
        <Footer/>
      </el-footer>

    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: 'app',
  components: {
    Header,
    Footer
  },
  mounted() {
    let window_height = window.innerHeight;
    document.getElementById("main-view").style.minHeight = (window_height - 120) + "px";
  }
}
</script>

<style>
body {
  margin: 0px;
}

.header-view {
  background-color: #269D80;
}

.footer-view {
  background-color: #269D80;
}

#main-view {

}
</style>
