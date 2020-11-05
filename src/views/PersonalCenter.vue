<template>
    <div class="main">
        <el-container>
            <div class="user_msg clear">
                <div class="avatar clear">
                    <el-avatar :size="60" s src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                               style="margin: 0 10px;float: left"></el-avatar>
                    <span style="display: inline-block;float: left;margin-top: 18px;font-size: 20px">用户名</span>

                </div>

                <div class="page_choose">
                    <el-menu
                            router
                            default-active="this.$route.path"
                            class="user_nav">
                        <el-menu-item  index="/userhome">
                            <span slot="title">主页</span>
                        </el-menu-item>
                        <el-menu-item index="/statistics">
                            <span slot="title">统计</span>
                        </el-menu-item>
                        <el-menu-item index="/release">
                            <span slot="title">我的</span>
                        </el-menu-item>
                    </el-menu>
                </div>
            </div>
            <div class="center_content">
                <router-view/>
            </div>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "PersonalCenter",
        beforeRouteEnter(to, from, next) {
            window.document.body.style.backgroundColor = '#EFEFEF';
            next();
        },
        data(){
            return{
                value: new Date(),
            }
        }
    }
</script>

<style scoped>

    .clear::before,
    .clear::after {
        content: '';
        display: table;
        clear: both;
    }

    .main {
        min-width: 800px;
        max-width: 1200px;
        margin: 0 auto;

    }

    .user_msg {
        float: left;
        background-color: white;
        border-right:1px solid #EBEEF5 ;
        box-shadow: 6px 2px 12px 0 rgba(0, 0, 0, 0.1);
        height: 600px;
        min-width: 239px;
        width: 239px;
    }

    .el-menu {
        border-right:0!important;
    }

    .page_choose {
        margin-top: 10px;
    }

    el-main{
        padding: 0!important;
        margin: 0!important;
    }

    .center_content {
        box-shadow: 6px 2px 12px 0 rgba(0, 0, 0, 0.1);
        float: left;
        background-color: white;
        min-width: 960px;
        height: 600px;
    }


</style>
