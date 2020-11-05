<template>
   <div class="main">
      <h2 style="margin-bottom: 0px">用户信息</h2>
      <el-divider class="line"></el-divider>

      <el-avatar :size="80" shape="square" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" ></el-avatar>


      <div class="msg" >
         <h1 style="margin-bottom: 0px">基本资料</h1>
         <el-divider class="line"></el-divider>
         <p>账号:</p>
         <p>名称:</p>
         <p>邮箱:</p>
         <p>注册日期:</p>
         <p>简介:</p>
      </div>

      <div class="problem_sum">
         <h2>完成题目总数</h2>
      </div>
   </div>
</template>

<script>
    export default {
        name: "UserHomePage"
    }
</script>

<style scoped>
   .main{
      margin: 20px auto;
      padding: 0px 20px;
   }

   .line{
      margin-top: 10px !important;
      margin-bottom: 10px !important;
   }
</style>
