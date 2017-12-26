// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store/index.js';
import BootstrapVue from 'bootstrap-vue';
import Axios from 'axios';
import VueAxios from 'vue-axios';

import VeeValidate from 'vee-validate';


Vue.use(VeeValidate, {
    locale: 'pt'
});

Vue.use(VueAxios, Axios);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

Axios.defaults.baseURL = 'http://localhost:8000/api';


new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
});
