<template>
    <div class="main">
        <div class="try">
            <h1>尝试过的题目</h1>
            <span class="is_finish" v-for="(item,i) in finish">{{item}}</span>
        </div>
        <div class="finish">
            <h1>已完成的题目</h1>
            <span class="is_finish" v-for="(item,i) in finish">{{item}}</span>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Statistics",
        data(){
            return{
                finish: [
                    "P1","P2","P3"
                ]
            }
            alert(this.finish.toString());
        },

        methods:{

        }
    }
</script>

<style scoped>
    .main{
        margin: 20px auto;
        padding: 0px 20px;
    }

    .is_finish{
        display: inline-block;
        margin: 0 10px;
    }
</style>
