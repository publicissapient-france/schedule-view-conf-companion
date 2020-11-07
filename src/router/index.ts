import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Schedule2 from '@/views/Schedule2.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Schedule2
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
