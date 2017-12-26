import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '../components/Dashboard';
import Login from '../components/Auth/Login';
import User from '../components/User';
import {store} from '../store';

Vue.use(Router);

const router = new Router({
        routes: [
            {
                path: '/login',
                name: 'Login',
                component: Login,
                meta:{auth:false}
            },
            {
                path: '/',
                name: 'DashBoard',
                component: Dashboard,
                meta:{auth:true}
            },
            {
                path: '/me',
                name: 'Me',
                component: User,
                meta:{auth:true}
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
            query: { redirect: to.fullPath }
        })
    } else if(status && to.name === 'Login') {
        next({path: '/' })

    }else{
        next()

    }
});

export default router;
