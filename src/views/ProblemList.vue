<template>
    <div class="main">

        <div class="line"></div>
        <div class="question-bar clear">
            <div class="search">
                <el-input v-model="input" placeholder="搜索题目名称或编号"></el-input>
            </div>

            <el-button id="algorithm" type="text" @click="changeAlgorithm" style="display: inline-block;margin: 1px 20px">显示算法标签
            </el-button>

            <el-dropdown @command="choose">
                   <span class="el-dropdown-link">
                      难度<i class="el-icon-arrow-down el-icon--right"></i>
                   </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="1">简单</el-dropdown-item>
                    <el-dropdown-item command="2">中等</el-dropdown-item>
                    <el-dropdown-item command="3">困难</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            <el-dropdown>
                   <span class="el-dropdown-link">
                      状态<i class="el-icon-arrow-down el-icon--right"></i>
                   </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>解决</el-dropdown-item>
                    <el-dropdown-item>未完成</el-dropdown-item>
                    <el-dropdown-item>尝试过</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

        <div class="question-line clear"></div>

        <!--      <div style="width: 140px; background-color: aqua;" class="tags clear">-->
        <!--        <el-tag type="success">简单</el-tag>-->
        <!--        <el-tag type="warning">中等</el-tag>-->
        <!--        <el-tag type="danger">困难</el-tag>-->
        <!--      </div>-->

        <el-tag
                class="tag"
                id="tag_easy"
                type="success"
                closable
                :disable-transitions="false"
                @close="closeTagEasy">
            简单
        </el-tag>

        <el-tag
                class="tag"
                id="tag_normal"
                type="warning"
                closable
                @close="closeTagNormal">
            中等
        </el-tag>

        <el-tag
                class="tag"
                id="tag_difficult"
                type="danger"
                closable
                :disable-transitions="false"
                @close="closeTagDifficult">
            困难
        </el-tag>

        <el-table
                :data="tableData"
                style="width: 100%;">

            <el-table-column
                    prop="status"
                    label="状态"
                    width="80">
                <template slot-scope="scope">
                    <div v-if="scope.row.status===0" class="el-icon-check" style="color: #67C23A;font-size: 22px"></div>
                    <div v-if="scope.row.status > 2" class="el-icon-minus" style="color: #E6A23C;font-size: 22px"></div>
                </template>

            </el-table-column>


            <el-table-column
                    prop="id"
                    label="题号"
                    width="80">
            </el-table-column>

            <el-table-column
                    prop="title"
                    label="题目"
                    width="300">
                <template slot-scope="scope">
                    <router-link :to='"/problem/" + scope.row.id' target="_blank">
                        {{scope.row.title}}
                    </router-link>
                </template>
            </el-table-column>

            <el-table-column
                    class="algorithm"
                    prop="tag"
                    label="算法"
                    width="320">
                    <template slot-scope="scope">
                        <el-tag v-bind:class="{showtags: isShow,hidetags: isHide}" v-for="item in scope.row.tag" type="danger" effect="dark" style="font-size: 14px;margin: 0 5px">{{item.name}}</el-tag>
                    </template>
            </el-table-column>

            <el-table-column
                    prop="problem_class.name"
                    label="分组"
                    width="120">
            </el-table-column>

            <el-table-column
                    prop="difficulty"
                    label="难度"
                    width="120">

                <template slot-scope="scope">
                    <div v-if="scope.row.difficulty === 1" style="color: green">简单</div>
                    <div v-if="scope.row.difficulty === 2" style="color: orange">中等</div>
                    <div v-if="scope.row.difficulty === 3" style="color: red">困难</div>
                </template>

            </el-table-column>

            <el-table-column
                    prop="pass_rate"
                    label="通过率" width="70">
                <template slot-scope="scope">
                    <el-tooltip placement="top">
                        <div slot="content">{{scope.row.accepted}}/{{scope.row.count}}</div>
                        <div>{{scope.row.pass_rate}}</div>
                    </el-tooltip>
                </template>
            </el-table-column>

            <el-table-column>
            </el-table-column>
        </el-table>

        <div class="page" style="text-align: center">
            <div class="page-line"></div>
            <el-pagination
                    :page-sizes="[10,20,30,40]"
                    :page-size="20"
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                    background
                    layout="prev, pager, next, sizes, jumper"
                    :total="100">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "main",
        beforeRouteEnter(to, from, next) {
            window.document.body.style.backgroundColor = '#FFFFFF';
            next();
        },
        data() {
            return {
                input: '',
                tableData: [{
                    id: -1,
                    title: "",
                    count: -1,
                    accepted: 0,
                    difficulty: -1,
                    status: -1,
                    tag: [{
                        id: -1,
                        name: '',
                    }],
                    problem_class: {
                        id: -1,
                        name: '',
                    },
                    pass_rate: -1.0,
                }
                ],
                isShow: false,
                isHide: true,
                flag: false,
                mark: -1,
                page: 1
            }
        },
        created() {
            this.mark = -1;
            //发起get请求
            axios.get(this.base_url + "/problem?page=1")
                .then(res => {
                    console.log("in")
                    //请求成功时进入then(HTTP状态码为200)
                    if (res.data.status === 1) {
                        this.tableData = res.data.data;
                        for (let i = 0; i < this.tableData.length; i++) {
                            if (this.tableData[i].count === 0) {
                                this.tableData[i].pass_rate = "-";
                            } else {
                                this.tableData[i].pass_rate = this.tableData[i].accepted / this.tableData[i].count;
                                this.tableData[i].pass_rate = Number(this.tableData[i].pass_rate * 100).toFixed(1);
                                this.tableData[i].pass_rate = String(this.tableData[i].pass_rate) + "%"
                            }
                        }
                        if (res.data)
                            console.log("in")
                        console.log(this.tableData)
                    }
                })
                .catch(err => {
                    //请求失败时进入catch
                    alert(err);
                });
        },
        methods: {

            changeAlgorithm() {
                let algorithm = document.getElementById("algorithm");
                if(this.isShow === false){
                    algorithm.innerHTML = "隐藏算法标签";
                    this.isShow = true;
                    this.isHide = false;
                } else {
                    algorithm.innerHTML = "显示算法标签";
                    this.isShow = false;
                    this.isHide = true;
                }
            },

            choose(command) {
                this.mark = command;
                axios.get(this.base_url + "/problem?page=" + this.page + "&difficulty=" + command)
                    .then(res => {
                        console.log("in")
                        //请求成功时进入then(HTTP状态码为200)
                        if (res.data.status === 1) {
                            this.tableData = res.data.data;
                            for (let i = 0; i < this.tableData.length; i++) {
                                if (this.tableData[i].count === 0) {
                                    this.tableData[i].pass_rate = "-";
                                } else {
                                    this.tableData[i].pass_rate = this.tableData[i].accepted / this.tableData[i].count;
                                    this.tableData[i].pass_rate = Number(this.tableData[i].pass_rate * 100).toFixed(1);
                                    this.tableData[i].pass_rate = String(this.tableData[i].pass_rate) + "%"
                                }
                            }
                            if (res.data)
                                console.log("in")
                            console.log(this.tableData)
                        }
                    })
                    .catch(err => {
                        //请求失败时进入catch
                        alert(err);
                    });

                let easy = document.getElementById("tag_easy");
                let normal = document.getElementById("tag_normal");
                let difficult = document.getElementById("tag_difficult");
                if (command == 1) {

                    easy.style.float = "left";
                    normal.style.float = "none";
                    difficult.style.float = "none";
                    easy.style.visibility = "visible";
                    normal.style.visibility = "hidden";
                    difficult.style.visibility = "hidden";

                } else if (command == 2) {
                    easy.style.float = "none";
                    normal.style.float = "left";
                    difficult.style.float = "none";
                    easy.style.visibility = "hidden";
                    normal.style.visibility = "visible";
                    difficult.style.visibility = "hidden";
                } else if (command == 3) {
                    easy.style.float = "none";
                    normal.style.float = "none";
                    difficult.style.float = "left";
                    easy.style.visibility = "hidden";
                    normal.style.visibility = "hidden";
                    difficult.style.visibility = "visible";
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },

            handleCurrentChange(val) {
                this.page = val;
                if (this.mark != -1) {
                    axios.get(this.base_url + "/problem?page=" + val + "&difficulty=" + this.mark)
                        .then(res => {
                            console.log("in")
                            //请求成功时进入then(HTTP状态码为200)
                            if (res.data.status === 1) {
                                this.tableData = res.data.data;
                                for (let i = 0; i < this.tableData.length; i++) {
                                    if (this.tableData[i].count === 0) {
                                        this.tableData[i].pass_rate = "-";
                                    } else {
                                        this.tableData[i].pass_rate = this.tableData[i].accepted / this.tableData[i].count;
                                        this.tableData[i].pass_rate = Number(this.tableData[i].pass_rate * 100).toFixed(1);
                                        this.tableData[i].pass_rate = String(this.tableData[i].pass_rate) + "%"
                                    }

                                }
                                console.log("in")
                                console.log(this.tableData)
                            }
                        })
                        .catch(err => {
                            //请求失败时进入catch
                        });
                } else {
                    axios.get(this.base_url + "/problem?page=" + val)
                        .then(res => {
                            console.log("in")
                            //请求成功时进入then(HTTP状态码为200)
                            if (res.data.status === 1) {
                                this.tableData = res.data.data;
                                for (let i = 0; i < this.tableData.length; i++) {
                                    if (this.tableData[i].count === 0) {
                                        this.tableData[i].pass_rate = "-";
                                    } else {
                                        this.tableData[i].pass_rate = this.tableData[i].accepted / this.tableData[i].count;
                                        this.tableData[i].pass_rate = Number(this.tableData[i].pass_rate * 100).toFixed(1);
                                        this.tableData[i].pass_rate = String(this.tableData[i].pass_rate) + "%"
                                    }

                                }
                                console.log("in")
                                console.log(this.tableData)
                            }
                        })
                        .catch(err => {
                            //请求失败时进入catch
                        });
                }
            },
            closeTagEasy() {
                this.mark = -1;
                document.getElementById("tag_easy").style.visibility = "hidden";
                axios.get(this.base_url + "/problem?page=1")
                    .then(res => {
                        console.log("in")
                        //请求成功时进入then(HTTP状态码为200)
                        if (res.data.status === 1) {
                            this.tableData = res.data.data;
                            for (let i = 0; i < this.tableData.length; i++) {
                                if (this.tableData[i].count === 0) {
                                    this.tableData[i].pass_rate = "-";
                                } else {
                                    this.tableData[i].pass_rate = this.tableData[i].accepted / this.tableData[i].count;
                                    this.tableData[i].pass_rate = Number(this.tableData[i].pass_rate * 100).toFixed(1);
                                    this.tableData[i].pass_rate = String(this.tableData[i].pass_rate) + "%"
                                }
                            }
                            if (res.data)
                                console.log("in")
                            console.log(this.tableData)
                        }
                    })
                    .catch(err => {
                        //请求失败时进入catch
                        alert(err);
                    });
            },
            closeTagNormal() {
                this.mark = -1;
                document.getElementById("tag_normal").style.visibility = "hidden";
                axios.get(this.base_url + "/problem?page=1")
                    .then(res => {
                        console.log("in")
                        //请求成功时进入then(HTTP状态码为200)
                        if (res.data.status === 1) {
                            this.tableData = res.data.data;
                            for (let i = 0; i < this.tableData.length; i++) {
                                if (this.tableData[i].count === 0) {
                                    this.tableData[i].pass_rate = "-";
                                } else {
                                    this.tableData[i].pass_rate = this.tableData[i].accepted / this.tableData[i].count;
                                    this.tableData[i].pass_rate = Number(this.tableData[i].pass_rate * 100).toFixed(1);
                                    this.tableData[i].pass_rate = String(this.tableData[i].pass_rate) + "%"
                                }
                            }
                            if (res.data)
                                console.log("in")
                            console.log(this.tableData)
                        }
                    })
                    .catch(err => {
                        //请求失败时进入catch
                        alert(err);
                    });
            },
            closeTagDifficult() {
                this.mark = -1;
                document.getElementById("tag_difficult").style.visibility = "hidden";
                axios.get(this.base_url + "/problem?page=1")
                    .then(res => {
                        console.log("in")
                        //请求成功时进入then(HTTP状态码为200)
                        if (res.data.status === 1) {
                            this.tableData = res.data.data;
                            for (let i = 0; i < this.tableData.length; i++) {
                                if (this.tableData[i].count === 0) {
                                    this.tableData[i].pass_rate = "-";
                                } else {
                                    this.tableData[i].pass_rate = this.tableData[i].accepted / this.tableData[i].count;
                                    this.tableData[i].pass_rate = Number(this.tableData[i].pass_rate * 100).toFixed(1);
                                    this.tableData[i].pass_rate = String(this.tableData[i].pass_rate) + "%"
                                }
                            }
                            if (res.data)
                                console.log("in")
                            console.log(this.tableData)
                        }
                    })
                    .catch(err => {
                        //请求失败时进入catch
                        alert(err);
                    });
            }
        }

    }

