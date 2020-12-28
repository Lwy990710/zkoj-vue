<template>
    <div class="main">
        <div class="posts" v-for="item in post_card">

            <div class="name">
                {{item.username}}
            </div>
            <div class="title">
                {{item.title}}
            </div>
            <div class="time">
                {{item.release_time}}
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "DiscussionPage",
        data() {
            return {
                post_card: [{
                    username: "test1",
                    title: '第一个帖子',
                    release_time: '2020-11-26'
                },
                    {
                        username: "test2",
                        title: '第二个帖子',
                        release_time: '2020-11-27'
                    },
                    {
                        username: "test3",
                        title: '第三个帖子',
                        release_time: '2020-11-28'
                    }]
            }
        },
        beforeRouteEnter(to, from, next) {
            window.document.body.style.backgroundColor = '#EFEFEF';
            next();
        },
    }
</script>

<style scoped>

    .main {
        padding: 20px;
        margin: 0 auto;
        min-width: 1000px;
        width: 1000px;
        height: 800px;
        border: 1px solid black;
    }

    .posts {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin: 10px 0;
        width: 100%;
        height: 70px;
        background-color: white;
    }

    .name {
        height: 70px;
        line-height: 70px;
        text-align: center;
        width: 30%;
        float: left;
    }

    .title {
        height: 70px;
        line-height: 70px;
        text-align: center;
        width: 30%;
        float: left;
    }

    .time {
        height: 70px;
        line-height: 70px;
        text-align: center;
        width: 30%;
        float: left;
    }
</style>
