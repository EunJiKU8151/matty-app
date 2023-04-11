<template>
  <div class="meeting-sec sec">
    <h2 class="sec-tit">미팅일정</h2>
  </div>
</template>

<script>
import { meetingSchApi } from '@/api/index.js';

export default {
  created() {
    meetingSchApi()
      .then(({ data }) => {
        console.log(data);
      })
      .catch(error => {
        console.log("미팅일정 에러 : " + error);
        console.log(error);
      })
  }
}
</script>

<style>

</style>