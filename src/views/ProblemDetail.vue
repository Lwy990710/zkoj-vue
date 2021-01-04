<template>
    <div class="main clear" v-loading="is_loading_table">
        <div class="detail_main">
            <div class="problem_nav">
                <div class="problem_msg_main">
                    <h1 class="problem_id">{{problem_detail.id}}{{problem_detail.title}}</h1>
                </div>
                <div class="msg_detail">

                    <!--        <span class="msg" v-if="this.problem_detail.difficulty===1">难度：简单</span>-->
                    <!--        <span class="msg" v-else-if="this.problem_detail.difficulty===2">难度：中等</span>-->
                    <!--        <span class="msg" v-else-if="this.problem_detail.difficulty===3">难度：困难</span>-->
                    <span class="msg">总提交数 : {{this.problem_detail.count}}</span>
                    <span class="msg">通过数 : {{this.problem_detail.accepted}}</span>
                </div>
            </div>

            <div class="problem_main">
                <!-- 问题描述 -->
                <div class="problem_description">
                    <h2>问题描述</h2>
                    <div class="problem_content" id="problem_description_content">
                        {{problem_detail.description}}
                    </div>
                </div>

                <!-- 样例输入 -->
                <div class="problem_input">
                    <h2>样例输入</h2>
                    <div class="problem_input_content" id="problem_input_content">
                        {{this.problem_detail.sample_input}}
                    </div>
                </div>
                <!-- 样例输出 -->
                <div class="problem_output">
                    <h2>样例输出</h2>
                    <div class="problem_output_content" id="problem_output_content">
                        {{this.problem_detail.sample_output}}
                    </div>
                </div>
                <!-- 提示 -->
                <div class="problem_hint">
                    <h2>提示</h2>
                    <div class="problem_hint_content" id="problem_hint_content">
                        {{this.problem_detail.hint}}
                    </div>
                </div>
            </div>

            <div class="submit">
                <el-button type="primary" @click="answer">提交答案</el-button>
            </div>
        </div>
        <div class="aside_main">
            <p>创建时间:&emsp;{{this.problem_detail.create_date}}</p>
            <p v-if="this.problem_detail.difficulty===1">难度:<span style="color: green"><strong>&emsp;简单</strong></span>
            </p>
            <p v-else-if="this.problem_detail.difficulty===2">难度:<span style="color: orange"><strong>&emsp;中等</strong></span></p>
            <p v-else-if="this.problem_detail.difficulty===3">难度:<span style="color: red"><strong>&emsp;困难</strong></span></p>
            <p>算法标签:
                <el-tag class="tags" v-for="(item, index) in problem_detail.tag" :key="index" type="danger" effect="dark"
                        style="font-size: 14px">{{item.name}}
                </el-tag>
            </p>
            <p><router-link style="color: cornflowerblue" :to="{path: '/record',query:{problem_id: problem_detail.id }}"><i class="el-icon-s-marketing"></i>提交记录</router-link></p>
        </div>
        <div class="limit_msg">
            <div>
                <span>语言类型</span>
                <span>最长用时</span>
                <span>最大内存</span>
            </div>
            <div v-for="item in problem_detail.limit">
                <span v-if="item.id===0">默认限制</span>
                <span v-if="item.id===1">C语言</span>
                <span v-if="item.id===2">CPP</span>
                <span v-if="item.id===3">JAVA</span>
                <span v-if="item.id===4">PYTHON</span>
                <span>{{item.time}}ms</span>
                <span>{{item.memory}}MB</span>
            </div>
        </div>

    </div>
</template>

<script>
    import marked from 'marked';
    import hljs from 'highlight.js';

    export default {

        name: "problemDetail",
        data() {
            return {
                is_loading_table : true,
                problem_detail: null,
                // problem_detail: {
                //     id: 1,
                //     title: '',
                //     accepted: 0,
                //     count: 0,
                //     description: '',
                //     sample_input: '',
                //     sample_output: '',
                //     hint: '',
                //     create_date: '',
                //     difficulty: -1,
                //     tag: [],
                //     limit: [{
                //         language: '',
                //         time: 1,
                //         memory: ''
                //     }],
                // },
            }
        },
        beforeRouteEnter(to, from, next) {
            window.document.body.style.backgroundColor = '#EFEFEF';
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
                        if (res.data)
                        console.log(this.problem_detail)
                    }
                }).catch(err => {
                //请求失败时进入catch
                alert(err);
                this.is_loading_table = false;
            });
            //请求数据
            // this.problem_detail = {
            //   title : '标题',
            //   description : '这里是描述 \n ## 输入格式 \n\n ## 输出格式',
            //   sample_input : '样例输入',
            //   sample_output : '* 输出1 \n\n\n * 输出2\n\n ```System.out.println("Hello world")```'
            //
            // }

        },
        // mounted() {
        //   hljs.initHighlightingOnLoad();
        //   highlight
        //   marked.setOptions({
        //     highlight: function (code) {
        //       return hljs.highlightAuto(code).value;
        //     }
        //   })
        //
        //   渲染数据
        //   let description = document.getElementById('problem_description_content');
        //   let sample_input = document.getElementById('problem_input_content');
        //   let sample_output = document.getElementById('problem_output_content', {
        //     highlight: function (code) {
        //       return hljs.highlightAuto(code).value;
        //     }
        //   });
        //
        //   description.innerHTML = marked(this.problem_detail['description']);
        //   sample_input.innerHTML = marked(this.problem_detail['sample_input']);
        //   sample_output.innerHTML = marked(this.problem_detail['sample_output']);
        //
        // },
        methods: {
            answer() {
                this.$router.push({
                    path: '/answer/' + this.problem_detail.id,
                    // query: {
                    //     answer_description: this.problem_detail.description,
                    //     answer_sample_input: this.problem_detail.sample_input,
                    //     answer_sample_output: this.problem_detail.sample_output
                    // }
                });
            }
        }
    }
</script>

<style scoped>

    a{
        text-decoration: none;
    }

    .clear::before,
    .clear::after {
        content: '';
        display: table;
        clear: both;
    }

    .main {
        background-color: #EFEFEF !important;
        margin: 0 auto;
        max-width: 1160px;
        width: 1160px;
        min-width: 800px;
    }

    .detail_main {
        float: left;
        width: 800px;
        background-color: #FFFFFF;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
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
        padding-left: 20px;
        text-align: left;
        margin: 0 auto;
        width: 600px;
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

    .limit_msg{
        float: right;
        width: 310px;
        margin-top: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        background-color: white;
        padding: 20px;
    }

    .limit_msg span{
        display: inline-block;
        width: 33%;
        margin-bottom: 5px;
    }

    .tags {
        margin: 5px;
    }
</style>
