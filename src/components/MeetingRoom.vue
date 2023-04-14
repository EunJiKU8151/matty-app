<template>
  <div class="meeting-sec sec">
    <h2 class="sec-tit">회의실</h2>
    <ul class="meeting-total">
      <li>
        <p class="tit">총 예약</p>
        <p class="txt">{{ roomInfo.total }}</p>
      </li>
      <li>
        <p class="tit">진행 중</p>
        <p class="txt">{{ roomInfo.ongoing }}</p>
      </li>
      <li>
        <p class="tit">예정</p>
        <p class="txt">{{ roomInfo.schedule }}</p>
      </li>
      <li>
        <p class="tit">종료</p>
        <p class="txt">{{ roomInfo.end }}</p>
      </li>
    </ul>
    <ul class="meeting-list">
      <li v-for="item in meetingRoom" :key="item.SIdx">
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
      roomInfo: {
        total: 0,
        ongoing: 0,
        schedule: 0,
        end: 0,
      }
    }
  },
  filters: {
      HM: function(value) {
      let itemDate = new Date(value);
      let hours = itemDate.getHours();
      let minutes  = itemDate.getMinutes();
      
      if(minutes < 10) {
        minutes = `0${minutes}`;
      }
      
      return `${hours}:${minutes}`;
    }
  },
  created() {
    meetingRoomApi()
      .then(({ data }) => {
        this.meetingRoom = data;
        this.roomInfo.total = this.meetingRoom.length;

        // 종료 -1, 진행중 0, 예정 1,2
        this.meetingRoom.forEach((item) => {
            if(item.Status == -1) {
              this.roomInfo.end += 1;
            } else if(item.Status == 0) {
              this.roomInfo.ongoing += 1;
            } else {
              this.roomInfo.schedule += 1
            }
        });
      })
      .catch(error => {
        console.log("미팅룸 에러 : " + error);
        console.log(error);
      })
      // this.test();
  },
  methods: {
    // bar
    // barMotion() {

    // }
    // startTimer: function() {
		// 	// this.timer = setInterval(() => this.countdown(), 1000);
		// 	setTimeout(() => console.log("셋타이머"), 1000);
		// 	// this.resetButton = true;
		// },
  },
}
</script>

<style>

</style>