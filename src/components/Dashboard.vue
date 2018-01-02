<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <new-post></new-post>
                <sugested-users></sugested-users>
            </div>
            <div class="col-md-8">
                <b-card title="Dashboard" id="dashboard">
                    <list-post :posts="posts"></list-post>
                    <div class="text-center" style="color: gray">
                        <i class="fa fa-spinner fa-spin fa-5x" aria-hidden="true" v-show="loading && needToLoad"></i>
                        <i class="fa fa-circle" aria-hidden="true" v-show="!needToLoad"></i>
                    </div>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
    import NewPost from './Post/New.vue';
    import ListPost from './Post/List.vue';
    import SugestedUsers from "./SugestedUsers";
    import {mapGetters} from 'vuex';

    export default {
        name: "dashboard",
        data() {
            return {
                loading: true,
                needToLoad: true
            }
        },
        computed: {
            ...mapGetters({
                posts: 'post/allPosts'
            })
        },
        components: {
            SugestedUsers,
            NewPost,
            ListPost
        },
        created() {
            this.loadPosts();
            window.onscroll = this.yHandler;
        },

        methods: {
            yHandler() {
                if (!this.loading && this.needToLoad) {
                    // Watch video for line by line explanation of the code
                    // http://www.youtube.com/watch?v=eziREnZPml4
                    let wrap = document.getElementById('dashboard');
                    let contentHeight = wrap.offsetHeight;
                    let yOffset = window.pageYOffset;
                    let y = yOffset + window.innerHeight;
                    if (y >= contentHeight) {
                        this.loadPosts();
                    }
                }
            },
            loadPosts() {
                this.loading = true;
                this.$store.dispatch('post/loadPosts').then((response) => {
                    this.loading = false;
                    if (response.data._meta._next === null) {
                        this.needToLoad = false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    #dashboard {
        margin-bottom: 50px;
    }
</style>