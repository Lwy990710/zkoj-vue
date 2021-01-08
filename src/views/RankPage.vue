<template>
    <div class="main">
        <!-- 排行表区域 -->
        <div id="rank_table">
            <el-table
                    :data="rank_list"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop="rank"
                        align="center"
                        label="排名"
                        width="180">
                    <template slot-scope="scope">
                        {{scope.row.rank}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="username"
                        align="center"
                        label="用户名"
                        width="500">
                    <template slot-scope="scope">
                        {{scope.row.username}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="count"
                        align="center"
                        label="总提交数"
                        width="120">
                    <template slot-scope="scope">
                        {{scope.row.count}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="accepted"
                        align="center"
                        label="通过数">
                    <template slot-scope="scope">
                        {{scope.row.accepted}}
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-divider></el-divider>
        <!-- 分页区 -->
        <div class="page" style="text-align: center">
            <el-pagination
                    background
                    page-size="50"
                    layout="prev, pager, next"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RankPage",
        data(){
            return {
              rank_list: null,
              total: null,
            }
        },
        created() {
            /** 请求排行数据 */
            this.requestRankList()
        },
        methods: {
          /** 请求排行数据 */
          requestRankList(){
            axios.get(this.base_url + "/rank")
              .then(res => {
                  if(res.data.status === 1){
                      this.rank_list = res.data.data.rank_list;
                      this.total = res.data.data.count;
                  }
              }).catch(err => {
                  this.$message.error(err);
            })
          }
        },
        beforeRouteEnter(to, from, next) {
            window.document.body.style.backgroundImage = 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)';
            next();
        },
    }
</script>

<style scoped>
    .main{
        padding: 20px;
        background-color: white;
        min-width: 800px;
        width: 1000px;
        max-width: 1200px;
        height: 500px;
        margin: 0 auto;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }
</style>
