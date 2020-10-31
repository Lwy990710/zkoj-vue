<template>
  <div class="main">
    <div class="problem_nav">
      <div class="problem_msg_main">
        <h1 class="problem_id">{{this.problem_data.problem_id}}</h1>
      </div>
      <div class="msg_detail">
        <!--        <span class="msg" v-if="this.problem_data.difficulty===1">难度：简单</span>-->
        <!--        <span class="msg" v-else-if="this.problem_data.difficulty===2">难度：中等</span>-->
        <!--        <span class="msg" v-else-if="this.problem_data.difficulty===3">难度：困难</span>-->
        <span class="msg">难度：简单</span>
        <span class="msg">提交数：1</span>
        <span class="msg">通过数：1</span>
        <span class="msg time">时间限制：1.000s</span>
        <span class="msg">内存：100M</span>
      </div>
    </div>

    <div class="problem_main">
      <!-- 问题描述 -->
      <div class="problem_description">
        <h2>问题描述</h2>
        <div class="problem_content" id="problem_description_content">
          {{this.problem_data.description}}
        </div>
      </div>

      <!-- 样例输入 -->
      <div class="problem_input">
        <h2>样例输入</h2>
        <div class="problem_input_content" id="problem_input_content">
          {{this.problem_data.sample_input}}
        </div>
      </div>
      <!-- 样例输出 -->
      <div class="problem_output">
          <h2>样例输出</h2>
        <div class="problem_output_content" id="problem_output_content">
          {{this.problem_data.sample_output}}
        </div>
      </div>
      <!-- 提示 -->
      <div class="problem_hint">
        <h2>提示</h2>
        <div class="problem_hint_content" id="problem_hint_content">
          {{this.problem_data.hint}}
        </div>
      </div>
    </div>

    <div class="submit">
      <el-button type="primary" @click="answer">提交答案</el-button>
    </div>
  </div>
</template>

<script>
import marked from 'marked';
import hljs from 'highlight.js';

export default {

  name: "questionMain",
  data() {
    return {

      problem_data:{
        problem_id: 1,
        title: '',
        description: '',
        sample_input: '',
        sample_output: '',
        hint: '',
        create_data: '',
        difficulty: -1,
      },
    }
  },
  beforeRouteEnter(to,from,next){
    window.document.body.style.backgroundColor = '#EFEFEF';
    next();
  },

  created() {
    // axios.get(this.base_url + "/problem/2")
    //         .then(res => {
    //           console.log("in");
    //           this.problem_data = res.data.data;
    //           if (res.data)
    //             console.log("in")
    //           console.log(this.problem_data)
    //         }).catch(err => {
    //   //请求失败时进入catch
    //   alert(err);
    // });
    //请求数据
    // this.problem_data = {
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
  //   description.innerHTML = marked(this.problem_data['description']);
  //   sample_input.innerHTML = marked(this.problem_data['sample_input']);
  //   sample_output.innerHTML = marked(this.problem_data['sample_output']);
  //
  // },
  methods: {
    answer() {
      this.$router.push('/answer')
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

</style>