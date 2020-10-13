<template>
  <div id="app">
    <el-container>
      <!-- 头部 高度60px-->
      <el-header class="header-view">
        <Header/>
      </el-header>
      <!-- 内容 -->
      <el-main>
        <router-view/>
      </el-main>
      <!-- 页尾 -->
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
  }
}
</script>

<style>

  .header-view {
    background-color: #269D80;
  }
  .footer-view {
    background-color: gray;
  }
</style>
