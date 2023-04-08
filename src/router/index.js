import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: () => import('@/views/LoginPage.vue'),
    },
    {
      path: '/main',
      meta: { auth: true },
      component: () => import('@/views/MainPage.vue'),
    },
    {
      path: '/book',
      meta: { auth: true },
      component: () => import('@/views/BookPage.vue'),
    },
    {
      path: '/info',
      meta: { auth: true },
      component: () => import('@/views/InfoPage.vue'),
    },
    {
      path: '/my',
      meta: { auth: true },
      component: () => import('@/views/MyPage.vue'),
    },
    {
      path: '/user/:id',
      meta: { auth: true },
      component: () => import('@/views/UserProfile.vue')
    },
    {
      path: '*',
      meta: { auth: true },
      component: () => import('@/views/NotPage.vue'),
    },
  ]
});

router.beforeEach((to, from, next) => {
  if(to.meta.auth && !store.getters.isLogin) {
    alert("페이지 접근 권한이 없습니다.");
    next('/login');
  }
  next();
});

export default router;