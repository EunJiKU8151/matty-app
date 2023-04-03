<template>
  <div class="mypage-sec sec">
    <h1 class="sec-tit">마이페이지</h1>
    <div class="info-wrap">
      <dl>
        <dt>이름 / ID</dt>
        <dd>
          <span>{{ userVocaItem.NAME }} </span>
          <span>({{ userVocaItem.AV_EMP_NO }})</span>
        </dd>
      </dl>
      <dl>
        <dt>남은 연차</dt>
        <dd>{{ userVocaItem.AV_DAYS - userVocaItem.AV_USE_DAYS }}</dd>
      </dl>
      <dl>
        <dt>근무 연수</dt>
        <dd>{{ userVocaItem.easyday }}</dd>
      </dl>
      <dl>
        <dt>연차 갱신일</dt>
        <dd>{{ userVocaItem.AV_REGDATE }}</dd>
      </dl>
    </div>
    <button class="out-btn" v-on:click.prevent="logOutUser">logout</button>
  </div>
</template>

<script>
import { userInfoApi } from '@/api/index'
export default {
  data() {
    return {
      userVocaItem: "",
    }
  },
  methods: {
    async fetchData() {
      try {
        const { data } = await userInfoApi();
        console.log(data);
        this.userVocaItem = data;
      } catch(error) {
        console.log("마이페이지 에러 : " + error);
        console.log(error);
      }
    },
    logOutUser() {
      if(window.confirm('로그아웃 하시겠습니까?')) {
        localStorage.clear();
        this.$store.commit('logOutUserIdRemove');
        this.$store.commit('logOutAccessTokenRemove');
        this.$store.commit('logOutRefreshTokenRemove');
        this.$router.push('/login');
      }
    }
  },
  created() {
    this.fetchData();
  }
}
</script>

<style lang="scss">
  body {background-color: #fff;}
  
  .mypage-sec .info-wrap {margin: 30px 0;}
  .mypage-sec .info-wrap dl ~ dl {margin-top: 20px;}
  .mypage-sec .info-wrap dl dt {color: $lightblack_color;}
  .mypage-sec .info-wrap dl dd {margin-top: 8px; font-size: 18px; color: $black_color;}
  .mypage-sec .out-btn {width: 100%; height: 30px; color: #fff; border-radius: 5px; background: $point_color;}

</style>