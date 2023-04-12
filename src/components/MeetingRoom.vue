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
    <ul>
      <li v-for="item in meetingRoom" :key="item">
        <p class="roomname">{{ item.RoomName }}</p>
        <div class="bar-box">
          <p class="roomtime">
            <span>{{ item.Startdate }}</span>
            <span>{{ item.Enddate }}</span>
          </p>
          <div class="bar-wrap">
            <span class="bar"></span>
          </div>
        </div>
        <div>
          <div class="img-box">
            <img :src="`https://easymedia.matty.works:8443/File/Page1/Profile/${item.UserId}`" alt="">
          </div>
          <p class="name">{{ item.UserName }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { meetingRoomApi } from '@/api/index.js';

export default {
  data() {
    return {
      meetingRoom: [],
    }
  },
  created() {
    meetingRoomApi()
      .then(({ data }) => {
        this.meetingRoom = data;
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