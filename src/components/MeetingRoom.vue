<template>
  <div class="meeting-sec sec">
    <h2 class="sec-tit" @click="click">회의실</h2>
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
            <span class="bar" refs="bar"></span>
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
      },
      testtest: []
    }
  },
  filters: {
      HM: function(value) {
        let itemDate = new Date(value);
        let hours = itemDate.getHours();
        let minutes  = itemDate.getMinutes();
        
        if(hours < 10) {
          hours = `0${hours}`;
        }
        if(minutes < 10) {
          minutes = `0${minutes}`;
        }
        
        return `${hours}:${minutes}`;
    }
  },
  created() {
    },
  mounted() {
    meetingRoomApi()
      .then(({ data }) => {
        this.meetingRoom = data;
        // ❗
        this.getMeetingEachClock();

        // ❗
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
              this.aaaaaaaaaaaaa();

      })
      .catch(error => {
        console.log("미팅룸 에러 : " + error);
        console.log(error);
      })
    // 60초(10분)에 한번 실행,
    // setInterval(this.getClock, 100000);
    setTimeout(this.getClock, 1000);
  },
  methods: {
    click() {
      this.$refs.meetingList.style.background = "red";
    },
    getClock() {
      const date = new Date();
      let nowH = date.getHours();
      let nowM = date.getMinutes();
      if(nowM < 10) {
        nowM = `0${nowM}`;
      }
      if(nowH < 10) {
        nowH = `0${nowH}`;
      }



      // var aaaa = `${nowH}:${nowM}`;

      // 🔹🔹🔹
        

      // 🔹🔹🔹

      // this.testtest.forEach((item, idx) => {
      //   var 냠 = item.split("~");
      //   if(냠[0] < aaaa) {
      //   // ❗
      //     this.$refs.meetingList.children[idx].querySelector(".bar").style.width = "100%";
      //   // ❗
      //   }
      // });
      
    },
    aaaaaaaaaaaaa() {
      // const dateA = new Date('2022/06/01 01:10:00');
      // const dateB = new Date('2022/06/01 00:50:00');
      // const diffMSec = dateA.getTime() - dateB.getTime();
      // const diffMin = diffMSec / (60 * 1000);
      // console.log(`시간의 차이는 ${diffMin}분 입니다.`);

      this.meetingRoom.forEach((item) => {
        console.log(item);
        var dateA = new Date(item.Startdate);
        var dateB = new Date(item.Enddate);
        // console.log(dateA.getTime());
        const diffMSec =  dateB.getTime() - dateA.getTime();
        const diffMin = diffMSec / (60 * 1000);
        console.log(`시간의 차이는 ${diffMin}분 입니다.`);
        // 현재시간 * 100 / 총시간
        // 60 X 100 / 120 = 결과값

        var dateA1 = new Date(item.Startdate);
        var dateB2 = new Date();
        // console.log(dateA.getTime());
        const diffMSec2 =  dateB2.getTime() - dateA1.getTime();
        const diffMin2 = diffMSec2 / (60 * 1000);
        const testrtttt = Math.floor(diffMin2);
        console.log(`시간의 차이는 ${testrtttt}분 입니다.`);

        var total = testrtttt * 100 / diffMin;
        var dddddddddd = total.toFixed(3);
        console.log(`${dddddddddd}%`);

        // this.$refs.meetingList.children[idx].querySelector(".bar").style.width = `${dddddddddd}%`;
        // this.$refs.meetingList.querySelectorAll(".bar").style.width = "100%";
        console.log(this.$refs.meetingList.children);
        // this.$refs.meetingList.children[idx].style.background = "red";
        console.log(this.$refs.bar);
        console.log("-----");
      })
    },
    getMeetingEachClock() {
      // this.meetingRoom.forEach((item) => {
      //   var a = this.filterClock(item.Startdate);
      //   var b = this.filterClock(item.Enddate);
      //   console.log(a);
      //   console.log(b);
      //   console.log("----");
      // })
      // ❗ 배열에 각 회의실 start~end를 배열로 담았다.
      this.testtest = this.meetingRoom.map((item) => {
        var a = this.filterClock(item.Startdate);
        var b = this.filterClock(item.Enddate);
        let ab = `${a}~${b}`
        return ab
      })
      // console.log(this.testtest);
    },
    filterClock(value) {
      let itemDate = new Date(value);
      let hours = itemDate.getHours();
      let minutes  = itemDate.getMinutes();
      
      if(hours < 10) {
        hours = `0${hours}`;
      }
      if(minutes < 10) {
        minutes = `0${minutes}`;
      }
      
      return `${hours}:${minutes}`;
    }
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