<template>
  <nav class="nav">
    <router-link class="menu" to="/main">
      <i class="fa-solid fa-house-chimney"></i>
      <span>홈</span>
    </router-link>
    <router-link class="menu" to="/book">
      <i class="fa-solid fa-book"></i>
      <span>도서</span>
    </router-link>
    <router-link class="menu" to="/info">
      <i class="fa-regular fa-address-book"></i>
      <span>연락처</span>
    </router-link>
    <router-link class="menu" to="/my">
      <i class="fa-solid fa-lock"></i>
      <span>My계정</span>
    </router-link>
  </nav>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  body {background-color: #fff;}
</style>