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
      redirect: '/book/home',
      component: () => import('@/views/BookPage.vue'),
    },
    {
      path: '/book',
      name: 'bookhome',
      meta: { auth: true },
      /* 
        tip
        children 속성은 개행해서 한눈에 잘 띄게 해주세용
      */
      component: () => import('@/views/BookPage.vue'), children: [{
        path: 'home',
        component: () => import('@/components/BookHome.vue'),
      }],
    },
    {
      path: '/book',
      name: 'bookcatagory',
      meta: { auth: true },
      component: () => import('@/views/BookPage.vue'), children: [{
        path: 'catagory',
        component: () => import('@/components/BookCatagory.vue'),
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
