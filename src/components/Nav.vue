<template>
    <div id="navBar">
        <b-navbar toggleable="md" type="dark" variant="info">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-navbar-brand to="/">
                Rede Social
            </b-navbar-brand>


            <b-collapse is-nav id="nav_collapse">
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">

                    <b-nav-item v-show="!isLoggedIn" to="/login">
                        Login
                    </b-nav-item>
                    <b-nav-item to="/me" v-show="isLoggedIn">
                        Profile
                    </b-nav-item>

                    <b-nav-item @click="logout" v-show="isLoggedIn">
                        Signout
                    </b-nav-item>
                </b-navbar-nav>

            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "nav-component",
        computed: {
            ...mapGetters({
                isLoggedIn: 'auth/isLoggedIn'
            })
        },
        methods:{
            logout(){
                this.$store.dispatch("auth/logout").then(() => {
                    this.$router.push("/login")
                });
            },

        }
    }
</script>

<style scoped>
    span {
        color: white;
    }
    .has-link {
        padding: 0 !important;
    }
    .has-link > div {
        cursor: pointer;
        padding: 0.5rem 1rem;
    }
</style>