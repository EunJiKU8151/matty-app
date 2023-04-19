<template>
  <div class="contact-sec sec">
    <div class="contact-list">
      <router-link :to="`/user/${item.E_IDX}`" v-for="item in myTeamUsers" :key="item.E_IDX" class="item">
        <div class="img-box">
          <img :src="`${$store.state.userImgUrl}${item.EMAIL}`" alt="">
        </div>
        <div class="txt-box">
          <p class="name">{{ item.NAME }}</p>
          <p class="info">
            <span>{{ item.DEPT_NAME }}</span> /
            <span>{{ item.CALL_NAME }}</span>
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ThisUserApi, contantApi } from '@/api/index';

export default {
  data: function() {
    return {
        myTeamUsers: [],
        myDept: "",
      };
  },
  async created() {
    let userId = 618;
    /* 
      tip 
      async await 쓰는 이유가 then과 catch를 안쓰려고 하는거죠?
      ✔✔✔ 230419 수정완료 ✔✔✔
    */
    try {
      const { data } = await ThisUserApi(userId);
      this.myDept = data.DEPT_CODE;
    }
    catch(error) {
      console.log("내 정보 에러 : " + error);
      console.log(error);
    }

    // 부서 Api Get
    await contantApi(this.myDept)
      .then(({ data }) => {
        this.myTeamUsers = data;
      })
      .catch(error => {
        console.log("연락처 에러 : " + error);
        console.log(error);
      })
  }
}
</script>

<style lang="scss">
  body {background-color: #fff;}
</style>
