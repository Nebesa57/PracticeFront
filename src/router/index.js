import Vue from 'vue';
import Router from 'vue-router';
import Materials from '@/components/Materials/Materials.vue';
import IndividualPlans from '@/components/IndividualPlans/IndividualPlans.vue';
import Colleagues from '@/components/Colleagues/Colleagues.vue';
import App from '@/App.vue';

Vue.use(Router);

export default new Router({
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
            path: '/IndividualPlans',
            name: 'IndividualPlans',
            component: IndividualPlans,
        },
        {
            path: '/Colleagues',
            name: 'Colleagues',
            component: Colleagues,
        },
    ],
});
