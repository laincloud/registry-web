import './style.scss';
import './favicon.ico';
import App from './App.vue';
import Repo from './components/Repo.vue';
import Repos from './components/Repos.vue';

Vue.use(VueMaterial);

const router = new VueRouter({
    routes: [{
            path: '/',
            component: Repos
        },
        {
            path: '/library/:repoName',
            component: Repo
        }
    ]
});

new Vue({
    el: '#app',
    template: '<App/>',
    components: {
        App
    },
    router
});
