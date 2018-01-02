<template>
    <b-card title="Que tal seguir esses?" id="suggestedUsers">
        <i class="fa fa-sync pointer" aria-hidden="true" :class="{'fa-spin': loading}" @click="reload()"></i>
        <div v-if="suggestedUsers.length > 0">
            <ul class="list-group">
                <li class="list-group-item"
                    v-for="user in suggestedUsers"
                    v-bind:user="user"
                    v-bind:key="user.id">

                    <div class="row" style="margin-top: 3px">
                        <div class="col-md-9">
                            <p class="word-breaker">
                                {{user.name}}
                            </p>
                        </div>
                        <div class="col-md-2 pointer text-success" @click="follow(user.id)">
                            <i class="material-icons">add</i>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div v-else v-show="loading === false">
            <p>Opa, parece que não tem mais usuários para seguir</p>
        </div>
        <div class="text-center" style="color: gray">
            <i class="fa fa-spinner fa-spin fa-5x" aria-hidden="true" v-show="loading"></i>
        </div>
    </b-card>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    export default {
        data() {
            return {
                loading: true,

            }
        },
        computed: {
            ...mapGetters({
                suggestedUsers: 'auth/suggestedUsers'
            })
        },
        methods: {
            follow(id){
                this.$store.dispatch('auth/follow', id).then(()=>{
                    // this.$store.dispatch('post/loadPosts')
                    //TODO refresh posts
                });
            },
            reload(){
                this.loading = true;
                this.$store.dispatch('auth/suggestedUsers').then(()=>{
                    this.loading = false;
                })
            }
        },
        created() {
            this.reload()
        }
    }
</script>

<style type="text/css">
    .pointer{
        cursor: pointer
    }
</style>