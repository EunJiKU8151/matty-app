<template>
  <div class="mypage-sec sec">
    <div class="secTit-box">
      <h2 class="sec-tit">마이페이지</h2>
      <div class="img-box">
        <img :src="`${$store.state.userImgUrl}${thisUserInfos.AV_EMP_NO}`" alt="">
      </div>
    </div>
    <div class="info-wrap">
      <dl>
        <dt>이름 / ID</dt>
        <dd>
          <span>{{ thisUserInfos.NAME }} </span>
          <span>({{ thisUserInfos.AV_EMP_NO }})</span>
        </dd>
      </dl>
      <dl>
        <dt>남은 연차</dt>
        <dd>{{ thisUserInfos.AV_DAYS - thisUserInfos.AV_USE_DAYS }}</dd>
      </dl>
      <dl>
        <dt>근무 연수</dt>
        <dd>{{ thisUserInfos.easyday }}</dd>
      </dl>
      <dl>
        <dt>연차 갱신일</dt>
        <dd>{{ thisUserInfos.AV_REGDATE | MMdd }}</dd>
      </dl>
    </div>
    <button class="out-btn" v-on:click.prevent="logOutUser">logout</button>
  </div>
</template>

<script>
import { thisUserInfoApi } from '@/api/index';

export default {
  data() {
    return {
      thisUserInfos: "",
    }
  },
  filters: {
    MMdd: function(value) {
      let itemDate = new Date(value);
      let month =  itemDate.getMonth() + 1;
      let day =  itemDate.getDate();
      if(month < 10) {
        month = `0${month}`;
      }
      if(day < 10) {
        day = `0${day}`;
      }
      return `${month}월 ${day}일`;
    }
  },
  methods: {
    async fetchData() {
      try {
        // 해당 로그인 유저 정보 API Get
        const { data } = await thisUserInfoApi();
        this.thisUserInfos = data;
      } catch(error) {
        console.log("마이페이지 에러 : " + error);
        console.log(error);
      }
    },
    // 로그아웃 버튼 클릭
    logOutUser() {
      if(window.confirm('로그아웃 하시겠습니까?')) {
        // 로그인 정보 localstorage 삭제
        localStorage.clear();
        // 로그인 정보 store state 삭제
        this.$store.commit('logOutUserIdRemove');
        this.$store.commit('logOutAccessTokenRemove');
        this.$store.commit('logOutRefreshTokenRemove');
        // 로그인 페이지 이동
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
</style>