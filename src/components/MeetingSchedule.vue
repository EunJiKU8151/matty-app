<template>
  <div class="meeting-sec sec">
    <h2 class="sec-tit">미팅일정</h2>
    <ul>
      <li v-for="item in meetingSch" :key="item">
        <p class="tit">{{ item.Task.T_TITLE }}</p>
        <div class="cont">
          <ul class="users">
            <li v-for="user in item.Workers" :key="user">
              {{user.TW_NAME}}
            </li>
          </ul>
          <p class="time">{{ item.Task.T_TARGETDATE }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { meetingSchApi } from '@/api/index.js';

export default {
  data() {
    return {
      meetingSch: []
    }
  },
  created() {
    meetingSchApi()
      .then(({ data }) => {
        console.log(data);
        this.meetingSch = data;
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