<template lang="html">
    <div>
        <b-card>
            <div class="row">
                <div class="col-md-10 col-xs-10">
                    <h4 >{{post.user.name}} - {{post.user.email}}</h4>
                </div>

                <div class="col-md-1 col-xs-1">
                    <b-dropdown class="button-menu" right v-if="typeof user !== 'undefined'">
                        <b-dropdown-item class="item pointer text-danger" @click="removePost(post)" v-if="user.id === post.user.id">
                            <i class="material-icons">delete</i>
                            <span style="margin-top: 3px;margin-left: 3px;position: absolute;">Remover</span>
                        </b-dropdown-item>
                      <b-dropdown-item class="item pointer text-danger" @click="follow(post.user.id)" v-else>
                        <i class="material-icons">delete</i>
                        <span style="margin-top: 3px;margin-left: 3px;position: absolute;">Unfollow</span>
                      </b-dropdown-item>
                    </b-dropdown>
                </div>
            </div>
            <div class="row">
                <div class="col-md-9">
                    <p>{{post.text}}</p>

                </div>
            </div>
        </b-card>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    export default {
        name:'post-item',
        props: ['post'],
        methods:{
            ...mapActions({
                removePost: 'post/removePost',
                follow: 'auth/follow'
            })
        },
        computed:{
            ...mapGetters({
                user: 'auth/user'
            })
        }


    }
</script>

<style scoped>
    .button-menu{
        margin-left: 35px;
    }

    h4, p{
        word-break: break-all
    }
</style>
