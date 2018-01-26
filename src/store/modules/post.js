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
    },
    setPosts(state, posts){
      state.posts = posts;
    },
    removePosts(state){
      state.posts = [];
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
        axios.delete('/post/' + post.id)
            .then(response => {
                commit('removePost', post)
            })
            .catch(response => {

            });

    },
    loadPosts({state, commit}, refresh) {
        return new Promise((resolve, reject) => {
             let url = '/posts/' + state.posts.length;
             if(refresh){
                url = '/posts/0';
             }
            axios.get(url)
                .then(response => {
                    if(refresh){
                      commit('setPosts', response.data.posts);
                    }else{
                      commit('loadPosts', response.data.posts);
                    }
                    resolve(response);
                })
                .catch(response => {
                    reject(response)
                });
        })
    },
    loadUserPosts({state, commit}, id) {
        return new Promise((resolve, reject) => {

        })
    },
    removePosts({commit}){
      commit('removePosts');
    },
    eventNewPost({state, commit, rootState, rootGetters}, {post, user}){
      let following = rootGetters['auth/following'];
      let isFollowing = following.find((userFollowing)=>{
        return userFollowing.id === user.id;
      }, user);
      post.user = user;
      if(isFollowing){
        commit('newPost', post);
      }
    }
};


export default {
    namespaced,
    state,
    getters,
    mutations,
    actions
};
