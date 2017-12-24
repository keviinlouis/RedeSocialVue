import Vue from 'vue';
import Vuex from 'vuex';
import post from './modules/post.js'
import auth from './modules/auth.js'

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        post,
        auth
    }
});