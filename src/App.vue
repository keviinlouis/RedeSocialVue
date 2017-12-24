<template>
    <div id="app">
        <nav-component></nav-component>
        <router-view></router-view>
    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css';
    import 'bootstrap-vue/dist/bootstrap-vue.css';
    import Nav from './components/Nav.vue'

    export default {
        name: 'app',
        components: {
           'nav-component':Nav,
        }
    }
</script>
