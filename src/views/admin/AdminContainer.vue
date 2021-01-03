<template>
  <div>
    <el-container>
      <el-aside id="aside-view" width="200px" ><AdminAside/></el-aside>
      <el-container id="main-footer-container">
        <el-main id="main-view"><router-view/></el-main>
        <el-footer id="footer-view"><Footer/></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AdminAside from "@/components/AdminAside";
import Footer from "@/components/Footer";

export default {
  name: "AdminContainer",
  components: {
    Footer,
    AdminAside
  }
}
</script>

<style scoped>

#aside-view {
  background-color: #545c64;
  min-height: 100vh;
}

#main-footer-container {
  min-height: 100vh;
}

#main-view {
  background-color: rgb(239, 239, 239);
}

#footer-view {
  background-color: #269D80;
}
</style>
