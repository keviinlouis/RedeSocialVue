import axios from 'axios'
import Axios from "axios/index";

const namespaced = true;

const state = {
  user: {
    id: 0,
    name: '',
    followers: [],
    following: [],
    posts: [],
  },
  suggestedUsers: []
};

const getters = {
  user: state => state.user,
  followers: state => state.user.followers,
  following: state => state.user.following,
  posts: state => state.user.posts,
  suggestedUsers: state => state.suggestedUsers
};

const mutations = {
  setUser(state, user) {
    localStorage.setItem('user', JSON.stringify(user));
    state.user = user;
  },
  setUserPosts(state, posts) {
    state.user.posts.push(...posts);
    localStorage.setItem('user', JSON.stringify(user));
  },
  setSuggestedUsers(state, users) {
    state.suggestedUsers = users;
  },
  removeSuggestedUser(state, id) {
    let userKey;
    state.suggestedUsers.filter((user, key) => {
      if (user.id === id) {
        userKey = key;
      }
    });
    state.suggestedUsers.splice(userKey, 1)
  }
};

const actions = {
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
  loadUserPosts({state, commit}) {
    return new Promise((resolve, reject) => {
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
  },
  suggestedUsers({state, commit}) {
    let actualShowingUsers = state.suggestedUsers.map((user) => {
      return user.id
    });
    axios.post('/user/suggested', {actualShowingUsers}
    ).then(response => {
      commit('setSuggestedUsers', response.data.suggestedUsers);

    }).catch(response => {
      //TODO melhorar erro
    })
  },
  follow({state, commit, dispatch, rootState}, id) {
    axios.post('/user/' + id + '/follow')
      .then(response => {
        if (response.data.action === 'followed') {
          commit('removeSuggestedUser', id);

        } else {
          dispatch('suggestedUsers');
        }
        dispatch('loadUser');
        dispatch('post/loadPosts', {refresh: true}, {root: true});
      }).catch(response => {
      //TODO melhorar erro
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
