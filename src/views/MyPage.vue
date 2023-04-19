<template>
  <div class="mypage-page page">
    <MyPageItem></MyPageItem>
  </div>
</template>

<script>
import MyPageItem from '@/components/MyPageItem.vue'

export default {
  components: {
    MyPageItem,
  }
}
</script>

<style lang="scss">
  body {background-color: #fff;}
</style>