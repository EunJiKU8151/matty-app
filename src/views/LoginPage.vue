<template>
  <div>
    <h1>Matty</h1>
    <LoginForm></LoginForm>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';

export default {
  components: {
    LoginForm,
  },
  // created() {
  //   document.cookie = "safeCookie1=foo; SameSite=Lax"; 
  //   document.cookie = "safeCookie2=foo";  
  //   document.cookie = "crossCookie=bar; SameSite=None; Secure";
  // }
}
</script>

<style>

</style>