<template>
  <div class="login-page page">
    <h1 class="logo"><img src="../assets/images/matty-logo.png" alt="matty"></h1>
    <LoginForm></LoginForm>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'

export default {
  components: {
    LoginForm,
  }
}
</script>

<style lang="scss">
  body {background: #fff;}
</style>