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

        <div class="language_choose">
            <el-select v-model="value" placeholder="请选择语言" @change="change">
                <el-option v-for="language in options"
                           :key="language.value"
                           :label="language.label"
                           :value="language.value">
                </el-option>
            </el-select>
        </div>

        <div class="test">
            <textarea ref="mycode"  style="height:200px;width:600px;"></textarea>
        </div>

        <div class="commit">
            <el-button type="primary">提交答案</el-button>
        </div>
    </div>
</template>


<script>
  import "codemirror/theme/ambiance.css";
  import "codemirror/lib/codemirror.css";
  import "codemirror/addon/hint/show-hint.css";
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

    export default {
        name: "AnswerPage",
        data(){
            return{
                options:[{
                    value: 'Java',
                    label: 'Java',
                },{
                    value: 'Python',
                    label: 'Python',
                },{
                    value: 'c++',
                    label: 'c++'
                }],
                value: ''
            }
        },
        mounted () {
            debugger
            let editor = CodeMirror.fromTextArea(this.$refs.mycode, {
                mode: 'text/x-java',
                indentWithTabs: true,
                smartIndent: true,
                lineNumbers: true,
                matchBrackets: true,

                // extraKeys: {'Ctrl': 'autocomplete'},自定义快捷键
                // hintOptions: {自定义提示选项
                //     tables: {
                //         users: ['name', 'score', 'birthDate'],
                //         countries: ['name', 'population', 'size']
                //     }
                // }
            })
            //代码自动提示功能，记住使用cursorActivity事件不要使用change事件，这是一个坑，那样页面直接会卡死
            editor.on('cursorActivity', function () {
                editor.showHint()
            })
        },
        beforeRouteEnter(to,from,next){
            window.document.body.style.backgroundColor = '#EFEFEF';
            next();
        },
        methods: {
            back() {
                this.$router.go(-1);
            },
            change(){
                debugger
                let mime = 'text/x-java'
                if(this.value === 'Java'){
                    mime = 'text/x-java'
                } else if(this.value === 'Python'){
                    mime = 'text/x-python'
                } else if(this.value === 'c++'){
                    mime = 'text/x-c++src'
                }
                // alert(mime);
                let editor = CodeMirror.fromTextArea(this.$refs.mycode, {
                    mode: mime,
                    indentWithTabs: true,
                    smartIndent: true,
                    lineNumbers: true,
                    matchBrackets: true,

                    extraKeys: {'Ctrl': 'autocomplete'},
                    hintOptions: {
                        tables: {
                            users: ['name', 'score', 'birthDate'],
                            countries: ['name', 'population', 'size']
                        }
                    }
                })
                // 代码自动提示功能，记住使用cursorActivity事件不要使用change事件，这是一个坑，那样页面直接会卡死
                editor.on('cursorActivity', function () {
                    editor.showHint()
                })
            }
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

    .language_choose{
        margin: 20px auto;
        width: 600px;
    }

    .test{
        border: solid 1px black;
        margin: 20px auto;
        width: 600px;
        font-size: 11pt;
        font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
    }

    .commit{
        padding-top: 20px;
        text-align: center;
        padding-bottom: 20px;
    }
</style>
