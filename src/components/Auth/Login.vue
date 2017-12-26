<template>
    <div class="container">

        <form @submit.prevent="login" class="offset-3 col-6">
            <div class="form-group">
                <label for="email">E-mail</label>
                <input type="email"
                       id="email"
                       class="form-control"
                       v-model="email" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password"
                       id="password"
                       class="form-control"
                       v-model="password"
                       required
                       @keyup.enter="login">
            </div>
            <p class="error" v-if="error">Opa, parece que não encontramos seu email ou senha.</p>
            <button type="submit" class="btn btn-default" @click="login" v-if="!pending">Sign in</button>
            <i class="fa fa-spinner" v-else></i>
        </form>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                email: 'teste@teste.com',
                password: '',
                error: false,
            }
        },
        computed: {
            ...mapGetters({
                pending: 'auth/pending'
            })
        },
        methods: {
            login() {
                this.$store
                    .dispatch('auth/login', {email: this.email, password: this.password})
                    .then(response => {
                        this.$router.push('/')
                    })
                    .catch(response => {
                        this.error = true;
                    })
            }
        }
    }
</script>

<style scoped>
    .container {
        margin-top: 30px;
    }

    .error {
        color: red;
    }
</style>