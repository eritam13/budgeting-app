import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import DashboardVue from '@/views/Dashboard.vue';
import RecordsVue from '@/views/Records.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardVue,
  },
  {
    path: '/records',
    name: 'Records',
    component: RecordsVue,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