</script>

<style scoped>

    a {
        text-decoration: none;
    }

    .router-link-active {
        text-decoration: none;
    }

    .clear::before,
    .clear::after {
        content: '';
        display: table;
        clear: both;
    }

    .main {
        font-size: 20px;
        min-width: 800px;
        max-width: 1200px;
        margin: 0 auto;
        /*width: 80%;*/
        /*border: black solid 1px;*/
    }


    .line {
        border-bottom: 1px solid #e4eaf1;
        background: -webkit-gradient(linear, left top, left bottom, from(white), to(#f7f7f7));
        background: -o-linear-gradient(white, #f7f7f7);
        background: linear-gradient(white, #f7f7f7);
        height: 7px;
        z-index: -3;
        margin-bottom: 20px;
    }

    .search {
        float: left;
        width: 70%;
    }

    .showtags{
        visibility: visible;
    }

    .hidetags{
        visibility: hidden;
    }

    .el-dropdown {
        box-sizing: border-box;
        display: block;
        height: 40px;
        line-height: 40px;
        width: 80px;
        float: left;
    }

    .el-dropdown-link {
        display: inline-block;
        float: right;
        cursor: pointer;
        color: black;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    .question-line {
        width: 100%;
        height: 30px;
    }

    .page-line {
        border-bottom: #DDDDDD 1px solid;
        margin-bottom: 12px;
    }

    el-pagination {
        background-color: #42b983;
    }


    #tag_easy {
        visibility: hidden;
    }

    #tag_normal {
        visibility: hidden;
    }

    #tag_difficult {
        visibility: hidden;
    }
</style>
