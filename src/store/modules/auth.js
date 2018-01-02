import axios from 'axios'
import Axios from "axios/index";

const namespaced = true;

const state = {
    status: {
        pending: false,
        logged: false
    },
    token: null,
    user: {
        id: 0,
        name: '',
        followers: [],
        following: [],
        posts: [],
    },
};

const getters = {
    isLoggedIn: state => state.status.logged,
    pending: state => state.status.pending,
    user: state => state.user,
    followers: state => state.user.followers,
    following: state => state.user.following,
    posts: state => state.user.posts,
};

const mutations = {
    login(state, {user, token}) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        state.token = token;
        state.user = user;
        state.status.logged = true;
        state.status.pending = false;
    },
    logout(state) {
        localStorage.removeItem('token');
        state.token = null;
        state.status.logged = false;
        state.user = {};
    },
    setToken(state, token) {
        state.token = token;
        state.status.logged = true;
    },
    setUser(state, user) {
        localStorage.setItem('user', JSON.stringify(user));
        state.user = user;
    },
    setUserPosts(state, posts){
        state.user.posts.push(...posts);
    }
};

const actions = {
    login({commit}, {email, password}) {
        //Mostrando o spinner
        state.status.pending = true;

        return new Promise((resolve, reject) => {
            axios.post('/auth/login', {email, password})
                .then(response => {
                    commit('login', {user: response.data.user, token: response.data.token});
                    Axios.defaults.headers["Authorization"] = 'Bearer ' + localStorage.getItem('token');
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
    register({commit}, {name, email, password, password_confirmation}) {
        //Mostrando o spinner
        commit('logging');

        return new Promise((resolve, reject) => {
            axios.post('/auth/register', {name, email, password, password_confirmation})
                .then(response => {
                    commit('login', {user: response.data.user, token: response.data.token});
                    resolve();
                })
                .catch(response => {
                    state.status.pending = false;
                    reject()
                });
        });
    },
    setToken({state, commit, dispatch}) {
        let token = localStorage.getItem('token');
        if (token && state.token === null) {
            Axios.defaults.headers["Authorization"] = 'Bearer ' + localStorage.getItem('token');
            commit('setToken', token);
            dispatch('loadUser');
        }
    },
    loadUser({commit}) {
        let user = localStorage.getItem('user');
        if (user) {
            commit('setUser', JSON.parse(user));
        }

        axios.get('/auth/user')
            .then(response => {
                commit('setUser', response.data);
            })
            .catch(response => {
                console.log();
            });
    },
    loadUserPosts({state, commit}){

        return new Promise((resolve, reject)=> {
            console.log(state.user);
            axios.get('/posts/' + state.user.posts.length + '?id=' + state.user.id)
                .then(response => {
                    commit('setUserPosts', response.data.posts);
                    resolve(response);
                })
                .catch(response => {
                    //TODO tratar melhor erro
                    reject(response);
                });
        })
    }
};


export default {
    namespaced,
    state,
    getters,
    mutations,
    actions
};