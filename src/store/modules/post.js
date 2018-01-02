import axios from "axios/index";

const namespaced = true;

const state = {
    posts: []
};

const getters = {
    allPosts: state => state.posts,
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
const actions = {
    newPost({state, commit, rootState}, text) {
        return new Promise((resolve, reject) => {
            axios.post('/post', {text})
                .then(response => {
                    commit('newPost', response.data);
                    resolve();
                })
                .catch(response => {
                    reject()
                });
        })

    },
    removePost({commit}, post) {
        axios.delete('/post/'+post.id)
            .then(response => {
                commit('removePost', post)
            })
            .catch(response => {

            });

    },
    loadPosts({state, commit}) {
       return  new Promise((resolve, reject) => {
            axios.get('/posts/'+state.posts.length)
            .then(response => {
                commit('loadPosts', response.data.posts);
                resolve(response);
            })
            .catch(response => {
                reject(response)
            });
        })
    },
    loadUserPosts({state, commit}, id){
        return new Promise((resolve, reject) => {

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