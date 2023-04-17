import Vue from "vue"
import VueRouter from "vue-router";
Vue.use(VueRouter);

import MainPage from "../pages/MainPage.vue";

const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: MainPage
    }
  ]
})

export default router;
