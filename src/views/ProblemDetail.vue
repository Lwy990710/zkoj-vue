<template>
  <div class="main clear" v-loading="is_loading_table">
    <el-tabs type="border-card" v-model="current_tab" style="float: left;width: 800px" :before-leave="changeTab">
      <el-tab-pane label="问题详情" name="problem_detail">
        <div class="detail_main">
          <div class="problem_nav">
            <div class="problem_msg_main">
              <h1 class="problem_id">{{ problem_detail.id }} . {{ problem_detail.title }}</h1>
            </div>
            <div class="msg_detail">

              <!--        <span class="msg" v-if="this.problem_detail.difficulty===1">难度：简单</span>-->
              <!--        <span class="msg" v-else-if="this.problem_detail.difficulty===2">难度：中等</span>-->
              <!--        <span class="msg" v-else-if="this.problem_detail.difficulty===3">难度：困难</span>-->
              <span class="msg">总提交数 : {{ this.problem_detail.count }}</span>
              <span class="msg">通过数 : {{ this.problem_detail.accepted }}</span>
            </div>
          </div>

          <div class="problem_main">
            <!-- 问题描述 -->
            <div class="problem_description">
              <h3>问题描述</h3>
              <div class="problem_content" id="problem_description_content">
                <mavon-editor
                    :boxShadow="false"
                    style="max-width: 1000px; margin: 0 auto"
                    previewBackground="#fff"
                    v-model="problem_detail.description"
                    :subfield="false"
                    defaultOpen="preview"
                    :editable="false"
                    :toolbarsFlag="false"
                ></mavon-editor>
              </div>
            </div>

            <!-- 样例输入 -->
            <div class="problem_input">
              <h3>样例输入</h3>
              <div class="problem_input_content" id="problem_input_content">
                {{ this.problem_detail.sample_input }}
              </div>
            </div>
            <!-- 样例输出 -->
            <div class="problem_output">
              <h3>样例输出</h3>
              <div class="problem_output_content" id="problem_output_content">
                {{ this.problem_detail.sample_output }}
              </div>
            </div>
            <!-- 提示 -->
            <div class="problem_hint" style="margin-bottom: 40px">
              <h3>提示</h3>
              <div class="problem_hint_content" id="problem_hint_content">
                <mavon-editor
                  :boxShadow="false"
                  style="max-width: 1000px; margin: 0 auto"
                  previewBackground="#fff"
                  v-model="problem_detail.hint"
                  :subfield="false"
                  defaultOpen="preview"
                  :editable="false"
                  :toolbarsFlag="false">
                </mavon-editor>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="提交答案" name='submit_answer'>
        <div class="answer">
          <div class="language_choose">
            <el-select v-model="value" placeholder="请选择语言" @change="change">
              <el-option v-for="language in language_options"
                         :key="language.value"
                         :label="language.label"
                         :value="language.value">
              </el-option>
            </el-select>
          </div>

          <!--                    <div class="test" style="margin: 20px 0">-->
          <!--                        <textarea id="input_area" ref="mycode" style="height:200px;width:600px;resize: none"></textarea>-->
          <!--                    </div>-->
          <div style="margin: 20px 0">
            <codemirror style="font-size: 14px;border: 1px solid slategray" v-model="code"
                        :options="options"></codemirror>
          </div>
          <div class="btms">
            <el-button type="danger" @click="submit">提交答案</el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <div class="aside_main">
      <p>创建时间:&emsp;{{ this.problem_detail.create_date }}</p>
      <p v-if="this.problem_detail.difficulty===1">难度:<span style="color: green"><strong>&emsp;简单</strong></span>
      </p>
      <p v-else-if="this.problem_detail.difficulty===2">难度:<span style="color: orange"><strong>&emsp;中等</strong></span>
      </p>
      <p v-else-if="this.problem_detail.difficulty===3">难度:<span style="color: red"><strong>&emsp;困难</strong></span></p>
      <p>算法标签:
        <el-tag class="tags" v-for="(item, index) in problem_detail.tag" :key="index" type="danger" effect="dark"
                style="font-size: 14px">{{ item.name }}
        </el-tag>
      </p>
      <p>
        <router-link style="color: cornflowerblue" :to="{path: '/record',query:{problem_id: problem_detail.id }}"><i
            class="el-icon-s-marketing"></i>提交记录
        </router-link>
      </p>
    </div>
    <div class="limit_msg">
      <div>
        <span>语言类型</span>
        <span>最长用时</span>
        <span>最大内存</span>
      </div>
      <div style="line-height: 32px" v-for="item in problem_detail.limit">
        <span v-if="item.language_id===0">默认</span>
        <span v-if="item.language_id===1">C语言</span>
        <span v-if="item.language_id===2">CPP</span>
        <span v-if="item.language_id===3">JAVA</span>
        <span v-if="item.language_id===4">PYTHON</span>
        <span><b>{{ (item.time / 1000).toFixed(2) }} S</b></span>
        <span><b>{{ item.memory }} MB</b></span>
      </div>
    </div>

  </div>
</template>
<script>
import "codemirror/theme/ambiance.css";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint.css";
import {codemirror} from 'vue-codemirror';

