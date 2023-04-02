<template>
  <div id="app">
    <MattyHeader></MattyHeader>
    <router-view></router-view>
    <MattyMenubar></MattyMenubar>
  </div>
</template>

<script>
import MattyHeader from '@/components/MattyHeader.vue';
import MattyMenubar from '@/components/MattyMenubar.vue';
export default {
  components: {
    MattyHeader,
    MattyMenubar,
  }
}
</script>

<style lang="scss">
</style>