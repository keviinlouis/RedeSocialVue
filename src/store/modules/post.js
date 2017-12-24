import axios from "axios/index";

const namespaced = true;

const state = {
    posts: []
};

const getters = {
    allPosts: state => {
        return state.posts;
    }
};

const mutations = {
    newPost(state, post) {
        state.posts.unshift(post);
    },
    removePost(state, post) {
        state.posts.splice(state.posts.indexOf(post), 1);
    },
    loadPosts(state, posts) {
        state.posts.push(...posts);
    }

};
var paginatePosts = '/posts';
const actions = {
    newPost({state, commit, rootState}, text) {
        new Promise((resolve, reject) => {
            axios.post('/post', {text}, {
                headers: {Authorization: 'Bearer '+localStorage.getItem('token')}
            })
                .then(response => {
                    console.log(response);
                    commit('newPost', response.data);
                    resolve(true);
                })
                .catch(response => {
                    reject(false)
                });
        })

    },
    removePost({commit}, post) {
        axios.delete('/post/'+post.id, {
            headers: {Authorization: 'Bearer '+localStorage.getItem('token')}
        })
            .then(response => {
                commit('removePost', post)
            })
            .catch(response => {
            });

    },
    loadPosts({commit}) {
        new Promise((resolve, reject) => {
            axios.get(paginatePosts, {
                headers: {Authorization: 'Bearer '+localStorage.getItem('token')}
            })
            .then(response => {
                console.log(response);
                commit('loadPosts', response.data.posts);
                resolve(true);
            })
            .catch(response => {
                reject(false)
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