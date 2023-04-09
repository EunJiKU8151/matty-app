<template>
  <div id="app">
    <MattyHeader v-show="isLogin"></MattyHeader>
    <router-view></router-view>
    <MattyMenubar v-show="isLogin"></MattyMenubar>
  </div>
</template>

<script>
import MattyHeader from '@/components/MattyHeader.vue';
import MattyMenubar from '@/components/MattyMenubar.vue';
// import store from '@/store/index';

export default {
  computed: {
    // UserId값이 있으면, header&nav 보임
    isLogin() {
      return this.$store.getters.isLogin;
    }
  },
  components: {
    MattyHeader,
    MattyMenubar,
  },
  created() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let firstDay = new Date(year, month, 1).getDay();
    let lastDate = new Date(year, month, 0).getDate();

    if(month < 10) {
        month = `0${month}`;
      }
      if(firstDay < 10) {
        firstDay = `0${firstDay}`;
      }

    let test1 = `${year}-${month}-${firstDay}`;
    let test2 = `${year}-${month}-${lastDate}`;
    this.$store.commit('thisDayGet', test1);
    this.$store.commit('thisDayGet2', test2);
  }
}
</script>

<style lang="scss">
  body {background-color: #fff;}
</style>