let CodeMirror = require("codemirror/lib/codemirror");
// require("codemirror/addon/edit/matchbrackets");
// require("codemirror/addon/selection/active-line");
// require ("codemirror/mode/clike/clike");
// require("codemirror/mode/sql/sql");
// require("codemirror/addon/hint/sql-hint");
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/clike/clike'
import 'codemirror/mode/go/go'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/http/http'
import 'codemirror/mode/php/php'
import 'codemirror/mode/python/python'
import 'codemirror/mode/http/http'
import 'codemirror/mode/sql/sql'
import 'codemirror/mode/vue/vue'
import 'codemirror/mode/xml/xml'
import marked from 'marked';
import hljs from 'highlight.js';

export default {

  name: "problemDetail",
  components: {
    codemirror
  },
  data() {
    return {
      is_loading_table: true,
      problem_detail: {
        id: null,
        title: null,
        description: null,
        sample_input: null,
        sample_output: null,
        hint: null,
        create_date: null,
        diffculty: null,
        accepted: null,
        count: null,
        tag: [],
        problem_class: null,
        limit: []
      },
      language_options: [{
        value: 'Java',
        label: 'Java',
      }, {
        value: 'Python',
        label: 'Python',
      }, {
        value: 'c++',
        label: 'c++'
      }, {
        value: 'c',
        label: 'c'
      }],
      value: '',
      language_id: 1,
      code: '', // 编辑器绑定的值
      // 默认配置
      options: {
        tabSize: 2, // 缩进格式
        lineNumbers: true, // 显示行号
        line: true,
        styleActiveLine: true, // 高亮选中行
        mode: 'text/x-java',
        indentWithTabs: true,
        smartIndent: true,
        matchBrackets: true,
      },
      /** 当前标签页 */
      current_tab: 'problem_detail',
    }
  },
  beforeRouteEnter(to, from, next) {
    window.document.body.style.backgroundImage = 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)'
    ;
    next();
  },

  created() {
    // alert(this.problem_detail.title);
    this.is_loading_table = true;
    axios.get(this.base_url + "/problem/" + this.$route.params.id)
        .then(res => {
          if (res.data.status === 1) {
            this.problem_detail = res.data.data;
            this.is_loading_table = false;
            document.title = this.problem_detail.id + "." + this.problem_detail.title + "|ZKOJ";
          }
        }).catch(err => {
      //请求失败时进入catch
      this.$message.error(err);
      ;
      this.is_loading_table = false;
    });
  },
  mounted() {

    /*let editor = CodeMirror.fromTextArea(document.getElementById("input_area"), {
        mode: 'text/x-java',
        indentWithTabs: true,
        smartIndent: true,
        lineNumbers: true,
        matchBrackets: true,
             extraKeys: {'Ctrl': 'autocomplete'},自定义快捷键
              hintOptions: {自定义提示选项
                  tables: {
                      users: ['name', 'score', 'birthDate'],
                      countries: ['name', 'population', 'size']
                  }
              }
    })
    //代码自动提示功能，记住使用cursorActivity事件不要使用change事件，这是一个坑，那样页面直接会卡死
    editor.on('cursorActivity', function () {
      editor.showHint()
    });

    this.editor = editor;*/
  },
  methods: {
    answer() {
      this.$router.push({
        path: '/answer/' + this.problem_detail.id,
      });
    },
    change() {
      let mime = 'text/x-java'
      if (this.value === 'Java') {
        mime = 'text/x-java'
        this.language_id = 3;
      } else if (this.value === 'Python') {
        mime = 'text/x-python'
        this.language_id = 4;
      } else if (this.value === 'c++') {
        mime = 'text/x-c++src'
        this.language_id = 2;
      } else if (this.value === 'c') {
        mime = 'text/x-c++src'
        this.language_id = 1;
      }

      this.options.mode = mime;

    },
    submit() {
      let source_code = this.code
      let language_id = this.language_id;
      let request_body = {
        code: source_code,
        language_id: language_id
      }
      axios.post(this.base_url + "/solution/problem/" + this.$route.params.id, request_body)
          .then(res => {
            if (res.data.status === 1) {
              this.$message.success("提交成功！");
              this.$router.push("/record?solution_id=" + res.data.data.solution_id);
            } else {
              alert(res.data.message);
            }
          })
    },
    /** 切换标签页触发的前置钩子函数 */
    changeTab(active_name, old_active_name) {

      if(!this.$store.state.is_login && active_name === 'submit_answer') {
        this.$message.error('请登录后提交答案！');
        return false;
      }
    }
  }
}
</script>

<style scoped>

a {
  text-decoration: none;
}

.clear::before,
.clear::after {
  content: '';
  display: table;
  clear: both;
}

.main {
  margin: 0 auto;
  max-width: 1160px;
  width: 1160px;
  min-width: 800px;
}

.detail_main {
  float: left;
  width: 800px;
}

.problem_nav {
  text-align: center;
  margin-bottom: 30px;
}


.problem_msg_main {
  margin-bottom: 20px;
  padding-top: 30px;
}

.msg {
  display: inline-block;
  width: 100px;
}

.time {
  width: 140px;
}

.problem_main {
  line-height: 26px;
  margin-left: 20px;
  width: 730px;
}

.problem_content {
  margin: 20px 0;
}

.submit {
  text-align: center;
  padding-bottom: 40px;
}

.aside_main {
  padding: 20px;
  width: 310px;
  background-color: #FFFFFF;
  float: right;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.limit_msg {
  float: right;
  width: 310px;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  background-color: white;
  padding: 20px;
}

.limit_msg span {
  display: inline-block;
  width: 33%;
  margin-bottom: 5px;
}

.tags {
  margin: 5px;
}

</style>
