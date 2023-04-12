<template>
  <div>
    <h1>main</h1>
    <EasystorySwiper></EasystorySwiper>
    <NewpersonSwiper></NewpersonSwiper>
  </div>
</template>

<script>
import EasystorySwiper from '@/components/EasystorySwiper.vue';
import NewpersonSwiper from '@/components/NewpersonSwiper.vue';

export default {
  // created() {
  //   document.cookie = "safeCookie1=foo; SameSite=Lax"; 
  //   document.cookie = "safeCookie2=foo";  
  //   document.cookie = "crossCookie=bar; SameSite=None; Secure";
  // },
  components: {
    EasystorySwiper,
    NewpersonSwiper
  },
}
</script>

<style>

</style>