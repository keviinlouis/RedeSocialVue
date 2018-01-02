<template lang="html">
    <div id="posts" v-if="posts.length > 0">
        <post-item
                v-for="(post, index) in posts"
                :key="post.id"
                :post="post"
                :index="index"
                class="post"></post-item>

        <div id="loading" style="height: 100px; display: none" class="cssload-container">
            <div class="cssload-whirlpool"></div>
        </div>
    </div>
    <div class="empty" v-else>
        Nothing here yet!
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    import Post from './Item.vue';

    export default {
        components: {
            'post-item': Post
        },
        props: ["posts"],
        computed: {
            ...mapGetters({
                isLoggedIn: 'auth/isLoggedIn'
            })
        }
    };
</script>


<style scoped>
    .post {
        margin-bottom: 10px;
    }
</style>