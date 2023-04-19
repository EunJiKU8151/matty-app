<template>
  <div class="contact-page page">
    <ContactItem></ContactItem>
  </div>
</template>

<script>
import ContactItem from '@/components/ContactItem.vue'

export default {
  components: {
    ContactItem,
  }
}
</script>

<style lang="scss">
  body {background-color: #fff;}
</style>
