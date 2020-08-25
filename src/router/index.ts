import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Schedule from '@/views/Schedule.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Schedule',
    component: Schedule
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
