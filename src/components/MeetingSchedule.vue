<template>
  <div class="meetingsch-sec sec">
    <h2 class="sec-tit">미팅일정</h2>
    <ul class="sch-list">
      <li v-for="item in meetingSch" :key="item.Task.T_IDX">
        <p class="tit">
          <i class="fa-solid fa-location-dot"></i>
          <span>{{ item.Task.T_TITLE }}</span>
        </p>
        <div class="cont">
          <ul class="users">
            <!-- 
              tip 
              :key에는 객체를 넣으면 안되고 객체 안에 유니크한 값을 넣어야됨 
              현재 :key="user"를 넣어서 경고메시지가 뜨고 있는데 user.TW_IDX등 유니크한 값을 넣어보세용
            -->
            <li class="user" v-for="user in item.Workers" :key="user">
              <div class="img-box">
                <img :src="`https://easymedia.matty.works:8443/File/Page1/Profile/${user.TW_ID}`" alt="">
              </div>
              <p class="name">
                {{user.TW_NAME}}
              </p>
            </li>
          </ul>
          <p class="time">{{ item.Task.T_TARGETDATE | HM }}</p>
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
  filters: {
    /* tip 인덴트 맞춰주세용 */
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
    meetingSchApi()
      .then(({ data }) => {
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
