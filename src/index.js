import Vue from 'vue';
import VueMaterial from 'vue-material';
import VueRouter from 'vue-router';
import 'vue-material/dist/vue-material.css';
import infiniteScroll from 'vue-infinite-scroll';
import hljs from 'highlightjs';

import './favicon.ico';
import App from './App.vue';
import Repo from './components/Repo.vue';
import Repos from './components/Repos.vue';

hljs.initHighlightingOnLoad();

Vue.use(VueMaterial);
Vue.use(VueRouter);
Vue.use(infiniteScroll);

const router = new VueRouter({
    routes: [{
            path: '/',
            component: Repos
        },
        {
            path: '/repos/:repoName',
            component: Repo
        }
    ]
});

new Vue({
    el: '#app',
    render: h => h(App),
    components: {
        App
    },
    router
});
