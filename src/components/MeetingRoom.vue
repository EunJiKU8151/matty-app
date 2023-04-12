<template>
  <div class="meeting-sec sec">
    <h2 class="sec-tit">회의실</h2>
    <ul class="meeting-total">
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
    <ul class="meeting-list">
      <li v-for="item in meetingRoom" :key="item">
        <p class="roomname">{{ item.RoomName }}</p>
        <div class="bar-box">
          <p class="roomtime">
            <span>{{ item.Startdate | HM }}</span> ~ 
            <span>{{ item.Enddate | HM }}</span>
          </p>
          <div class="bar-wrap">
            <span class="bar"></span>
          </div>
        </div>
        <div class="profile">
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
  filters: {
      HM: function(value) {
      let itemDate = new Date(value);
      let hours = itemDate.getHours();
      let minutes  = itemDate.getMinutes();
      
      // return `${year}-${month}-${day}`;
      return `${hours}:${minutes}`;
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