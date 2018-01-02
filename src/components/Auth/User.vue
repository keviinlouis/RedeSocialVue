<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <b-card title="Infos">
                    <p>{{user.name}}</p>
                    <p>Following: {{user.following.length}}</p>
                    <p>Followers: {{user.followers.length}}</p>
                </b-card>
            </div>
            <div class="col-md-8">
                <b-card title="Posts" id="posts">
                    <post-list :posts="posts"></post-list>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
    import PostList from '../Post/List';
    import {mapGetters} from 'vuex';

    export default {
        name: "user",
        data() {
            return {
                loading: true,
                needToLoad: true
            }
        },
        computed: {
            ...mapGetters({
                user: 'auth/user',
                posts: 'auth/posts'
            })
        },
        components: {
            'post-list': PostList
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
                    let wrap = document.getElementById('posts');
                    let contentHeight = wrap.offsetHeight;
                    let yOffset = window.pageYOffset;
                    let y = yOffset + window.innerHeight;
                    if (y >= contentHeight) {
                        this.loadPosts();
                    }
                }
            },
            loadPosts(){
                this.loading = true;
                this.$store.dispatch('auth/loadUserPosts').then((response) => {
                    this.loading = false;
                    if(response.data._meta._next === null){
                        this.needToLoad = false;
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>