<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="问题信息">
        <div>
          <el-collapse id="add_problem" v-model="activeNames" @change="handleChange">

            <!-- 题目标题 -->
            <el-collapse-item name="collapse-title">
              <template slot="title">
                <div style="padding-left: 20px;font-size: 16px"><strong>题目标题</strong></div>
              </template>
              <div class="collapse-view">
                <el-input v-model="problem_message.title" placeholder="输入题目名称" size="normal"></el-input>
              </div>
            </el-collapse-item>

            <!-- 题目描述 -->
            <el-collapse-item name="collapse-description">
              <template slot="title">
                <div style="padding-left: 20px;font-size: 16px"><strong>题目描述</strong></div>
              </template>
              <div class="collapse-view">
                <mavon-editor
                        v-model="problem_message.description"
                        placeholder="输入题目描述..."
                        :toolbars="mavon_editor_toolbar"/>
              </div>
            </el-collapse-item>

            <!-- 样例输入/输出 -->
            <el-collapse-item name="collapse-sample">
              <template slot="title">
                <div style="padding-left: 20px;font-size: 16px"><strong>输入/输出样例</strong></div>
              </template>
              <div class="collapse-view">
                <span style="width: 50%">输入样例 :</span><span style="width: 50%">输出样例 :</span>
                <br><br>
                <el-input
                        type="textarea"
                        style="font-size: 14px;width: 40%"
                        :autosize="{ minRows: 8, maxRows: 8}"
                        resize="none" placeholder="输入样例"
                        v-model="problem_message.sample_input">
                </el-input>
                <el-divider id="vertical_divider" direction="vertical"></el-divider>
                <el-input
                        type="textarea"
                        style="font-size: 14px;width: 40%"
                        :autosize="{ minRows: 8, maxRows: 8}"
                        resize="none" placeholder="输出样例"
                        v-model="problem_message.sample_output">
                </el-input>
              </div>
            </el-collapse-item>

            <!-- 提示 -->
            <el-collapse-item name="collapse-hint">
              <template slot="title">
                <div style="padding-left: 20px;font-size: 16px"><strong>提示</strong></div>
              </template>
              <div class="collapse-view">
                <mavon-editor
                        v-model="problem_message.hint"
                        placeholder="输入提示/限制信息..."
                        :toolbars="mavon_editor_toolbar"/>
              </div>
            </el-collapse-item>

            <!-- 算法和分组 -->
            <el-collapse-item name="2">
              <template slot="title">
                <div style="padding-left: 20px;font-size: 16px"><strong>算法标签及分组</strong></div>
              </template>
              <div id="class_tag">
                <p>分组 :</p>
                <el-radio
                        style="display: inline-block;margin: 5px"
                        v-for="(item,index) in class_list"
                        :key="index"
                        v-model="problem_message.problem_class"
                        :label="item.id" border>
                  {{ item.name }}
                </el-radio>
                <el-divider></el-divider>
                <p>算法标签 :</p>
                <el-checkbox-group v-model="problem_message.tag">
                  <el-checkbox style="display: inline-block;margin: 5px" v-for="item in tag_list" :key="item.id"
                               :label="item.id" border>{{ item.name }}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </el-collapse-item>

            <!-- 其他 -->
            <el-collapse-item name="collapse-other">
              <template slot="title">
                <div style="padding-left: 20px;font-size: 16px"><strong>其他</strong></div>
              </template>
              <div class="collapse-view" style="line-height: 32px">
                <!-- <div>
                  <span style="margin-right: 20px">是否公开:</span>
                  <el-radio v-model="problem_data.is_private" :label="false">是</el-radio>
                  <el-radio v-model="problem_data.is_private" :label="true">否</el-radio>
                </div>-->
                <div>
                  <span style="margin-right: 20px">难度:</span>
                  <el-radio v-model="problem_message.difficulty" :label=1>简单</el-radio>
                  <el-radio v-model="problem_message.difficulty" :label=2>中等</el-radio>
                  <el-radio v-model="problem_message.difficulty" :label=3>困难</el-radio>
                </div>
                <!-- <p>限制 :</p>
                <div class="languages">
                               <el-button size="small" @click="addLimits" type="primary"><i class="el-icon-plus"></i></el-button>
                               <el-button size="small" @click="delLimits"><i class="el-icon-minus"></i></el-button>
                  <span  style="width: 100px">默认</span>
                  <span  style="width: 100px">内存(MB) : </span>
                  <el-input v-model="input_language[0].memory" size="small" style="width: 200px" placeholder="最大运行时间"></el-input>
                  <span  style="width: 100px">时间(ms) : </span>
                  <el-input v-model="input_language[0].time" size="small" style="width: 200px" placeholder="最大内存"></el-input>
                </div>
                <div class="languages" v-for="(item,index) in language_list">
                  <span style="width: 100px">{{item.name}}</span>
                  <span style="width: 100px">内存(MB) : </span>
                  <el-input type="number" v-model="input_language[index + 1].memory" size="small" style="width: 200px" placeholder="留空则为默认"></el-input>
                  <span style="width: 100px">时间(ms) : </span>
                  <el-input type="number" v-model="input_language[index + 1].time" size="small" style="width: 200px" placeholder="留空则为默认"></el-input>
                </div> -->
                <!--<div class="languages" v-for="(item,index) in language_list" >
                  <el-select  @change="chooseLanguage" v-model="languages[index].name" placeholder="请选择" style="width: 120px;margin: 10px 20px 10px 120px">
                    <el-option
                        v-for="item in language_list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                  </el-select>
                  <span>内存(MB) : </span>
                  <el-input size="small" style="width: 200px" placeholder="最大运行时间"></el-input>
                  <span>时间(ms) : </span>
                  <el-input size="small" style="width: 200px" placeholder="最大内存"></el-input>
                </div>-->
              </div>
              <div style="text-align: center;margin: 20px 0"><el-button type="primary">确认修改</el-button></div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-tab-pane>
      <el-tab-pane label="评测数据">
        <div style="padding: 20px">
          <h3>选择测试数据的添加方式：</h3>
          <div>
            <el-radio v-model="check_point_upload_type" label='zip'>打包上传</el-radio>
            <span>将测试点信息放入zip压缩包内上传</span>
          </div>
          <div>
            <el-radio v-model="check_point_upload_type" label='input'>手动添加</el-radio>
            <span>手动添加每一个测试点的输入输出信息</span>
          </div>
          <el-divider/>
          <!-- 打包上传 -->
          <div v-show="check_point_upload_type === 'zip'">
            <input type="file" ref="input_upload"/>
          </div>

          <!-- 手动添加 -->
          <div v-show="check_point_upload_type === 'input'">
            <el-button size="small" @click="addCheckPoint" type="primary"><i class="el-icon-plus"></i></el-button>
            <el-button size="small" @click="deleteCheckPoint"><i class="el-icon-minus"></i></el-button>

            <div class="collapse-view" v-for="(item, index) in input_check_point" style="padding: 20px">
              <div>第{{index + 1}}组：</div>
              <span style="width: 50%">输入数据 :</span><span style="width: 50%">输出数据 :</span>
              <br><br>
              <el-input
                      type="textarea"
                      style="font-size: 14px;width: 40%"
                      :autosize="{ minRows: 8, maxRows: 8}"
                      resize="none" placeholder="输入样例"
                      v-model="input_check_point[index].input">
              </el-input>
              <el-divider direction="vertical"></el-divider>
              <el-input
                      type="textarea"
                      style="font-size: 14px;width: 40%"
                      :autosize="{ minRows: 8, maxRows: 8}"
                      resize="none" placeholder="输出样例"
                      v-model="input_check_point[index].output">
              </el-input>
              <el-divider></el-divider>
            </div>
          </div>

          <el-button @click="uploadProblem" type="primary" size="small" style="margin: 20px 0">提交</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: "AddProblem",

    data() {
      return {
        /** 问题基本信息 */
        problem_message: {
          title: "",
          description: "",
          sample_input: "",
          sample_output: "",
          hint: "",
          tag: [],
          difficulty: 1,
          problem_class: null
        },
        problem_data: {
          title: "",
          description: "",
          sample_input: "",
          sample_output: "",
          hint: "",
          problem_class: 0,
          tag: [],
          is_private: true,
          source_code: [],
          difficulty: 1,
          limit: []
        },
        /** 输入限制数据 */
        input_language: [
          {
            language_id: 0,
            time: 1000,
            memory: 250
          },{
            language_id: 1,
            time: undefined,
            memory: undefined
          },{
            language_id: 2,
            time: undefined,
            memory: undefined
          },{
            language_id: 3,
            time: undefined,
            memory: undefined
          },{
            language_id: 4,
            time: undefined,
            memory: undefined
          },
        ],
        /** 输入源代码数据 */
        input_source_code: [
          {
            language_id: 1,
            source_code: undefined
          },{
            language_id: 2,
            source_code: undefined
          },{
            language_id: 3,
            source_code: undefined
          },{
            language_id: 4,
            source_code: undefined
          },
        ],
        /** 输入测试点数据 */
        input_check_point: [],
        /** 当前源代码页 */
        current_source_tab: 'C',
        /** 循环用数组 */
        languages: [],
        /** 默认展开折叠列表 */
        activeNames: [
          'collapse-title',
          'collapse-description',
          'collapse-sample',
          'collapse-other'],
        /** 后端返回的class列表 */
        class_list: null,
        /** 后端返回的tag列表 */
        tag_list: null,
        /** 后端返回的language列表*/
        language_list: [{
          id: -1,
          name: ''
        }],
        /** 恢复语言数组数据 */
        recovery_list: [],
        /** 被选中语言数组数据 */
        choosing_language: null,
        /** 语言名 */
        language_name:["C","CPP","JAVA","PYTHON"],
        /** mavon-editor的空间栏设置 */
        mavon_editor_toolbar: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          // imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          // save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true, // 预览
        },
        /** 当前步骤 0 1 2 */
        current_step: 0,
        /** 测试数据上传方式 zip - 文件； input - 手动 */
        check_point_upload_type: 'zip',
        /** 上传文件列表 */
        check_point_upload_file_list: [],
      }
    },

    created() {
      document.title = '增加问题|后台|ZKOJ'
      this.requestMessage();
      /* 获取所有语言种类 */
      axios.get(this.base_url + "/language")
              .then(res => {
                if(res.data.status === 1){
                  this.language_list = res.data.data;
                  this.language_list.splice(0,1);
                }
              }).catch(err => {
        this.$message.error(err);
      })
      /* 获取所有分组 */
      axios.get(this.base_url + "/class")
              .then(res => {
                this.class_list = res.data.data;
              }).catch(err => {
        this.$message.error(err);
        ;
      })
      /* 获取所有算法标签 */
      axios.get(this.base_url + "/tag")
              .then(res => {
                this.tag_list = res.data.data
              }).catch(err => {
        this.$message.error(err);
        ;
      })
    },

    methods: {
      handleChange() {

      },
      /** 获取修改目标的原本信息 */
      requestMessage(){
        axios.get(this.base_url + "/problem/" + this.$route.params.id)
        .then(res => {
          if(res.data.status === 1){
            this.problem_message = res.data.data;
          } else {
            this.$message.error(res.data.message);
          }
        }).catch(err => {
          this.$message.error(err);
        })
      },
      /** 增加测试点组 */
      addCheckPoint() {
        this.input_check_point.push({
          input: '',
          output: ''
        });
      },
      /** 删除测试点组 */
      deleteCheckPoint() {
        this.input_check_point.pop();
      },
      addLimits() {
        this.languages.push({id: null, name: ''});
      },
      delLimits() {
        if (this.languages.length > 0) {
          this.languages.pop();
        }
        this.language_list.push(this.recovery_list.pop());
      },
      chooseLanguage(value){
        for(let i=0;i<this.language_list.length;i++){
          if(this.language_list[i].id === value){
            this.recovery_list.push({id: this.language_list[i].id, name: this.language_list[i].name})
            this.language_list.splice(i,1);
            break;

          }
        }
      },
      /** 上传问题数据 */
      uploadProblem() {
        let request_body = this.problem_data;

        if(this.isEmpty(request_body.title)) {
          this.$message.error("标题不能为空！");
          return;
        }
        if(this.isEmpty(request_body.description)) {
          this.$message.error("问题描述不能为空！");
          return;
        }
        if(this.isEmpty(request_body.sample_output)) {
          this.$message.error("样例输出不能为空！");
          return;
        }
        /*// 增加源代码
        this.input_source_code.forEach((item, index, arr) => {
          if(item.source_code !== undefined) {
            request_body.source_code.push(item);
          }
        });
        // 增加限制
        // TODO: 判断是否为空
        this.input_language.forEach((item, index, arr) => {
          if(item.time !== undefined && item.memory !== undefined) {
            let temp = {
              language_id: item.language_id,
              time: Number(item.time),
              memory: Number(item.memory)
            }
            request_body.limit.push(temp);
          }
        });*/
        //分类
        if(request_body.problem_class === 0) {
          request_body.problem_class = null;
        }

        let problem_data = JSON.stringify(request_body);
        let form_data = new FormData();
        form_data.append('problem_data', problem_data);
        if(this.check_point_upload_type === 'zip') {
          //压缩包上传测试数据
          let check_point_file = this.$refs.input_upload.files[0];
          form_data.append('check_point_file', check_point_file);
        } else {
          //手动上传测试数据
          let check_point_data = JSON.stringify(this.input_check_point);
          form_data.append('check_point_json', check_point_data);
        }

        //请求
        let request_option = {
          url: this.base_url + '/iacs/problem',
          data: form_data,
          method: 'post',
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        axios.request(request_option).then(res => {
          if(res.data.status === 1) {
            this.$message.success("增加成功！");
            this.$router.push("/iacs/problem")
          } else {
            this.$message.error(res.data.message);
          }
        }).catch(err => {
          this.$message.error(err);
        })


      },
      /** 检测字符串是否为空 */
      isEmpty(p) {
        if(p === null || p === '')
          return true;
        return false;
      }
    }
  }
</script>

<style scoped>
  .collapse-view {
    padding: 0 20px;
  }

  p {
    font-size: 14px;
  }

  span {
    font-size: 14px;
    display: inline-block;
  }

  .limit span {
    display: inline-block;
    font-size: 14px;
    margin: 10px 20px;
  }

  .languages span {
    display: inline-block;
    font-size: 14px;
    margin: 10px 20px;
  }

  .limit span.normal {
    width: 120px;
    text-align: center;
    margin-right: 20px
  }

  #vertical_divider {
    height: 15em !important;
    margin: auto 100px;
  }

  .main {
    background-color: white;
    min-width: 400px;
    max-width: 1200px;
    margin: 0 auto;
  }

  #new_problem_msg, #class_tag, #test_data {
    margin: 0 20px;
    padding: 20px;
  }
</style>
