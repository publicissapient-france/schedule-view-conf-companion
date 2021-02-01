import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import ScheduleGrid from '@/views/ScheduleGrid.vue';
import Schedule2 from '@/views/Schedule2.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Schedule2
  },
  {
    path: '/grid',
    component: ScheduleGrid
  },
  {
    path: '/:id',
    name: 'TalkInfo',
    component: () => import(/* webpackChunkName: "about" */ '../views/TalkInfo.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
