import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import DashboardVue from '@/views/Dashboard.vue';
import RecordsVue from '@/views/Records.vue';
import ReportVue from '@/views/Report.vue';
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
  {
    path: '/report',
    name: 'Report',
    component: ReportVue,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
