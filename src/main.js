// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store/index.js';
import BootstrapVue from 'bootstrap-vue';
import Axios from 'axios';
import VueAxios from 'vue-axios';
import Echo from "laravel-echo";
import Pusher from "pusher-js";

import VeeValidate, {Validator} from 'vee-validate';
import ptBr from 'vee-validate/dist/locale/pt_BR';

Validator.localize('pt_BR', ptBr);
Vue.use(VeeValidate, {locale: 'pt_BR'});

Vue.use(VueAxios, Axios);
Vue.use(BootstrapVue);

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: '07f43a070fddea604b98',
  // cluster: 'eu',
  // encrypted: false
});


Vue.config.productionTip = false;

Axios.defaults.baseURL = 'https://rede-social-webservice.herokuapp.com/api';



Axios.defaults.headers["Content-type"] = 'application/json';
Axios.defaults.headers["Access-Control-Allow-Origin"] = '*';
Axios.defaults.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin';


new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
});
