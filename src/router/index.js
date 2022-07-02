import Vue from 'vue';
import Router from 'vue-router';
import Materials from '@/components/materials/Materials.vue';
import IndividualPlan from '@/components/individualPlan/IndividualPlan.vue';
import Colleagues from '@/components/colleagues/Colleagues.vue';
import App from '@/App.vue';
import NotFound from '@/components/notFound/NotFound.vue';

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
        {
            path: '*',
            name: 'NotFound',
            component: NotFound,
        },
    ],
});
