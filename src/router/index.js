import Vue from 'vue';
import VueRouter from 'vue-router';

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
      component: () => import('@/views/MainPage.vue'),
    },
    {
      path: '/book',
      component: () => import('@/views/BookPage.vue'),
    },
    {
      path: '/info',
      component: () => import('@/views/InfoPage.vue'),
    },
    {
      path: '/my',
      component: () => import('@/views/MyPage.vue'),
    },
    {
      path: '/user/:id',
      component: () => import('@/views/UserProfile.vue')
    },
    {
      path: '*',
      component: () => import('@/views/NotPage.vue'),
    },
  ]
});

export default router;