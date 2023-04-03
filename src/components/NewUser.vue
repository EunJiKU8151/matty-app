<template>
  <div class="newuser-sec sec">
    <h2 class="sec-tit">신규 입사자</h2>
  </div>
</template>

<script>
import { newUserApi } from '@/api/index';

export default {
  created() {
    newUserApi()
      .then(({ data }) => console.log(data))
      .catch(error => console.log(error))
  },
}
</script>

<style>

</style>