import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import DashboardVue from '@/views/Dashboard.vue';
import RecordListVue from '@/views/RecordList.vue';
import RecordsVue from '@/views/Records.vue';
import ReportVue from '@/views/Report.vue';
import PersonalInfoVue from '@/views/PersonalInfo.vue';
import EditPersonalInfoVue from '@/views/EditPersonalInfo.vue';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardVue,
  },

  {
    path: '/recordlist',
    name: 'RecordList',
    component: RecordListVue,
  },
  {
    path: '/addrecord',
    name: 'AddRecord',
    component: RecordsVue,
  },
  {
    path: '/report',
    name: 'Report',
    component: ReportVue,
  },
  {
    path: '/personalinfo',
    name: 'PersonalInfo',
    component: PersonalInfoVue,
  },

];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
