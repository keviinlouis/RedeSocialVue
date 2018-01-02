<template lang="html">
    <b-card title="Postar"
            tag="article"
            style="max-width: 20rem;"
            class="mb-2">
            <textarea
                    id="post"
                    rows="3"
                    class="form-control"
                    style="resize: none"
                    maxlength="140"
                    @keyup.enter="newPost"
                    v-model="text">
                </textarea>
        <div class="alert alert-danger small"
             style="margin-top: 10px; display:none"
             id="errorSendPost">
            Insira algum texto antes de postar
        </div>

        <button class="btn btn-default pull-right"
                style="margin-top: 10px"
                v-on:click="newPost">
            Postar :)
        </button>
        <div id="loadingSendPost" style="height: 69px; margin-right: 31px;display: none"
             class="cssload-container pull-right">
            <div class="cssload-whirlpool"></div>
        </div>
    </b-card>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'new-post',
        data() {
            return {
                text: ""
            }
        },
        methods: {
            newPost() {
                this.$store.dispatch('post/newPost', this.text);
                this.text = "";
            }
        }

    }
</script>
