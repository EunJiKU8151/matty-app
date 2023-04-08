<template>
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
      var itemData = new Date(value);
      var year = itemData.getFullYear();
      var month = itemData.getMonth() + ``;
      var day = itemData.getDate();

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
    console.log(userId);
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
    prevPage() {
      this.$router.push('/main');
    }
  }
}
</script>

<style  lang="scss">
  .profile-sec .prev-btn {font-size: 20px}
  .profile-sec .profile-area {display: flex; margin-top: 30px; margin-bottom: 40px;}
  .profile-sec .profile-area .img-box {width: 80px; height: 80px; margin-right: 10px; border-radius: 50%; overflow: hidden;}
  .profile-sec .profile-area .img-box img {width: 100%; height: 100%; object-fit: cover;}
  .profile-sec .profile-area .txt-box {display: flex; flex-direction: column; justify-content: space-between;}
  .profile-sec .profile-area .txt-box .names .name {margin-right: 4px; font-size: 20px; font-weight: 700; color: $black_color;}
  .profile-sec .profile-area .txt-box .names .position {font-size: 16px; color: $black_color;}
  .profile-sec .profile-area .txt-box .group {font-size: 16px; color: $lightblack_color; opacity: .6;}
  .profile-sec .info-aera .info {padding: 16px 0;}
  .profile-sec .info-aera .info:first-child {padding-top: 0;}
  .profile-sec .info-aera .info ~ .info {border-top: 1px solid $gray_color;}
  .profile-sec .info-aera .info .tit {margin-bottom: 6px;}
  .profile-sec .info-aera .info:last-child .tit {margin-bottom: 6px; color: $lightblack_color; opacity: .6;}
  .profile-sec .info-aera .info i.tit {font-size: 20px; color: $point_color;}
  .profile-sec .info-aera .info a {display: block;}
  .profile-sec .info-aera .info .txt {font-size: 18px; color: $mediumblack_color;}
</style>