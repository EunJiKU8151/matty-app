<template>
  <div>
    <bookToolbar></bookToolbar>
    <router-view></router-view>
  </div>
</template>

<script>
import BookToolbar from '@/components/BookToolbar.vue';


export default {
  components: { 
    BookToolbar,
  },
}
</script>

<style lang="scss">
</style>