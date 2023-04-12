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
      name: 'login',
      component: () => import('@/views/LoginPage.vue'),
    },
    {
      path: '/main',
      name: 'main',
      meta: { auth: true },
      component: () => import('@/views/MainPage.vue'),
    },
    {
      path: '/book',
      // redirect: '/book',
      component: () => import('@/views/BookPage.vue'),
    },
    {
      path: '/book',
      name: 'bookhome',
      meta: { auth: true },
      component: () => import('@/views/BookPage.vue'), children: [{
        path: 'home',
        component: () => import('@/components/BookhomePage.vue'),
      }],
    },
    {
      path: '/book',
      name: 'bookcatagory',
      meta: { auth: true },
      component: () => import('@/views/BookPage.vue'), children: [{
        path: 'catagory',
        component: () => import('@/components/BookcataPage.vue'),
      }],
    },
    {
      path: '/info',
      name: 'info',
      meta: { auth: true },
      component: () => import('@/views/ContactPage.vue'),
    },
    {
      path: '/my',
      name: 'my',
      meta: { auth: true },
      component: () => import('@/views/MyPage.vue'),
    },
    {
      path: '/user/:id',
      name: 'user',
      meta: { auth: true },
      component: () => import('@/views/UserProfilePage.vue')
    },
    {
      path: '*',
      name: 'no',
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