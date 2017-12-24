<template>
    <div class="alert msg-nav alert-{{type}}" id="msg-nav" v-show="show">
        {{msg}}
    </div>
</template>

<script>
    export default {
        name: "alert",
        props: ["msg", "show", "type"]
    }
</script>

<style scoped>

</style>