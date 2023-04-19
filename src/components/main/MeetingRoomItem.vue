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
    <ul class="meeting-list" ref="meetingList">
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
            <img :src="`${$store.state.userImgUrl}${item.UserId}`" alt="">
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
      },
      intervalId: null,
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
      if(hours < 10) {
        hours = `0${hours}`;
      }
      
      return `${hours}:${minutes}`;
    }
  },
  // ❗❗❗
  // 230419 구은지 수정중
  // ❗❗❗
  async created() {
    try {
      const { data } = await meetingRoomApi()
      this.meetingRoom = data;
      this.roomInfo.total = this.meetingRoom.length;
      this.roomTotalCalcu();
      this.intervalId = setInterval(this.nowTimeBarWidth, 1000);
    }
    catch(error) {
      console.log("미팅룸 에러 : " + error);
      console.log(error);
    }
  },
  destroyed() {
    clearInterval(this.intervalId);
  },
  methods: {
    // 회의실 토탈 계산 (종료 -1, 진행중 0, 예정 1,2)
    roomTotalCalcu() {
      this.meetingRoom.forEach((item) => {
        if(item.Status == -1) {
          this.roomInfo.end += 1;
        } else if(item.Status == 0) {
          this.roomInfo.ongoing += 1;
        } else {
          this.roomInfo.schedule += 1
        }
      });
    },
    // bar width % 변경
    nowTimeBarWidth() {
      let status = 0;
      this.meetingRoom.forEach((item, idx) => {
        status = item.Status
        if(status == 0) {
          var barWidth = this.roomBarTimeCaluc(item);
          // console.log(barWidth);
          // console.log(this.$el.querySelectorAll('.bar'));
          this.$refs.meetingList.querySelectorAll('.bar')[idx].style.width = `${barWidth}%`;
        } else if (status == -1) {
          this.$refs.meetingList.querySelectorAll('.bar')[idx].style.width = "100%";
        }
      }) 
    },
    // 회의 진행률 구하기
    roomBarTimeCaluc(item) {
      let startDate = new Date(item.Startdate);
      let endDate = new Date(item.Enddate);
      let totalMSec =  endDate.getTime() - startDate.getTime();
      let totalMin = totalMSec / (60 * 1000);
      // console.log(`회의실 총 예약시간은 ${totalMin}분 입니다.`);

      let nowDate = new Date();
      let ingSec =  nowDate.getTime() - startDate.getTime();
      let ingMin = ingSec / (60 * 1000);
      let ingMinFloor = Math.floor(ingMin);
      // console.log(`현재 ${ingMinFloor}분 회의를 진행했습니다.`);

      let percent = ingMinFloor * 100 / totalMin;
      let percentFllor = percent.toFixed(3);
      // console.log(`${percentFllor}%를 bar 채우겠습니다.`);
      return percentFllor;
    },
  },
}
</script>

<style>

</style>