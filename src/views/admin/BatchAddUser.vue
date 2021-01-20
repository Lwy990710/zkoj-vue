<template>
  <div>
    <el-card class="card-header">
      <div slot="header" class="clearfix">
        <span>从Excel导入</span>
        <el-button style="float: right; padding: 4px 10px" type="primary" @click="submitExcelData">导入</el-button>
      </div>
      <input type="file" ref="input_upload"/>
      <div>
        内容格式(第一，二，三列)需要为 用户名 密码 姓名(昵称)
      </div>
      <div>
        如下图所示：
      </div>
      <img src="http://task.yukineko.top/static/task5/upload/231.png"/>
    </el-card>
    <el-card class="card-header">
      <div slot="header" class="clearfix">
        <span>格式设置</span>
        <el-button style="float: right; padding: 4px 10px" type="primary" @click="submitData">确认添加</el-button>
      </div>
      <div style="margin-bottom: 10px">
        <span class="label">添加数量：</span>
        <el-input-number v-model="user_count" controls-position="right"
                         @change="change" :min="1" size="small"
                         :max="1000"></el-input-number>
      </div>

      <div style="margin-bottom: 10px">
        <span class="label">账号前缀：</span>
        <el-input style="width: 200px" type="text" v-model="prefix" size="small" @change="change"></el-input>
      </div>

      <div style="margin-bottom: 10px">
        <span class="label">序号长度：</span>
        <el-input-number v-model="number_length" controls-position="right"
                         @change="change" :min="1" size="small"
                         :max="20"></el-input-number>
      </div>

      <div style="margin-bottom: 10px">
        <span class="label">起始序号：</span>
        <el-input-number v-model="start_number" controls-position="right"
                         @change="change" :min="0" size="small"
                         :max="10000000"></el-input-number>
      </div>
      <div style="margin-bottom: 10px">
        <span class="label">密码格式：</span>
        <el-radio v-model="password_type" :label=1 @change="change">与用户名一致</el-radio>
        <el-radio v-model="password_type" :label=2 @change="change">统一</el-radio>
        <el-radio v-model="password_type" :label=3 @change="change">随机</el-radio>
      </div>
      <div style="margin-bottom: 10px" v-show="password_type === 2">
        <span class="label">统一密码：</span>
        <el-input style="width: 200px" type="text" v-model="password" size="small" @change="change"></el-input>
      </div>
      <div style="margin-bottom: 10px">
        <span class="label">昵称格式：</span>
        <el-radio v-model="name_type" :label=1 @change="change">与用户名一致</el-radio>
        <el-radio v-model="name_type" :label=2 @change="change">统一</el-radio>
        <div style="margin-bottom: 10px" v-show="name_type === 2">
          <span class="label">统一昵称：</span>
          <el-input style="width: 200px" type="text" v-model="user_name" size="small" @change="change"></el-input>
        </div>
      </div>
    </el-card>
    <el-card class="card-main">
      新增账号列表预览：
      <el-table
          :data="account_list"
          style="width: 100%">
        <el-table-column
            prop="username"
            label="用户名"
            min-width="180">
        </el-table-column>
        <el-table-column
            prop="password"
            label="密码"
            min-width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="昵称"
            min-width="180px">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import md5 from 'js-md5';

export default {
  name: "BatchAddUser",
  data() {
    return {
      user_count: 5,
      prefix: 'zhku',
      number_length: 3,
      start_number: 0,
      account_list: [
        {
          name: 'zhku001',
          username: 'zhku001',
          password: 'zhku001',
        },{
          name: 'zhku002',
          username: 'zhku002',
          password: 'zhku002',
        },{
          name: 'zhku003',
          username: 'zhku003',
          password: 'zhku003',
        },{
          name: 'zhku004',
          username: 'zhku004',
          password: 'zhku004',
        },{
          name: 'zhku005',
          username: 'zhku005',
          password: 'zhku005',
        },
      ],
      password_type: 1,
      name_type: 1,
      password: '123456',
      user_name: 'Student',
    }
  },
  created() {
    document.title = '批量增加用户|后台|ZKOJ'
  },
  methods: {
    /** 改变账号数量 */
    change() {
      let current_number = this.start_number;
      let data = [];
      for(let i = 0; i < this.user_count; i++) {
        let current = String(current_number).padStart(this.number_length, '0');
        let username = this.prefix + current
        let item = {
          username: username,
          password: username,
          name: username
        }
        if(this.password_type === 2) {
          item.password = this.password;
        }
        if(this.password_type === 3) {
          let e = 12;
          let t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
              a = t.length,
              n = "";
          for (let j = 0; j < e; j++) n += t.charAt(Math.floor(Math.random() * a));
          item.password = n;
        }
        if(this.name_type === 2) {
          item.name = this.user_name;
        }
        data.push(item);
        current_number++;
      }
      this.account_list = data;
    },
    /** 提交 */
    submitData() {

      this.$confirm('将添加' + this.user_count + '个账号，是否确认？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let body = {
          user_list: this.account_list
        }
        for(let i = 0; i < body.user_list.length; i++) {
          body.user_list[i].password = md5('zkoj' + md5(body.user_list[i].username + body.user_list[i].password));
        }
        axios.post(this.base_url + '/user', body).then(res => {
          if(res.data.status === 1) {
            this.$message.success("添加成功！");
          } else {
            this.$message.error(res.data.message);
          }
        }).catch(err => {
          this.$message.error(err);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });


    },
    /** 从Excel提交更改 */
    submitExcelData() {
      let form_data = new FormData();
      let check_point_file = this.$refs.input_upload.files[0];
      form_data.append('file',check_point_file);

      let request_option = {
        url: this.base_url + '/user/excel',
        data: form_data,
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      axios.request(request_option).then(res => {
        if(res.data.status === 1) {
          this.$message.success("添加成功！");
        } else {
          this.$message.error(res.data.message);
        }
      }).catch(err => {
        this.$message.error(err);
      })
    }
  }
}
</script>

<style scoped>
.card-header {
  max-width: 800px;
  margin: 20px auto;
}

.card-main {
  max-width: 800px;
  margin: 0 auto;
}

.label {
  width: 150px;
  display: inline-block;
  text-align: right;
}
</style>
