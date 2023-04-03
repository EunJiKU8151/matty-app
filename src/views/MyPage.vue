<template>
  <div class="mypage-sec sec">
    <h1 class="page-tit">마이페이지</h1>
    <div class="info-wrap">
      <dl>
        <dt>이름 / ID</dt>
        <dd>{{ userVocaItem.NAME }}</dd>
        <dd>{{ userVocaItem.AV_EMP_NO }}</dd>
      </dl>
      <dl>
        <dt>남은 연차</dt>
        <dd>{{ userVocaItem.AV_DAYS }}</dd>
        <dd>{{ userVocaItem.AV_USE_DAYS }}</dd>
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
    <button class="out-btn">logout</button>
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