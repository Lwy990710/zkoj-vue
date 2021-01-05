<template>
  <div class="main">
    <el-steps :active="current_step" simple>
      <el-step title="题目基本信息" icon="el-icon-edit"></el-step>
      <el-step title="参考源代码" icon="el-icon-upload"></el-step>
      <el-step title="测试数据" icon="el-icon-s-order"></el-step>
    </el-steps>
    <div v-show="current_step === 0">
      <el-collapse id="add_problem" v-model="activeNames" @change="handleChange">

        <!-- 题目标题 -->
        <el-collapse-item name="collapse-title">
          <template slot="title">
            <div style="padding-left: 20px;font-size: 16px"><strong>题目标题</strong></div>
          </template>
          <div class="collapse-view">
            <el-input v-model="problem_data.title" placeholder="输入题目名称" size="normal"></el-input>
          </div>
        </el-collapse-item>

        <!-- 题目描述 -->
        <el-collapse-item name="collapse-description">
          <template slot="title">
            <div style="padding-left: 20px;font-size: 16px"><strong>题目描述</strong></div>
          </template>
          <div class="collapse-view">
            <mavon-editor
                v-model="problem_data.description"
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
                v-model="problem_data.sample_input">
            </el-input>
            <el-divider id="vertical_divider" direction="vertical"></el-divider>
            <el-input
                type="textarea"
                style="font-size: 14px;width: 40%"
                :autosize="{ minRows: 8, maxRows: 8}"
                resize="none" placeholder="输出样例"
                v-model="problem_data.sample_output">
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
                v-model="problem_data.hint"
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
                v-for="item in class_list"
                v-model="problem_data.problem_class"
                :label="item.id" border>
              {{ item.name }}
            </el-radio>
            <el-divider></el-divider>
            <p>算法标签 :</p>
            <el-checkbox-group v-model="problem_data.tag">
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
            <div>
              <span style="margin-right: 20px">是否公开:</span>
              <el-radio v-model="problem_data.is_private" label="false">是</el-radio>
              <el-radio v-model="problem_data.is_private" label="true">否</el-radio>
            </div>
            <div>
              <span style="margin-right: 20px">难度:</span>
              <el-radio v-model="problem_data.difficulty" label="1">简单</el-radio>
              <el-radio v-model="problem_data.difficulty" label="2">中等</el-radio>
              <el-radio v-model="problem_data.difficulty" label="3">困难</el-radio>
            </div>
            <p>限制 :</p>
            <div class="limit">
              <el-button size="small" @click="addLimits" type="primary"><i class="el-icon-plus"></i></el-button>
              <el-button size="small" @click="delLimits"><i class="el-icon-minus"></i></el-button>
              <span class="normal">默认</span>
              <span>内存(MB) : </span>
              <el-input size="small" style="width: 200px" placeholder="最大运行时间"></el-input>
              <span>时间(ms) : </span>
              <el-input size="small" style="width: 200px" placeholder="最大内存"></el-input>
            </div>
            <div class="languages" v-for="item in languages">
              <el-select v-model="value" placeholder="请选择" style="width: 120px;margin: 10px 20px 10px 120px">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
              <span>内存(MB) : </span>
              <el-input size="small" style="width: 200px" placeholder="最大运行时间"></el-input>
              <span>时间(ms) : </span>
              <el-input size="small" style="width: 200px" placeholder="最大内存"></el-input>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div v-show="current_step === 1">
      <!-- TODO: 源代码 -->
    </div>

    <div v-show="current_step === 2" style="padding: 20px">
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

      </div>
    </div>

    <div style="text-align: center; padding: 20px">
      <el-button
          @click="current_step -= 1"
          type="primary"
          icon="el-icon-arrow-left"
          v-show="current_step > 0">上一步
      </el-button>
      <el-button
          @click="current_step += 1"
          type="primary"
          v-show="current_step < 2">下一步<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </div>

  </div>

</template>

<script>
export default {
  name: "AddProblem",

  data() {
    return {
      /** 问题基本信息 */
      problem_data: {
        title: "",
        description: "",
        sample_input: "",
        sample_output: "",
        hint: "",
        problem_class: 0,
        tag: [],
        is_private: false,
        source_code: [],
        difficulty: 1,
        limit: []
      },
      /** 后端返回的language列表 */
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
    addLimits() {
      let language = 1;
      this.languages.push(language);
    },
    delLimits() {
      if (this.languages.length === 1) {
        this.languages.length = 0;
      }
      this.languages.splice(1, 1);
    },
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
