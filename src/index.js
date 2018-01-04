import Vue from 'vue';
import {MdApp, MdButton, MdCard} from 'vue-material/dist/components';
import VueRouter from 'vue-router';
import 'vue-material/dist/vue-material.min.css';
import hljs from 'highlightjs';

import './favicon.ico';
import App from './App.vue';
import DockerfileContext from './components/DockerfileContext.vue';
import DockerfileContexts from './components/DockerfileContexts.vue';

hljs.initHighlightingOnLoad();

Vue.use(MdApp);
Vue.use(MdButton);
Vue.use(MdCard);
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [{
            path: '/',
            component: DockerfileContexts
        },
        {
            path: '/contexts/:context',
            component: DockerfileContext
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
