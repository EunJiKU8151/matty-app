<template>
  <div class="profile-page page">
    <div class="profile-sec sec">
      <button class="prev-btn" @click="prevPage"><i class="fa-solid fa-arrow-left"></i></button>
      <div class="profile-area">
        <div class="img-box">
          <img :src="`https://easymedia.matty.works:8443/File/Page1/Profile/${userProfile.EMAIL}`" alt="">
        </div>
        <div class="txt-box">
          <p class="names">
            <span class="name">{{ userProfile.NAME }}</span>
            <span class="position">{{ userProfile.CALL_NAME }}</span>
          </p>
          <p class="group">{{ userProfile.DEPT_NAME }}</p>
        </div>
      </div>
      <ul class="info-aera">
        <li class="info">
          <i class="fa-solid fa-phone tit"></i>
          <a class="txt" :href="`tel:${userProfile.HP}`">{{ userProfile.HP }}</a>
        </li>
        <li class="info">
          <i class="fa-solid fa-envelope tit"></i>
          <a class="txt" :href="`mailto:${userProfile.EMAIL}`">{{ userProfile.EMAIL }}</a>
        </li>
        <li class="info">
          <i class="fa-solid fa-cake-candles tit"></i>
          <p class="txt">{{ userProfile.EI_BIRTH_DATE | yyMMdd }}</p>
        </li>
        <li class="info">
          <p class="tit">입사일</p>
          <p class="txt">{{ userProfile.ENTERING_DATE | yyMMdd }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ThisUserApi } from '@/api/index';

export default {
  data() {
    return {
      userProfile: {}
    }
  },
  filters: {
    yyMMdd: function(value) {
      let itemData = new Date(value);
      let year = itemData.getFullYear();
      let month = itemData.getMonth() + ``;
      let day = itemData.getDate();

      if(month < 10) {
        month = `0${month}`;
      }
      if(day < 10) {
        day = `0${day}`;
      }

      return `${year}년 ${month}월 ${day}일`
    }
  },
  created() {
    let userId = this.$route.params.id;

    // 특정 유저 정보 API Get
    ThisUserApi(userId)
      .then(({ data }) => {
        console.log(data);
        this.userProfile = data;
      })
      .catch(error => {
        console.log("특정 유저 정보 에러 : " + ThisUserApi);
        console.log(error);
      })
  },
  methods: {
    // 이전 페이지로 이동
    prevPage() {
      this.$router.go(-1);
    }
  }
}
</script>

<style  lang="scss">
  body {background-color: #fff;}
</style>