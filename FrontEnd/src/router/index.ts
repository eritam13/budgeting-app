import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import DashboardVue from '@/views/Dashboard.vue';
import RecordListVue from '@/views/RecordList.vue';
import RecordsVue from '@/views/Records.vue';
import ReportVue from '@/views/Report.vue';
import PersonalInfoVue from '@/views/PersonalInfo.vue';
import LoginVue from '@/views/Login.vue';
import RegisterVue from '@/views/Register.vue';
import { useAuthStore } from '@/stores/authStore';

const routes: Array<RouteRecordRaw> = [
 
  { path: '/', redirect: '/login' },
  {
    path: '/recordlist',
    name: 'RecordList',
    component: RecordListVue,
    meta: { requiresAuth: true },
  },
  {
    path: '/addrecord',
    name: 'AddRecord',
    component: RecordsVue,
    meta: { requiresAuth: true },
  },
  {
    path: '/report',
    name: 'Report',
    component: ReportVue,
    meta: { requiresAuth: true },
  },
  {
    path: '/personalinfo',
    name: 'PersonalInfo',
    component: PersonalInfoVue,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginVue,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterVue,
  }
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const useAuth = useAuthStore();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (useAuth.isAuthenticated) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});


export default router;
