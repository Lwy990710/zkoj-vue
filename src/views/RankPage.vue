<template>
    <div class="main">

    </div>
</template>

<script>
    export default {
        name: "RankPage",
        beforeRouteEnter(to, from, next) {
            window.document.body.style.backgroundImage = 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)';
            next();
        },
    }
</script>

<style scoped>

</style>
