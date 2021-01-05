<template>
    <div class="main">
        <el-collapse id="add_problem" v-model="activeNames" @change="handleChange">
            <!-- 题目信息 -->
            <el-collapse-item name="1">
                <template slot="title">
                    <div style="padding-left: 20px;font-size: 16px"><strong>题目信息</strong></div>
                </template>
                <div id="new_problem_msg">
                    <p>是否公开 :</p>
                    <el-radio v-model="is_private" label="false" >是</el-radio>
                    <el-radio v-model="is_private" label="true">否</el-radio>
                    <p>选择难度 :</p>
                    <el-radio v-model="difficulty" label="1">简单</el-radio>
                    <el-radio v-model="difficulty" label="2">中等</el-radio>
                    <el-radio v-model="difficulty" label="3">困难</el-radio>
                    <el-divider></el-divider>
                    <p>题目名字 :</p>
                    <el-input v-model="new_title" placeholder="输入新增题目名" size="small" style="width: 400px"></el-input>
                    <el-divider></el-divider>
                    <p>题目描述 :</p>
                    <el-input
                      type="textarea"
                      style="font-size: 16px"
                      :autosize="{ minRows: 6, maxRows: 6}"
                      resize="none"
                      placeholder="题目描述"
                      v-model="new_describe">
                    </el-input>
                    <el-divider></el-divider>
                    <span style="width: 50%">样例输入 :</span><span style="width: 50%">样例输出 :</span>
                    <br><br>
                    <el-input
                      type="textarea"
                      style="font-size: 14px;width: 400px"
                      :autosize="{ minRows: 8, maxRows: 8}"
                      resize="none" placeholder="样例输入"
                      v-model="new_input">
                    </el-input>
                    <el-divider id="vertical_divider" direction="vertical"></el-divider>
                    <el-input
                      type="textarea"
                      style="font-size: 14px;width: 400px"
                      :autosize="{ minRows: 8, maxRows: 8}"
                      resize="none" placeholder="样例输出"
                      v-model="new_output">
                    </el-input>
                    <el-divider></el-divider>
                    <p>提示 :</p>
                    <el-input
                      type="textarea"
                      style="font-size: 16px"
                      :autosize="{ minRows: 6, maxRows: 6}"
                      resize="none" placeholder="输入提示"
                      v-model="new_output">
                    </el-input>
                    <el-divider></el-divider>
                    <p>限制 :</p>
                    <div class="limit">
                        <el-button size="small" @click="addLimits" type="primary" ><i class="el-icon-plus"></i></el-button>
                        <el-button size="small" @click="delLimits"><i class="el-icon-minus"></i></el-button>
                        <span class="normal">默认</span>
                        <span>内存(MB) : </span><el-input size="small" style="width: 200px" placeholder="最大运行时间"></el-input>
                        <span>时间(ms) : </span><el-input size="small" style="width: 200px" placeholder="最大内存"></el-input>
                    </div>
                    <div class="languages" v-for="item in languages">
                        <el-select  v-model="value" placeholder="请选择" style="width: 120px;margin: 10px 20px 10px 120px" >
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <span>内存(MB) : </span><el-input size="small" style="width: 200px" placeholder="最大运行时间"></el-input>
                        <span>时间(ms) : </span><el-input size="small" style="width: 200px" placeholder="最大内存"></el-input>
                    </div>
                </div>
            </el-collapse-item>
            <!-- 算法和分组 -->
            <el-collapse-item name="2">
                <template slot="title">
                    <div style="padding-left: 20px;font-size: 16px"><strong>算法标签及分组</strong></div>
                </template>
                <div id="class_tag">
                    <p>分组 :</p>
                    <el-checkbox-group v-model="checked_class">
                       <el-checkbox style="display: inline-block;margin: 5px" v-for="item in class_list" :key="item.id" :label="item.id" border>{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                    <el-divider></el-divider>
                    <p>算法标签 :</p>
                    <el-checkbox-group v-model="checked_tag">
                        <el-checkbox style="display: inline-block;margin: 5px" v-for="item in tag_list" :key="item.id" :label="item.id" border>{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </el-collapse-item>
            <!-- 评测数据 -->
            <el-collapse-item name="3">
                <template slot="title">
                    <div style="padding-left: 20px;font-size: 16px"><strong>评测数据</strong></div>
                </template>
                <div id="test_data">
                  <p>评测数据 :</p>
                    <el-input
                      type="textarea"
                      style="font-size: 16px"
                      :autosize="{ minRows: 6, maxRows: 6}"
                      resize="none"
                      placeholder="输入评测数据"
                      v-model="new_tip">
                    </el-input>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>

</template>

<script>
    export default {
        name: "AddProblem",

        data(){
            return {
                languages: [],
                is_private: null,
                difficulty: null,
                activeNames: ['1'],
                new_title: '',
                new_describe: '',
                new_input: '',
                new_output: '',
                new_tip: '',
                class_list: null,
                checked_class: [],
                tag_list: null,
                checked_tag: [],
            }
        },

        created() {
            /* 获取所有分组 */
            axios.get(this.base_url + "/class")
            .then(res => {
                this.class_list = res.data.data;
            }).catch(err =>{
                this.$message.error(err);;
            })
            /* 获取所有算法标签 */
            axios.get(this.base_url + "/tag")
            .then(res => {
                this.tag_list = res.data.data
            }).catch(err => {
                this.$message.error(err);;
            })
        },

        methods: {
            handleChange(){

            },
            addLimits(){
              let language = 1;
              this.languages.push(language);
            },
            delLimits(){
                if(this.languages.length === 1){
                    this.languages.length = 0;
                }
                this.languages.splice(1, 1);
            }
        }
    }
</script>

<style scoped>

    p{
        font-size: 14px;
    }

    span{
        font-size: 14px;
        display: inline-block;
    }

    .limit span{
        display: inline-block;
        font-size: 14px;
        margin: 10px 20px;
    }

    .languages span{
        display: inline-block;
        font-size: 14px;
        margin: 10px 20px;
    }

    .limit span.normal{
        width: 120px;text-align: center;
        margin-right: 20px
    }

    #vertical_divider{
        height: 15em !important;
        margin: auto 100px;
    }

    .main{
        min-width: 800px;
        max-width: 1200px;
        width: 1200px;
        margin: 0 auto;
    }

    #new_problem_msg, #class_tag, #test_data{
        margin: 0 20px;
        padding: 20px;
    }
</style>
