<template>
    <div id="navBar">
        <b-navbar toggleable="md" type="dark" variant="info">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-navbar-brand>
                <router-link to="/">
                    <span>Rede Social</span>
                </router-link>
            </b-navbar-brand>


            <b-collapse is-nav id="nav_collapse">
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">

                    <b-nav-item v-if="!isLoggedIn">
                        <router-link to="/login" >
                            <span>Login</span>
                        </router-link>
                    </b-nav-item>

                    <b-nav-item-dropdown right v-else>
                        <!-- Using button-content slot -->
                        <template slot="button-content">
                            <em>User</em>
                        </template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
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
</style>