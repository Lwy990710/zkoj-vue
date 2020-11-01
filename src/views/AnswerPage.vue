<template>
    <div class="main" >
        <div class="answer_main">
            <div class="back">
                <el-button type="primary" @click="back">返回题目</el-button>
            </div>
            <!-- 问题描述 -->
            <div class="answer_problem_description">
                <h2>问题描述</h2>
                <div class="answer_problem_content" id="answer_problem_description_content">
                    这里是问题描述
                </div>
            </div>
        </div>
        <div>
            -----------------------------代码编译器测试-------------------------------
        </div>
        <div class="test">
          <textarea ref="mycode" class="codesql" v-model="code" style="height:200px;width:600px;"></textarea>
        </div>
    </div>
</template>


<script>
  import "codemirror/theme/ambiance.css";
  import "codemirror/lib/codemirror.css";
  import "codemirror/addon/hint/show-hint.css";
  let CodeMirror = require("codemirror/lib/codemirror");
  require("codemirror/addon/edit/matchbrackets");
  require("codemirror/addon/selection/active-line");
  require ("codemirror/mode/clike/clike");
  require("codemirror/mode/sql/sql");
  require("codemirror/addon/hint/sql-hint");

  export default {
    name: "AnswerPage",
    data () {
      return {
        code: '//按Ctrl键进行代码提示'
      }
    },
    mounted () {
      debugger
      let mime = 'text/x-java'
      //let theme = 'ambiance'//设置主题，不设置的会使用默认主题
      let editor = CodeMirror.fromTextArea(this.$refs.mycode, {
        mode: mime,//选择对应代码编辑器的语言，我这边选的是数据库，根据个人情况自行设置即可
        indentWithTabs: true,
        smartIndent: true,
        lineNumbers: true,
        matchBrackets: true,
        //theme: theme,
        // autofocus: true,
        extraKeys: {'Ctrl': 'autocomplete'},//自定义快捷键
        hintOptions: {//自定义提示选项
          tables: {
            users: ['name', 'score', 'birthDate'],
            countries: ['name', 'population', 'size']
          }
        }
      })
      //代码自动提示功能，记住使用cursorActivity事件不要使用change事件，这是一个坑，那样页面直接会卡死
      editor.on('cursorActivity', function () {
        editor.showHint()
      })
    },
      methods: {
          back() {
              this.$router.go(-1);
          },
          beforeRouteEnter(to,from,next){
              window.document.body.style.backgroundColor = '#EFEFEF';
              next();
          },
      }
  }

</script>

<style scoped>

    .main {
        background-color: #ffffff!important;
        margin: 0 auto;
        max-width: 800px;
        min-width: 800px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }

    .answer_main{
        width: 600px;
        margin: 0 auto;
    }

    .back{
        padding-top: 20px;
        text-align: center;
    }

    .answer_problem_content{
        text-indent: 2em;
    }
</style>
