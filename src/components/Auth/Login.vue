<template>
    <div class="container">
        <form @submit.prevent="login" class="offset-3 col-6">
            <div class="form-group">
                <label for="email">E-mail</label>
                <input type="email"
                       id="email"
                       name="email"
                       class="form-control"
                       v-model="email"
                       v-validate="'required|email'"
                       :class="{'is-invalid': errors.has('email')}">
                <span v-show="errors.has('email')" class="help error">{{ errors.first('email') }}</span>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password"
                       id="password"
                       name="password"
                       class="form-control"
                       v-model="password"
                       v-validate="'required|min:6'"
                       :class="{'is-invalid': errors.has('password')}">
                <span v-show="errors.has('password')" class="help error">{{ errors.first('password') }}</span>
            </div>
            <p class="error" v-if="loginFail">Opa, parece que não encontramos seu email ou senha.</p>
            <button type="submit" class="btn btn-default" v-if="!pending">Sign in</button>
            <i class="fa fa-spinner" v-else></i>
            <span v-show="trySubmitWithErrors" class="help error">Fix the erros before register</span>
        </form>
        Description
        errorBagName	errors	The name of the `ErrorBag` object that will be injected in each of Vue's instances' data.
        fieldsBagName	fields	The name of the Fields (flags) object that will be injected in each of Vue's instances' data.
        delay	0	The default debounce time for all inputs (only affects validations).
        locale	en	The default language for the validation messages.
        dictionary	null

        A dictionary to be merged with the validators dictionary. (Check the [custom messages](rules.html#custom-messages) and [localization](loc
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                email: '',
                password: '',
                trySubmitWithErrors: false,
                loginFail:false
            }
        },
        computed: {
            ...mapGetters({
                pending: 'auth/pending'
            })
        },
        methods: {
            login() {
                this.loginFail = false;
                this.trySubmitWithErrors = false;
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.$store
                            .dispatch('auth/login', {email: this.email, password: this.password})
                            .then(response => {
                                this.$router.push('/')
                            })
                            .catch(response => {
                                //TODO Tratar melhor os erros
                                this.loginFail = true;
                            });
                        return;
                    }

                    this.trySubmitWithErrors = true;


                });
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