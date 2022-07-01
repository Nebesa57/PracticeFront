import Vue from 'vue';
import Router from 'vue-router';
import Materials from '@/components/Materials/Materials.vue';
import IndividualPlan from '@/components/IndividualPlan/IndividualPlan.vue';
import Colleagues from '@/components/Colleagues/Colleagues.vue';
import App from '@/App.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'App',
            components: App,
        },
        {
            path: '/Materials',
            name: 'Materials',
            component: Materials,
        },
        {
            path: '/IndividualPlan',
            name: 'IndividualPlan',
            component: IndividualPlan,
        },
        {
            path: '/Colleagues',
            name: 'Colleagues',
            component: Colleagues,
        },
    ],
});
