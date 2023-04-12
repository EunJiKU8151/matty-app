import Vue from 'vue';
import VueRouter from 'vue-router';
// import LoginPage from '@/views/LoginPage.vue';
// import SignupPage from '@/views/SignupPage.vue';

Vue.use(VueRouter);

export default new VueRouter({
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
      redirect: '/book/home',
    },
    {
      path: '/book/home',
      component: () => import('@/views/BookPage.vue'),
    },
    {
      path: '/book/catagory',
      component: () => import('@/views/BookPage.vue'),
    }
  ],
});
