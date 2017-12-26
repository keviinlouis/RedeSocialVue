<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <new-post></new-post>

            </div>
            <div class="col-md-8">
                <b-card title="Dashboard">
                    <list-posts :posts="posts"></list-posts>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
    import NewPost from './Post/New.vue';
    import ListPost from './Post/List.vue';
    import {mapGetters} from 'vuex';

    export default {
        name: "dashboard",
        computed:{
            ...mapGetters({
                posts: 'post/allPosts'
            })
        },
        components: {
            'new-post': NewPost,
            'list-posts': ListPost
        }
    }
</script>

<style scoped>
    .container {
        margin-top: 30px;
    }
</style>