import Vue from 'vue';
import Router from 'vue-router';
import {store} from '../store';

import Dashboard from '../components/Dashboard';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import User from '../components/Auth/User';

Vue.use(Router);

const router = new Router({
        routes: [
            {
                path: '/login',
                name: 'Login',
                component: Login,
                meta: {auth: false}
            },
            {
                path: '/register',
                name: 'Register',
                component: Register,
                meta: {auth: false}
            },
            {
                path: '/',
                name: 'DashBoard',
                component: Dashboard,
                meta: {auth: true}
            },
            {
                path: '/me',
                name: 'Me',
                component: User,
                meta: {auth: true},
                props: {id: store.state.auth.user.id}
            }
        ],
        mode: 'history'
    })
;

router.beforeEach((to, from, next) => {
    store.dispatch('auth/setToken');

    let status = store.state.auth.status.logged;
    if (to.meta.auth && !status) {
        next({
            path: '/login',
            query: {redirect: to.fullPath}
        })
    } else if (status && (to.name === 'Login' || to.name === 'Register')) {
        next({path: '/'})

    } else {
        next()

    }
});

export default router;
