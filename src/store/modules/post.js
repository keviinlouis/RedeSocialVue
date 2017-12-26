import axios from "axios/index";

const namespaced = true;

const state = {
    posts: []
};

const getters = {
    allPosts: state => {
        return state.posts;
    },
    userPosts: (state) => (id) => {
        return state.posts.filter((post)=>{
            return post.user.id === id;
        })
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
const actions = {
    newPost({state, commit, rootState}, text) {
        new Promise((resolve, reject) => {
            axios.post('/post', {text})
                .then(response => {
                    commit('newPost', response.data);
                    resolve(true);
                })
                .catch(response => {
                    reject(false)
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
        new Promise((resolve, reject) => {
            axios.get('/posts/'+state.posts.length)
            .then(response => {
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