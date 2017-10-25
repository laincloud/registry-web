import App from './App.vue';
import './style.scss';

Vue.use(VueMaterial);

new Vue({
    el: '#app',
    template: '<App/>',
    components: { App }
});
