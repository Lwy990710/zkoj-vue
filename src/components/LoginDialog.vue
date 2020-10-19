<template>
  <div>
    <el-form :model="user_message">
      <el-form-item label="学号" :label-width="userLabelWidth">
        <el-input v-model="user_message.id" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="userLabelWidth">
        <el-input v-model="user_message.password" auto-complete="off"></el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer ">
      <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
      <el-button  @click="dialogFormVisible = false">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginDialog",
  data() {
    return {
      user_message: {},
      userLabelWidth: '120px'
    }
  }
}
</script>

<style scoped>
  .dialog-footer{
    text-align: center !important;
  }
</style>