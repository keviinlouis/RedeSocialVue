<template>
    <div class="container">
        <form @submit.prevent="register" class="offset-3 col-6">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text"
                       id="name"
                       name="name"
                       class="form-control input"
                       v-model="name"
                       v-validate="'required'"
                       :class="{'is-invalid': errors.has('name')}"
                       required>
                <span v-show="errors.has('name')" class="help error">{{ errors.first('name') }}</span>
            </div>
            <div class="form-group">
                <label class="label" for="email">E-mail</label>
                <input type="email"
                       id="email"
                       name="email"
                       class="form-control"
                       v-model="email"
                       v-validate="'required|email'"
                       :class="{'is-invalid': errors.has('email')}"
                       required>
                <span v-show="errors.has('email')" class="help error">{{ errors.first('email') }}</span>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password"
                       id="password"
                       name="password"
                       class="form-control input"
                       v-model="password"
                       v-validate="'required|min:6|confirmed:password_confirmation'"
                       :class="{'is-invalid': errors.has('password')}"
                       required>
                <span v-show="errors.has('password')" class="help error">{{ errors.first('password') }}</span>
            </div>
            <div class="form-group">
                <label for="password_confirmation">Confirm Password</label>
                <input type="password"
                       id="password_confirmation"
                       name="password_confirmation"
                       class="form-control input"
                       v-model="password_confirmation"
                       v-validate="'required|min:6'"
                       :class="{'is-invalid': errors.has('password_confirmation')}"
                       required>
                <span v-show="errors.has('password_confirmation')" class="help error">{{ errors.first('password_confirmation') }}</span>
                <!--TODO Mensagem de erro na confirmação errada-->
            </div>
            <button type="submit" class="btn btn-default" v-if="!pending">Submit</button>
            <i class="fa fa-spinner" v-else></i>
            <span v-show="trySubmitWithErrors" class="help error">Fix the erros before register</span>
        </form>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'register',
        data() {
            return {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                trySubmitWithErrors: false,

            }
        },
        computed: {
            ...mapGetters({
                pending: 'auth/pending'
            })
        },
        methods: {
            register() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.$store
                            .dispatch('auth/register', {
                                name: this.name,
                                email: this.email,
                                password: this.password,
                                password_confirmation: this.password_confirmation
                            })
                            .then(() => {
                                this.trySubmitWithErrors = false;
                                this.$router.push('/')
                            })
                            .catch(() => {
                                //TODO tratar melhor os erros
                                this.trySubmitWithErrors = true;
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