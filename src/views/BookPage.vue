<template>
  <div>
    <BookTab></BookTab>
    <router-view></router-view>
    <!-- <BookHome></BookHome> -->
  </div>
</template>

<script>
import BookTab from '@/components/BookTab.vue';
// import MattyMenubar from '@/components/MattyMenubar.vue';

export default {
  components: {
    BookTab,
    // BookHome,
  }
}
</script>

<style lang="scss">

</style>