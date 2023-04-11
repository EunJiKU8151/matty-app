<template>
  <div class="meeting-sec sec">
    <h2 class="sec-tit">회의실</h2>
    <ul>
      <li>
        <p class="tit">총 예약</p>
        <p class="txt">0</p>
      </li>
      <li>
        <p class="tit">진행 중</p>
        <p class="txt">0</p>
      </li>
      <li>
        <p class="tit">예정</p>
        <p class="txt">0</p>
      </li>
      <li>
        <p class="tit">종료</p>
        <p class="txt">0</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { meetingRoomApi } from '@/api/index.js';

export default {
  created() {
    meetingRoomApi()
      .then(({ data }) => {
        console.log(data);
      })
      .catch(error => {
        console.log("미팅룸 에러 : " + error);
        console.log(error);
      })
  }
}
</script>

<style>

</style>