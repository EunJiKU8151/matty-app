<template>
  <div class="meetingsch-sec sec">
    <h2 class="sec-tit">미팅일정</h2>
    <ul class="sch-list">
      <li v-for="item in meetingSch" :key="item">
        <p class="tit">{{ item.Task.T_TITLE }}</p>
        <div class="cont">
          <ul class="users">
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