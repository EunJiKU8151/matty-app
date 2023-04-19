<template>
  <div class="profile-page page">
    <UserProfileItem></UserProfileItem>
  </div>
</template>

<script>
import UserProfileItem from '@/components/common/UserProfileItem.vue'

export default {
  components: {
    UserProfileItem,
  }
}
</script>

<style  lang="scss">
  body {background-color: #fff;}
</style>