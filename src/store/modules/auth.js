import axios from 'axios'
import Axios from "axios/index";

const namespaced = true;

const state = {
    status: {
      pending: false,
      logged: false
    },
    token: null,
    user: {},
};

const getters = {
    isLoggedIn: state => {
        return state.status.logged
    },
    pending: state => state.status.pending,
    user: state => {
        return state.user
    },
};

const mutations = {
    login(state, {user, token}) {
        localStorage.setItem('token', token);
        state.token = token;
        state.user = user;
        state.status.logged = true;
        state.status.pending = false;
    },
    logout(state) {
        localStorage.removeItem('token');
        state.token = null;
        state.status.logged = false;
    },
    setToken(state, token){
        state.token = token;
        state.status.logged = true;
    },
    setUser(state, user){
        state.user = user;
    }
};

const actions = {
    login({commit}, {email, password}) {
        //Mostrando o spinner
        state.status.pending = true;

        return new Promise((resolve, reject) => {
            axios.post('/auth/login',  {email, password})
                .then(response => {
                    commit('login', {user:response.data.user, token: response.data.token});
                    resolve();
                })
                .catch(response => {
                    state.status.pending = false;
                    reject()
                });
        });

    },
    logout({commit}) {
        commit('logout')
    },
    setToken({commit}){
        let token = localStorage.getItem('token');
        if(token) {
            Axios.defaults.headers["Authorization"] = 'Bearer '+localStorage.getItem('token');
            commit('setToken', token);

            if (Object.keys(state.user).length === 0) {
                axios.get('/auth/user', {
                    headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
                })
                .then(response => {
                    commit('setUser', response.data);

                })
                .catch(response => {
                    //TODO tratar melhor erro
                });
            }
        }
    },
    register({commit}, {name, email, password, password_confirmation}){
        //Mostrando o spinner
        commit('logging');

        return new Promise((resolve, reject) => {
            axios.post('/auth/register',  {name, email, password, password_confirmation})
                .then(response => {
                    commit('login', {user:response.data.user, token: response.data.token});
                    resolve();
                })
                .catch(response => {
                    state.status.pending = false;
                    reject()
                });
        });
    }
};


export default {
    namespaced,
    state,
    getters,
    mutations,
    actions
};