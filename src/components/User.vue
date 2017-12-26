<template>
    <div class="container">
        <div class="row">
            <post-list :posts="posts"></post-list>
        </div>
    </div>
</template>

<script>
    import PostList from './Post/List';
    import {mapGetters} from 'vuex';

    export default {
        name: "user",
        data() {
            return {
                id: mapGetters.call('auth/user')
            }
        },
        created(){

        },
        computed: {
            posts() {
                return mapGetters.call('post/userPosts', this.id)
            }
        },
        components: {
            'post-list': PostList
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>