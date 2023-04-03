<template>
  <div class="main-page page">
    <EzStory></EzStory>
    <NewUser></NewUser>
  </div>
</template>

<script>
import EzStory from '@/components/EzStory.vue';
import NewUser from '@/components/NewUser.vue';

export default {
  components: {
    EzStory,
    NewUser
  }
}
</script>

<style lang="scss">
  body {background-color: #fff;}
</style>