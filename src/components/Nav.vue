<template>
    <div id="navBar">
        <b-navbar toggleable="md" type="dark" variant="info">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <router-link to="/" tag="b-navbar-brand" >
                <span class="has-link">Rede Social</span>
            </router-link>


            <b-collapse is-nav id="nav_collapse">
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">

                    <b-nav-item v-if="!isLoggedIn">
                        <b-link to="/login" >
                            <span>Login</span>
                        </b-link>
                    </b-nav-item>
                    <b-nav-item v-if="!isLoggedIn">
                        <b-link to="/register" >
                            <span>Register</span>
                        </b-link>
                    </b-nav-item>

                    <b-nav-item-dropdown right v-else>
                        <!-- Using button-content slot -->
                        <template slot="button-content">
                            <em>User</em>
                        </template>

                        <b-dropdown-item class="has-link">
                            <b-link to="/me">
                                <span>Profile</span>
                            </b-link>
                        </b-dropdown-item>
                        <b-dropdown-item @click="logout">Signout</b-dropdown-item>
                    </b-nav-item-dropdown>
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