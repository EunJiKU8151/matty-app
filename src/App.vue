<template>
  <div id="app">
    <MattyHeader v-show="isLogin"></MattyHeader>
    <router-view></router-view>
    <MattyMenubar v-show="isLogin"></MattyMenubar>
  </div>
</template>

<script>
import MattyHeader from '@/components/common/MattyHeader.vue';
import MattyMenubar from '@/components/common/MattyMenubar.vue';

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
}
</script>

<style lang="scss">
  body {background-color: #fff;}
</style>